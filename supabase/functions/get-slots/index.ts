import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/** Business hours in IST (24h format) */
const START_HOUR = 10; // 10:00 AM IST
const END_HOUR = 18; // 6:00 PM IST (last slot)
const SLOT_DURATION_MIN = 60;
const IST_OFFSET = "+05:30";

function buildSlots(dateStr: string): { dateTime: string; display: string }[] {
  const slots: { dateTime: string; display: string }[] = [];
  for (let h = START_HOUR; h <= END_HOUR; h++) {
    const hh = String(h).padStart(2, "0");
    const dateTime = `${dateStr}T${hh}:00:00${IST_OFFSET}`;
    const hour12 = h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? "pm" : "am";
    const display = `${String(hour12).padStart(2, "0")}:00 ${ampm}`;
    slots.push({ dateTime, display });
  }
  return slots;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const dateStr = url.searchParams.get("date"); // YYYY-MM-DD

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing or invalid date param (YYYY-MM-DD)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build all possible slots for the day
    const allSlots = buildSlots(dateStr);

    // Query the leads table for existing bookings on this date
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Date range: start of day to end of day in IST (stored without offset)
    const dayStartIST = `${dateStr}T00:00:00`;
    const dayEndIST = `${dateStr}T23:59:59`;

    const { data: bookedLeads, error: dbError } = await supabase
      .from("leads")
      .select("meeting_time")
      .gte("meeting_time", dayStartIST)
      .lt("meeting_time", dayEndIST);

    if (dbError) {
      console.error("DB query error:", dbError);
    }

    // Collect booked hours in IST (meeting_time is stored as bare IST)
    const bookedHoursIST = new Set<number>();
    if (bookedLeads && bookedLeads.length > 0) {
      for (const lead of bookedLeads) {
        if (lead.meeting_time) {
          const d = new Date(lead.meeting_time);
          bookedHoursIST.add(d.getHours());
        }
      }
    }

    // Also try to check Google Calendar if credentials are available
    let gcalBusyHours = new Set<number>();
    try {
      const gcalCreds = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
      if (gcalCreds) {
        const creds = JSON.parse(gcalCreds);
        const calendarId = Deno.env.get("GOOGLE_CALENDAR_ID") || creds.client_email;

        // Build JWT for Google API
        const token = await getGoogleAccessToken(creds);

        const timeMin = `${dateStr}T00:00:00${IST_OFFSET}`;
        const timeMax = `${dateStr}T23:59:59${IST_OFFSET}`;

        const freebusyRes = await fetch(
          "https://www.googleapis.com/calendar/v3/freeBusy",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              timeMin,
              timeMax,
              items: [{ id: calendarId }],
            }),
          }
        );

        if (freebusyRes.ok) {
          const freebusyData = await freebusyRes.json();
          const busySlots = freebusyData.calendars?.[calendarId]?.busy || [];
          for (const busy of busySlots) {
            const busyStart = new Date(busy.start);
            const istHour = (busyStart.getUTCHours() + 5 + Math.floor((busyStart.getUTCMinutes() + 30) / 60)) % 24;
            gcalBusyHours.add(istHour);
          }
        }
      }
    } catch (gcalErr) {
      console.error("Google Calendar check failed (non-fatal):", gcalErr);
    }

    // Filter out booked slots
    const availableSlots = allSlots.filter((slot) => {
      const slotDate = new Date(slot.dateTime);
      const istHour = slotDate.getHours();
      return !bookedHoursIST.has(istHour) && !gcalBusyHours.has(istHour);
    });

    // Also filter out past slots if the date is today
    const nowUTC = Date.now();
    const nowIST = new Date(nowUTC + 5.5 * 60 * 60 * 1000);
    const todayStr = nowIST.toISOString().slice(0, 10);
    const nowISTHour = nowIST.getUTCHours();
    const finalSlots = dateStr === todayStr
      ? availableSlots.filter((slot) => {
          const slotDate = new Date(slot.dateTime);
          return slotDate.getHours() > nowISTHour;
        })
      : availableSlots;

    return new Response(
      JSON.stringify({ success: true, date: dateStr, slots: finalSlots }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// --- Google Auth Helper ---
async function getGoogleAccessToken(creds: {
  client_email: string;
  private_key: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      iss: creds.client_email,
      scope: "https://www.googleapis.com/auth/calendar.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );

  const signInput = `${header}.${payload}`;

  // Import the private key
  const pemBody = creds.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "");
  const keyData = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyData,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signInput)
  );
  const signature = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const jwt = `${header}.${payload}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}
