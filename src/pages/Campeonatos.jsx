import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getChampionships,
  createChampionship,
  updateChampionship,
  deleteChampionship,
} from "../services/championshipService";
import "../styles/campeonatos.css";

export default function Campeonatos() {
  const navigate = useNavigate();
  const [campeonatos, setCampeonatos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");
  const [status, setStatus] = useState("Ativo");

  async function carregar() {
    try {
      const data = await getChampionships();
      setCampeonatos(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar(e) {
    e.preventDefault();
    const campeonato = { nome, descricao, foto, status };
    try {
      if (editando) {
        await updateChampionship(editando, campeonato);
      } else {
        await createChampionship(campeonato);
      }
      limpar();
      carregar();
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }

  function limpar() {
    setEditando(null);
    setNome("");
    setDescricao("");
    setFoto("");
    setStatus("Ativo");
    setModalAberto(false);
  }

  function editar(c) {
    setEditando(c.id);
    setNome(c.nome);
    setDescricao(c.descricao || "");
    setFoto(c.foto || "");
    setStatus(c.status || "Ativo");
    setModalAberto(true);
  }

  async function excluir(id) {
    if (!window.confirm("Excluir campeonato?")) return;
    await deleteChampionship(id);
    carregar();
  }

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Campeonatos", path: "/campeonatos" },
    { label: "Equipes", path: "/equipes" },
    { label: "Jogadores", path: "/jogadores" },
    { label: "Rankings", path: "/rankings" },
  ];

  return (
    <div className="pf-page">
      <nav className="pf-nav">
        <div className="pf-logo">
          Playfield<span>Pro</span>
        </div>
        <div className="pf-nav-links">
          {navItems.map((item) => (
            <span
              key={item.path}
              className={item.path === "/campeonatos" ? "active" : ""}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </span>
          ))}
        </div>
      </nav>

      <div className="pf-content">
        <div className="pf-header">
          <div>
            <h1>Campeonatos</h1>
            <p>
              {campeonatos.length}{" "}
              {campeonatos.length === 1 ? "campeonato cadastrado" : "campeonatos cadastrados"}
            </p>
          </div>
          <button className="pf-btn-primary" onClick={() => setModalAberto(true)}>
            + Novo campeonato
          </button>
        </div>

        {campeonatos.length === 0 ? (
          <div className="pf-empty">
            <div className="pf-empty-icon">🏆</div>
            <p>Nenhum campeonato cadastrado ainda.</p>
            <button
              className="pf-btn-primary"
              style={{ marginTop: "1rem" }}
              onClick={() => setModalAberto(true)}
            >
              Criar primeiro campeonato
            </button>
          </div>
        ) : (
          <div className="pf-grid">
            {campeonatos.map((c) => (
              <div key={c.id} className="pf-card">
                <div className="pf-card-banner">
                  {c.foto ? (
                    <img src={c.foto} alt={c.nome} className="pf-card-img" />
                  ) : (
                    <span className="pf-card-emoji">🏆</span>
                  )}
                </div>
                <div className="pf-card-body">
                  <h3>{c.nome}</h3>
                  {c.descricao && <p>{c.descricao}</p>}
                  <div className="pf-card-footer">
                    <span
                      className={`pf-badge ${
                        c.status === "Ativo" ? "pf-badge-active" : "pf-badge-inactive"
                      }`}
                    >
                      {c.status}
                    </span>
                    <div className="pf-card-actions">
                      <button
                        className="pf-icon-btn"
                        title="Editar"
                        onClick={() => editar(c)}
                      >
                        ✏️
                      </button>
                      <button
                        className="pf-icon-btn danger"
                        title="Excluir"
                        onClick={() => excluir(c.id)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalAberto && (
        <div className="pf-overlay" onClick={(e) => e.target === e.currentTarget && limpar()}>
          <div className="pf-modal">
            <div className="pf-modal-header">
              <h2>{editando ? "Editar campeonato" : "Novo campeonato"}</h2>
              <button className="pf-close" onClick={limpar}>✕</button>
            </div>

            <form onSubmit={salvar}>
              <div className="pf-field">
                <label>Nome</label>
                <input
                  className="pf-input"
                  placeholder="Ex: Copa Brasil 2026"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="pf-field">
                <label>Descrição</label>
                <textarea
                  className="pf-input"
                  rows={3}
                  placeholder="Descreva o campeonato..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  style={{ resize: "none" }}
                />
              </div>

              <div className="pf-field">
                <label>URL da foto</label>
                <input
                  className="pf-input"
                  placeholder="https://..."
                  value={foto}
                  onChange={(e) => setFoto(e.target.value)}
                />
              </div>

              <div className="pf-field">
                <label>Status</label>
                <select
                  className="pf-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Ativo</option>
                  <option>Inativo</option>
                </select>
              </div>

              <div className="pf-modal-footer">
                <button type="button" className="pf-btn-ghost" onClick={limpar}>
                  Cancelar
                </button>
                <button type="submit" className="pf-btn-primary">
                  {editando ? "Salvar" : "Cadastrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}