import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://lbsiyqbhjatlmqphjitf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxic2l5cWJoamF0bG1xcGhqaXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MzYyMTgsImV4cCI6MjA4ODExMjIxOH0.iWUso735ZmnaqI-WxtlSvhboFFPDMRPzETlCN9wzYDI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
