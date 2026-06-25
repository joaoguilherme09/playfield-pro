import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Campeonatos from "./pages/Campeonatos";
import Partidas from "./pages/Partidas";
import Rankings from "./pages/Rankings";
import Perfil from "./pages/Perfil";
import Jogadores from "./pages/Jogadores";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/campeonatos" element={<Campeonatos />} />
      <Route path="/partidas" element={<Partidas />} />
      <Route path="/rankings" element={<Rankings />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/jogadores" element={<Jogadores />} />
    </Routes>
  );
}

export default App;