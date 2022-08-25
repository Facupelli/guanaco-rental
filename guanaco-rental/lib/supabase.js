const { createClient } = require("@supabase/supabase-js");

export const supabase = createClient(
  "https://wpqjcqdwmloclxtkoior.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwcWpjcWR3bWxvY2x4dGtvaW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkxMDgwNjgsImV4cCI6MTk3NDY4NDA2OH0.7x6tou2-Pui2JP40AY1ijaRMlpKcrGLCFWK6RECiYQY"
);
