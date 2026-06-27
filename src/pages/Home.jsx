import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    championships: 0,
    teams: 0,
    players: 0,
    matches: 0,
  });
  const [recentChampionships, setRecentChampionships] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [champ, teams, players, matches] = await Promise.all([
        supabase.from("championships").select("*", { count: "exact", head: true }),
        supabase.from("teams").select("*", { count: "exact", head: true }),
        supabase.from("players").select("*", { count: "exact", head: true }),
        supabase.from("matches").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        championships: champ.count ?? 0,
        teams: teams.count ?? 0,
        players: players.count ?? 0,
        matches: matches.count ?? 0,
      });

      const { data: recent } = await supabase
        .from("championships")
        .select("id, nome, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentChampionships(recent ?? []);
    }

    fetchData();
  }, []);

  const navItems = [
    {
      label: "Campeonatos",
      description: "Crie e gerencie suas competições",
      icon: "🏆",
      color: "rgba(59,130,246,0.12)",
      path: "/campeonatos",
    },
    {
      label: "Equipes",
      description: "Cadastre e organize seus times",
      icon: "👕",
      color: "rgba(34,197,94,0.12)",
      path: "/equipes",
    },
    {
      label: "Jogadores",
      description: "Perfis, stats e artilharia",
      icon: "⚽",
      color: "rgba(168,85,247,0.12)",
      path: "/jogadores",
    },
    {
      label: "Partidas",
      description: "Registre resultados e rodadas",
      icon: "📋",
      color: "rgba(251,146,60,0.12)",
      path: "/partidas",
    },
    {
      label: "Rankings",
      description: "Classificação e histórico",
      icon: "📊",
      color: "rgba(250,204,21,0.12)",
      path: "/rankings",
    },
    {
      label: "Perfil",
      description: "Suas configurações e dados",
      icon: "👤",
      color: "rgba(20,184,166,0.12)",
      path: "/perfil",
    },
  ];

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  }

  return (
    <div className="pf-home">
      <nav className="pf-nav">
        <div className="pf-logo">
          Playfield<span>Pro</span>
        </div>
        <div className="pf-nav-links">
          <span className="active">Início</span>
          {navItems.map((item) => (
            <span key={item.path} onClick={() => navigate(item.path)}>
              {item.label}
            </span>
          ))}
        </div>
      </nav>

      <div className="pf-hero">
        <div className="pf-hero-eyebrow">Gestão de Campeonatos</div>
        <h1>
          Organize seu <em>campeonato</em> inteiro<br />em um só lugar
        </h1>
        <p>
          Tabelas, partidas, estatísticas e rankings — tudo automático, sem planilhas.
        </p>
        <div className="pf-hero-actions">
          <button className="pf-btn-primary" onClick={() => navigate("/campeonatos")}>
            Novo campeonato
          </button>
          <button className="pf-btn-ghost" onClick={() => navigate("/campeonatos")}>
            Ver campeonatos
          </button>
        </div>
      </div>

      <div className="pf-stats">
        <div className="pf-stat">
          <div className="pf-stat-num">{stats.championships}</div>
          <div className="pf-stat-label">Campeonatos</div>
        </div>
        <div className="pf-stat">
          <div className="pf-stat-num">{stats.teams}</div>
          <div className="pf-stat-label">Equipes</div>
        </div>
        <div className="pf-stat">
          <div className="pf-stat-num">{stats.players}</div>
          <div className="pf-stat-label">Jogadores</div>
        </div>
        <div className="pf-stat">
          <div className="pf-stat-num">{stats.matches}</div>
          <div className="pf-stat-label">Partidas</div>
        </div>
      </div>

      <div className="pf-section">
        <div className="pf-section-title">Navegar</div>
        <div className="pf-nav-grid">
          {navItems.map((item) => (
            <div
              key={item.path}
              className="pf-nav-card"
              onClick={() => navigate(item.path)}
            >
              <div className="pf-nav-card-icon" style={{ background: item.color }}>
                {item.icon}
              </div>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pf-section">
        <div className="pf-section-title">Campeonatos recentes</div>
        <div className="pf-recent">
          {recentChampionships.length === 0 ? (
            <p className="pf-empty">Nenhum campeonato cadastrado ainda.</p>
          ) : (
            recentChampionships.map((champ) => (
              <div
                key={champ.id}
                className="pf-championship-item"
                onClick={() => navigate("/campeonatos")}
              >
                <div className="pf-champ-left">
                  <div className="pf-champ-avatar">🏆</div>
                  <div>
                    <div className="pf-champ-name">{champ.nome}</div>
                    <div className="pf-champ-meta">
                      Criado em {formatDate(champ.created_at)}
                    </div>
                  </div>
                </div>
                <span
                  className={`pf-badge ${
                    champ.status === "Ativo" ? "pf-badge-active" : "pf-badge-draft"
                  }`}
                >
                  {champ.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;