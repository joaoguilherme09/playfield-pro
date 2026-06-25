import { supabase } from "./supabase";

export async function getPlayers() {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("nome");

  if (error) throw error;

  return data;
}

export async function createPlayer(player) {
  const { data, error } = await supabase
    .from("players")
    .insert(player)
    .select();

  if (error) throw error;

  return data;
}

export async function updatePlayer(id, player) {
  const { error } = await supabase
    .from("players")
    .update(player)
    .eq("id", id);

  if (error) throw error;
}

export async function deletePlayer(id) {
  const { error } = await supabase
    .from("players")
    .delete()
    .eq("id", id);

  if (error) throw error;
}