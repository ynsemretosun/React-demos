import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kqdfqsdiikktquryhmqm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZGZxc2RpaWtrdHF1cnlobXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NDQ0NDMsImV4cCI6MjA0NjEyMDQ0M30.88DO2iK-U98F8iJ1_t_5mfWkkmpapMaUQ1WYnQGdahY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
