import { useEffect, useState } from "react";
import {
  getPlayers,
  createPlayer,
  deletePlayer
} from "../services/playerService";

import "../styles/jogadores.css";

export default function Jogadores() {
  const [players, setPlayers] = useState([]);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  async function loadPlayers() {
    const data = await getPlayers();
    setPlayers(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nome.trim()) return;

    await createPlayer({
      nome,
      telefone
    });

    setNome("");
    setTelefone("");

    loadPlayers();
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir este jogador?")) return;

    await deletePlayer(id);

    loadPlayers();
  }

  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <div className="page">
      <div className="header">
        <h1>Cadastro de Jogadores</h1>

        <button className="btn-novo">
          Novo Jogador
        </button>
      </div>

      <form
        className="form-box"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        <input
          placeholder="Telefone"
          value={telefone}
          onChange={(e) =>
            setTelefone(e.target.value)
          }
        />

        <button type="submit">
          Salvar
        </button>
      </form>

      <div className="table">
        <div className="row header-row">
          <div>Nome</div>
          <div>Telefone</div>
          <div>Ações</div>
        </div>

        {players.map((player) => (
          <div
            className="row"
            key={player.id}
          >
            <div>{player.nome}</div>

            <div>{player.telefone}</div>

            <div className="actions">
              <button className="btn-edit">
                Editar
              </button>

              <button
                className="btn-delete"
                onClick={() =>
                  handleDelete(player.id)
                }
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}