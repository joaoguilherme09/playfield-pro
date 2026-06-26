import { supabase } from "./supabase";

export async function getChampionships() {
  const { data, error } = await supabase
    .from("championships")
    .select("*")
    .order("nome");

  if (error) throw error;

  return data;
}

export async function createChampionship(championship) {
  const { error } = await supabase
    .from("championships")
    .insert([championship]);

  if (error) throw error;
}

export async function updateChampionship(id, championship) {
  const { error } = await supabase
    .from("championships")
    .update(championship)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteChampionship(id) {
  const { error } = await supabase
    .from("championships")
    .delete()
    .eq("id", id);

  if (error) throw error;
}