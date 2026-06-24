import { useEffect } from "react";
import { supabase } from "../services/supabase";

function Home() {
  useEffect(() => {
    async function testarBanco() {
      const { data, error } = await supabase
        .from("teams")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    testarBanco();
  }, []);

  return (
    <div>
      <h1>🏆 Playfield Pro</h1>
      <p>Conectando ao banco...</p>
    </div>
  );
}

export default Home;