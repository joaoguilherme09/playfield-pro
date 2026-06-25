import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "280px",
        height: "100vh",
        background: "#16244b",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2>Playfield Pro</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        <Link to="/campeonatos">🏆 Meus Campeonatos</Link>

        <Link to="/equipes">👥 Cadastro de Equipes</Link>

        <Link to="/jogadores">👤 Cadastro de Jogadores</Link>

        <Link to="/rankings">🏅 Rankings</Link>

        <Link to="/perfil">📊 Estatísticas</Link>
      </nav>
    </div>
  );
}