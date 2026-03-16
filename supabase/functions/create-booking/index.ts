import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const IST_OFFSET = "+05:30";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      phone,
      countryCode,
      businessType,
      website,
      challenge,
      automateProcess,
      dateTime,
      lp_name,
    } = await req.json();

    if (!name || !email || !dateTime) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields (name, email, dateTime)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Parse the dateTime to get a bare IST timestamp for slot_time lookup
    // dateTime arrives as "2026-03-16T10:00:00+05:30"
    const slotDate = new Date(dateTime);
    const istMs = slotDate.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istMs);
    const slotTimeIST = istDate.toISOString().slice(0, 19); // bare IST timestamp

    // --- Step 1: Atomically reserve the slot ---
    const { data: reserved, error: reserveError } = await supabase
      .from("calendar_events")
      .update({ status: "booked" })
      .eq("slot_time", slotTimeIST)
      .eq("status", "available")
      .select("id")
      .maybeSingle();

    if (reserveError) {
      console.error("Reserve error:", reserveError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to reserve slot" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!reserved) {
      return new Response(
        JSON.stringify({ success: false, error: "Slot already booked" }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Step 2: Insert lead into leads table ---
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        phone,
        country_code: countryCode,
        business_type: businessType,
        website,
        challenge,
        automate_process: automateProcess,
        meeting_time: slotTimeIST,
        lp_name: lp_name || null,
      })
      .select("id")
      .single();

    if (leadError) {
      console.error("Lead insert error:", leadError);
      // Rollback: release the slot
      await supabase
        .from("calendar_events")
        .update({ status: "available" })
        .eq("id", reserved.id);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to create lead" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Step 3: Link lead to the calendar event ---
    await supabase
      .from("calendar_events")
      .update({ lead_id: lead.id })
      .eq("id", reserved.id);

    // --- Step 4: Create Google Calendar event ---
    let meet_link: string | undefined;
    let calendar_link: string | undefined;

    try {
      const gcalCreds = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
      if (gcalCreds) {
        const creds = JSON.parse(gcalCreds);
        const calendarId = Deno.env.get("GOOGLE_CALENDAR_ID") || creds.client_email;
        const token = await getGoogleAccessToken(creds);

        const startTime = dateTime;
        // End time = start + 1 hour
        const endDate = new Date(slotDate.getTime() + 60 * 60 * 1000);
        const endTime = endDate.toISOString().replace("Z", IST_OFFSET);

        const eventRes = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              summary: `Meeting with ${name}`,
              description: [
                `Name: ${name}`,
                `Email: ${email}`,
                `Phone: ${countryCode || ""} ${phone || ""}`.trim(),
                `Business: ${businessType || ""}`,
                `Website: ${website || ""}`,
                `Challenge: ${challenge || ""}`,
                `Automate: ${automateProcess || ""}`,
              ].join("\n"),
              start: { dateTime: startTime, timeZone: "Asia/Kolkata" },
              end: { dateTime: endTime, timeZone: "Asia/Kolkata" },
              conferenceData: {
                createRequest: {
                  requestId: `booking-${reserved.id}`,
                  conferenceSolutionKey: { type: "hangoutsMeet" },
                },
              },
              attendees: [{ email }],
            }),
          }
        );

        if (eventRes.ok) {
          const eventData = await eventRes.json();
          meet_link = eventData.conferenceData?.entryPoints?.find(
            (ep: { entryPointType: string; uri: string }) => ep.entryPointType === "video"
          )?.uri;
          calendar_link = eventData.htmlLink;

          // Store meet_link on the lead
          if (meet_link) {
            await supabase
              .from("leads")
              .update({ meet_link })
              .eq("id", lead.id);
          }
        } else {
          const errText = await eventRes.text();
          console.error("Google Calendar event creation failed:", errText);
        }
      }
    } catch (gcalErr) {
      console.error("Google Calendar error (non-fatal):", gcalErr);
    }

    // --- Step 5: Trigger n8n webhook ---
    try {
      const webhookUrl = "https://n8n.srv930949.hstgr.cloud/webhook/book-meetings";
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: `${countryCode || ""} ${phone || ""}`.trim(),
          businessType,
          website,
          challenge,
          automateProcess,
          dateTime,
          meet_link,
          calendar_link,
          calendarLink: calendar_link,
          lp_name,
        }),
      });
    } catch (webhookErr) {
      console.error("Webhook error (non-fatal):", webhookErr);
    }

    return new Response(
      JSON.stringify({ success: true, meet_link, calendar_link }),
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
      scope: "https://www.googleapis.com/auth/calendar",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );

  const signInput = `${header}.${payload}`;

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
