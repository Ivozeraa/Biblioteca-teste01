import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ffwhbfdevveoxilyigss.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmd2hiZmRldnZlb3hpbHlpZ3NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDIwOTMsImV4cCI6MjA2MzQxODA5M30.jyXX8RKUr-R02DJTl2w7Sr5gNWW0VlfdeWTFs8hryDE"; 
export const supabase = createClient(supabaseUrl, supabaseKey);
