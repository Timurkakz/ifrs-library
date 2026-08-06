import { createClient } from "@supabase/supabase-js";

const rawSupabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim();

const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

if (!rawSupabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Не заданы VITE_SUPABASE_URL или VITE_SUPABASE_PUBLISHABLE_KEY",
  );
}

let supabaseUrl;

try {
  const parsedUrl = new URL(rawSupabaseUrl);

  if (
    parsedUrl.pathname !== "/" &&
    parsedUrl.pathname !== ""
  ) {
    throw new Error(
      `VITE_SUPABASE_URL должен содержать только адрес проекта без ${parsedUrl.pathname}`,
    );
  }

  supabaseUrl = parsedUrl.origin;
} catch (error) {
  throw new Error(
    `Неверный VITE_SUPABASE_URL: ${error.message}`,
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
);