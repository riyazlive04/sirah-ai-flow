import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, RefreshCw } from "lucide-react";

const SUPABASE_URL = "https://lbsiyqbhjatlmqphjitf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxic2l5cWJoamF0bG1xcGhqaXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MzYyMTgsImV4cCI6MjA4ODExMjIxOH0.iWUso735ZmnaqI-WxtlSvhboFFPDMRPzETlCN9wzYDI";

// SHA-256 of "admin:Happykid04"
const EXPECTED_HASH = "c5c316e1cf572dceddc9ae3d624f7a1b2b1efd405e4a9249f4b73005033efb19";
const SESSION_KEY = "sirah_admin_auth";

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type AttendanceStatus = "not_attended" | "attended" | null;

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  country_code: string;
  business_type: string;
  meeting_time: string | null;
  created_at: string;
  attendance_status: AttendanceStatus;
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const hash = await sha256(`${username}:${password}`);
      if (hash === EXPECTED_HASH) {
        sessionStorage.setItem(SESSION_KEY, "1");
        onLogin();
      } else {
        setError("Invalid username or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold" style={{ color: "#111827" }}>
            Admin Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">Booking Admin · Sirah Digital</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            className="border-gray-300 text-gray-900 placeholder:text-gray-400"
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="pr-10 border-gray-300 text-gray-900 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-lg text-sm font-semibold text-white flex items-center justify-center disabled:opacity-60"
            style={{ background: "#16a34a" }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchLeads = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError("");
    const { data, error: err } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) {
      console.error("Supabase fetch error:", err);
      setError(err.message);
    } else {
      setLeads((data as Lead[]) ?? []);
    }
    if (!silent) setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const formatDateTime = (iso: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const shortId = (id: string) => id.replace(/-/g, "").slice(0, 5);

  const handleStatus = async (id: string, status: AttendanceStatus) => {
    const lead = leads.find((l) => l.id === id);
    if (!lead) return;

    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, attendance_status: status } : l))
    );
    setUpdating(id);

    const revert = () =>
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, attendance_status: lead.attendance_status } : l))
      );

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/update-attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          apikey: SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ id, attendance_status: status }),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        revert();
        alert("Failed to update status: " + (json.error ?? res.statusText));
        setUpdating(null);
        return;
      }
    } catch (err) {
      revert();
      alert("Failed to update status: " + String(err));
      setUpdating(null);
      return;
    }

    // Silently re-fetch from DB so the table reflects the true persisted state
    await fetchLeads(true);
    setUpdating(null);

    // Fire webhook if a status was set (not when toggled off)
    if (status) {
      const webhookUrl = status === "attended"
        ? "https://n8n.srv930949.hstgr.cloud/webhook/meeting-attended"
        : "https://n8n.srv930949.hstgr.cloud/webhook/meeting-not-attended";
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: lead.id,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            country_code: lead.country_code,
            business_type: lead.business_type,
            meeting_time: lead.meeting_time,
            attendance_status: status,
          }),
        });
      } catch (webhookErr) {
        console.error("Webhook trigger failed:", webhookErr);
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#f9fafb" }}>
      {/* Header */}
      <header
        className="px-8 py-4 flex items-center justify-between"
        style={{ background: "#111827", borderBottom: "1px solid #1f2937" }}
      >
        <span className="text-lg font-bold" style={{ color: "#22c55e" }}>
          Booking Admin
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={onLogout}
            className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1 rounded border border-gray-700 hover:border-gray-500"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-8 py-8">
        {/* Title row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Total Bookings</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your strategy session requests</p>
          </div>
          <span className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 bg-white shadow-sm whitespace-nowrap">
            Total: {leads.length}
          </span>
        </div>

        {error && (
          <p className="text-sm text-red-500 mb-4">Error: {error}</p>
        )}

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-green-600" />
              <span className="ml-2 text-sm text-gray-500">Loading...</span>
            </div>
          ) : leads.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-20">No bookings yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  {["S.NO", "ID", "NAME", "EMAIL", "PHONE", "DATE TIME", "TYPE", "ACTIONS"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-left text-xs font-semibold text-gray-400 tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => {
                  const status = lead.attendance_status;
                  const isUpdating = updating === lead.id;
                  return (
                    <tr
                      key={lead.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-4 text-gray-500">{i + 1}</td>
                      <td className="px-5 py-4 text-gray-500 font-mono">{shortId(lead.id)}</td>
                      <td className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {lead.name || "—"}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{lead.email || "—"}</td>
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        +{lead.country_code?.replace("+", "")}{lead.phone}
                      </td>
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        {formatDateTime(lead.meeting_time || lead.created_at)}
                      </td>
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        {lead.business_type || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {/* Not Attended → Sended when active */}
                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              handleStatus(
                                lead.id,
                                status === "not_attended" ? null : "not_attended"
                              )
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                              status === "not_attended"
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Not Attended
                          </button>

                          {/* Attended */}
                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              handleStatus(
                                lead.id,
                                status === "attended" ? null : "attended"
                              )
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                              status === "attended"
                                ? "bg-green-600 text-white border-green-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            Attended
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
const Admin = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={handleLogout} />;
};

export default Admin;
