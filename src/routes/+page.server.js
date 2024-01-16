import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("challenges").select();
  return {
    challenges: data ?? [],
  };
}