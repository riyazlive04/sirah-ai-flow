import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Clock, CalendarIcon, CheckCircle, Loader2 } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { getAvailableSlots, createBooking, type Slot } from "@/services/booking";

const BUSINESS_TYPES = [
  "Clinic / Healthcare",
  "Agency / Marketing",
  "Coaching / Consulting",
  "E-commerce / Product Business",
  "Real Estate",
  "Education / Training",
  "Restaurant / Hospitality",
  "Service Provider",
  "Other",
];

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91", country: "India" },
  { code: "+1", label: "🇺🇸 +1", country: "US" },
  { code: "+44", label: "🇬🇧 +44", country: "UK" },
  { code: "+971", label: "🇦🇪 +971", country: "UAE" },
  { code: "+966", label: "🇸🇦 +966", country: "Saudi" },
  { code: "+65", label: "🇸🇬 +65", country: "Singapore" },
  { code: "+61", label: "🇦🇺 +61", country: "Australia" },
  { code: "+49", label: "🇩🇪 +49", country: "Germany" },
  { code: "+33", label: "🇫🇷 +33", country: "France" },
  { code: "+81", label: "🇯🇵 +81", country: "Japan" },
  { code: "+86", label: "🇨🇳 +86", country: "China" },
  { code: "+55", label: "🇧🇷 +55", country: "Brazil" },
  { code: "+27", label: "🇿🇦 +27", country: "South Africa" },
  { code: "+234", label: "🇳🇬 +234", country: "Nigeria" },
  { code: "+254", label: "🇰🇪 +254", country: "Kenya" },
];

const WHATSAPP_NUMBER = "919789961631";

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

const formatDateParam = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const BookingCalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [website, setWebsite] = useState("");
  const [challenge, setChallenge] = useState("");
  const [automateProcess, setAutomateProcess] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [meetLink, setMeetLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Client-side cache with TTL: dateStr → { slots, timestamp }
  const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes
  const slotsCache = useRef<Map<string, { slots: Slot[]; ts: number }>>(new Map());

  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    []
  );

  const fullWhatsapp = `${countryCode}${whatsappNumber.trim()}`;

  const isFormValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    businessType.length > 0 &&
    whatsappNumber.trim().length >= 6 &&
    website.trim().length > 0 &&
    challenge.trim().length > 0 &&
    selectedDate &&
    selectedSlot;

  // Raw fetch — populates cache, no state side-effects (safe for background prefetch)
  const fetchSlotsRaw = useCallback(async (dateStr: string, bypassCache = false): Promise<Slot[]> => {
    if (!bypassCache) {
      const cached = slotsCache.current.get(dateStr);
      if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
        return cached.slots;
      }
    }
    const result = await getAvailableSlots(dateStr);
    slotsCache.current.set(dateStr, { slots: result, ts: Date.now() });
    return result;
  }, []);

  // Prefetch next 4 weekdays on mount to warm the edge function and fill cache
  useEffect(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const upcoming: string[] = [];
    while (upcoming.length < 4) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) upcoming.push(formatDateParam(new Date(d)));
    }
    upcoming.forEach((dateStr) => fetchSlotsRaw(dateStr).catch(() => {}));
  }, [fetchSlotsRaw]);

  // Fetch with loading state — serves instantly from cache if fresh
  const fetchSlots = useCallback(async (date: Date) => {
    const dateStr = formatDateParam(date);
    const cached = slotsCache.current.get(dateStr);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      setSlots(cached.slots);
      setLoadingSlots(false);
      return;
    }
    setLoadingSlots(true);
    setSlots([]);
    try {
      const result = await fetchSlotsRaw(dateStr);
      setSlots(result);
    } catch (err) {
      console.error("Failed to fetch slots:", err);
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, [fetchSlotsRaw]);

  useEffect(() => {
    if (selectedDate) {
      setSelectedSlot(null);
      fetchSlots(selectedDate);
    }
  }, [selectedDate, fetchSlots]);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot || !name.trim() || !email.trim() || !businessType || !whatsappNumber.trim() || !website.trim() || !challenge.trim()) return;

    setSubmitting(true);

    try {
      // Re-fetch fresh slots to check if the selected slot is still available
      const slotDateKey = formatDateParam(selectedDate);
      const freshSlots = await fetchSlotsRaw(slotDateKey, true);
      const stillAvailable = freshSlots.some((s) => s.dateTime === selectedSlot.dateTime);
      if (!stillAvailable) {
        setSlots(freshSlots);
        setSelectedSlot(null);
        toast({
          title: "Slot no longer available",
          description: "This time was just booked. Please select another slot.",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: whatsappNumber.trim(),
        countryCode,
        businessType,
        website: website.trim(),
        challenge: challenge.trim(),
        automateProcess: automateProcess.trim(),
        dateTime: selectedSlot.dateTime,
      };

      console.debug("create-booking payload", payload);
      const result = await createBooking(payload, "AI Flow");

      if (!result.success) {
        toast({
          title: "Booking failed",
          description: result.error || "Could not create booking.",
          variant: "destructive",
        });
        return;
      }

      setMeetLink(result.meet_link || "");
      toast({
        title: "Booking confirmed! 🎉",
        description: "A calendar invite has been created. Check your email.",

      });

      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }

      // Open WhatsApp with confirmation message
      const dateStr = formatDate(selectedDate);
      const message = encodeURIComponent(
        `Hi! I've just booked a *Free AI Automation Blueprint Session* with Sirah Digital.\n\n📅 Date: ${dateStr}\n⏰ Time: ${selectedSlot.display}\n\n👤 Name: ${name.trim()}\n📧 Email: ${email.trim()}\n📱 Phone: ${fullWhatsapp}\n\n🏢 Business Type: ${businessType}\n\nLooking forward to the call!`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
      // Invalidate cache for the booked date so other sessions see updated slots
      slotsCache.current.delete(slotDateKey);
      setConfirmed(true);
    } catch (err) {
      console.error("Booking error:", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedDate(undefined);
    setSelectedSlot(null);
    setSlots([]);
    setName("");
    setEmail("");
    setCountryCode("+91");
    setWhatsappNumber("");
    setBusinessType("");
    setWebsite("");
    setChallenge("");
    setAutomateProcess("");
    setConfirmed(false);
    setMeetLink("");
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section id="book-audit" className="relative overflow-hidden bg-background">
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: "hsl(180 70% 42% / 0.04)" }} />

      <div className="container section-padding py-16 md:py-24 relative z-10">
        <AnimateIn className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-heading">
            Select a Date & Time
          </h2>
          <p className="text-muted-foreground text-sm">
            Timezone: {timezone}
          </p>
        </AnimateIn>

        <AnimatePresence mode="wait">
          {confirmed ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-2">Booking Confirmed!</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {selectedDate && formatDate(selectedDate)} at {selectedSlot?.display}
                </p>
                {meetLink && (
                  <a
                    href={meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-primary underline text-sm mb-2"
                  >
                    Join Google Meet
                  </a>
                )}
                <p className="text-muted-foreground text-sm mb-6">
                  A calendar invite has been sent. We'll also confirm on WhatsApp.
                </p>
                <Button variant="outline" onClick={handleReset}>
                  Book Another Slot
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Calendar */}
                  <div className="p-4 md:p-6 md:border-r border-border flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-heading text-sm">
                        {selectedDate
                          ? selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })
                          : today.toLocaleDateString("en-US", { month: "long", year: "numeric" })
                        }
                      </span>
                    </div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        const d = new Date(date);
                        d.setHours(0, 0, 0, 0);
                        // Disable past dates and Sundays
                        return d < today || d.getDay() === 0;
                      }}
                      className="pointer-events-auto w-full"
                      classNames={{
                        months: "flex flex-col w-full",
                        month: "space-y-4 w-full",
                        table: "w-full border-collapse",
                        head_row: "flex w-full",
                        head_cell: "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] text-center",
                        row: "flex w-full mt-2",
                        cell: "flex-1 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-10 w-full p-0 font-normal rounded-lg hover:bg-primary/10 hover:text-primary transition-colors aria-selected:opacity-100",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg",
                        day_today: "border border-primary/40 text-primary font-semibold rounded-lg",
                        day_outside: "text-muted-foreground opacity-50",
                        day_disabled: "text-muted-foreground opacity-30",
                        nav_button: "h-8 w-8 bg-transparent p-0 opacity-60 hover:opacity-100 hover:bg-primary/10 rounded-lg transition-colors",
                        nav_button_previous: "absolute right-10",
                        nav_button_next: "absolute right-1",
                        caption: "flex justify-start pt-1 relative items-center h-10",
                        caption_label: "text-sm font-medium hidden",
                      }}
                    />
                  </div>

                  {/* Time Slots */}
                  <div className="p-4 md:p-6 flex-1 border-t md:border-t-0">
                    <AnimatePresence mode="wait">
                      {selectedDate ? (
                        <motion.div
                          key={selectedDate.toISOString()}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center gap-2 mb-5">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-primary font-semibold text-sm">
                              {formatDate(selectedDate)}
                            </span>
                          </div>

                          {loadingSlots ? (
                            <div className="flex items-center justify-center min-h-[150px]">
                              <Loader2 className="h-6 w-6 animate-spin text-primary" />
                              <span className="ml-2 text-sm text-muted-foreground">Loading available slots...</span>
                            </div>
                          ) : slots.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                              {slots.map((slot) => (
                                <button
                                  key={slot.dateTime}
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                                    selectedSlot?.dateTime === slot.dateTime
                                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                                      : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-primary/5"
                                  }`}
                                >
                                  {slot.display}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center min-h-[150px]">
                              <p className="text-muted-foreground text-sm text-center">
                                No available slots for this date. Please select another day.
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-center h-full min-h-[200px]"
                        >
                          <p className="text-muted-foreground text-sm text-center">
                            ← Select a date to view available times
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Contact details + Confirm bar */}
                <AnimatePresence>
                  {selectedDate && selectedSlot && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-border"
                    >
                      <div className="p-4 md:p-6 space-y-4">
                        <p className="text-sm font-semibold text-heading">Your Details</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input
                            placeholder="Your name *"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={100}
                            className="h-11"
                          />
                          <Select value={businessType} onValueChange={setBusinessType}>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select your business type *" />
                            </SelectTrigger>
                            <SelectContent>
                              {BUSINESS_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            type="email"
                            placeholder="Email address *"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={255}
                            className="h-11"
                          />
                          <div className="flex gap-2">
                            <Select value={countryCode} onValueChange={setCountryCode}>
                              <SelectTrigger className="h-11 w-[90px] sm:w-[110px] shrink-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {COUNTRY_CODES.map((cc) => (
                                  <SelectItem key={cc.code} value={cc.code}>
                                    {cc.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Input
                              type="tel"
                              placeholder="WhatsApp number *"
                              value={whatsappNumber}
                              onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ""))}
                              maxLength={15}
                              className="h-11 flex-1"
                            />
                          </div>
                          <Input
                            placeholder="Website or social profile *"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            maxLength={500}
                            className="h-11"
                          />
                          <Input
                            placeholder="Biggest operational challenge *"
                            value={challenge}
                            onChange={(e) => setChallenge(e.target.value)}
                            maxLength={1000}
                            className="h-11"
                          />
                          <Input
                            placeholder="Process you'd like to automate (optional)"
                            value={automateProcess}
                            onChange={(e) => setAutomateProcess(e.target.value)}
                            maxLength={1000}
                            className="h-11"
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">
                              {formatDate(selectedDate)}
                            </span>{" "}
                            at{" "}
                            <span className="font-semibold text-foreground">
                              {selectedSlot.display}
                            </span>
                          </p>
                          <Button
                            size="lg"
                            className="h-12 px-8 text-base font-semibold rounded-xl glow-teal w-full sm:w-auto"
                            onClick={handleConfirm}
                            disabled={!isFormValid || submitting}
                          >
                            {submitting ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <>
                                Confirm Booking
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-center text-muted-foreground text-xs mt-4">
                Free automation audit · No obligation
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BookingCalendarSection;
