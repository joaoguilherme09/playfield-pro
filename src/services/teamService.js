import { supabase } from "./supabase";

export async function getTeams() {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .order("nome");

  if (error) throw error;

  return data;
}

export async function createTeam(team) {
  const { error } = await supabase
    .from("teams")
    .insert(team);

  if (error) throw error;
}

export async function updateTeam(id, team) {
  const { error } = await supabase
    .from("teams")
    .update(team)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteTeam(id) {
  const { error } = await supabase
    .from("teams")
    .delete()
    .eq("id", id);

  if (error) throw error;
}