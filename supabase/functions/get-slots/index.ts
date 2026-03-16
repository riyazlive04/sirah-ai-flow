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
    const url = new URL(req.url);
    const dateStr = url.searchParams.get("date"); // YYYY-MM-DD

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing or invalid date param (YYYY-MM-DD)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch available slots from calendar_events for the given date
    const dayStart = `${dateStr}T00:00:00`;
    const dayEnd = `${dateStr}T23:59:59`;

    const { data: availableEvents, error: dbError } = await supabase
      .from("calendar_events")
      .select("slot_time")
      .eq("status", "available")
      .gte("slot_time", dayStart)
      .lte("slot_time", dayEnd)
      .order("slot_time", { ascending: true });

    if (dbError) {
      console.error("DB query error:", dbError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to fetch slots" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Filter out past slots if the date is today
    const nowUTC = Date.now();
    const nowIST = new Date(nowUTC + 5.5 * 60 * 60 * 1000);
    const todayStr = nowIST.toISOString().slice(0, 10);
    const nowISTHour = nowIST.getUTCHours();

    const slots = (availableEvents || [])
      .map((event) => {
        const d = new Date(event.slot_time);
        const h = d.getHours();
        const hh = String(h).padStart(2, "0");
        const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
        const ampm = h >= 12 ? "pm" : "am";
        return {
          dateTime: `${dateStr}T${hh}:00:00${IST_OFFSET}`,
          display: `${String(hour12).padStart(2, "0")}:00 ${ampm}`,
          _hour: h,
        };
      })
      .filter((slot) => {
        if (dateStr !== todayStr) return true;
        return slot._hour > nowISTHour;
      })
      .map(({ _hour, ...slot }) => slot);

    return new Response(
      JSON.stringify({ success: true, date: dateStr, slots }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
