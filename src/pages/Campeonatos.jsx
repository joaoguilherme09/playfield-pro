import { useEffect, useState } from "react";

import {
  getChampionships,
  createChampionship,
  updateChampionship,
  deleteChampionship,
} from "../services/championshipService";

export default function Campeonatos() {
  const [campeonatos, setCampeonatos] = useState([]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");
  const [status, setStatus] = useState("Ativo");

  const [editando, setEditando] = useState(null);

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

    const campeonato = {
      nome,
      descricao,
      foto,
      status,
    };

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
  }

  function editar(c) {
    setEditando(c.id);
    setNome(c.nome);
    setDescricao(c.descricao || "");
    setFoto(c.foto || "");
    setStatus(c.status || "Ativo");
  }

  async function excluir(id) {
    if (!window.confirm("Excluir campeonato?")) return;

    await deleteChampionship(id);

    carregar();
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Campeonatos</h1>

      <form onSubmit={salvar}>

        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="URL da foto"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
        />

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Ativo</option>
          <option>Inativo</option>
        </select>

        <br /><br />

        <button type="submit">
          {editando ? "Salvar" : "Cadastrar"}
        </button>

      </form>

      <hr />

      <table width="100%" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {campeonatos.map((c) => (

            <tr key={c.id}>

              <td>

                {c.foto && (
                  <img
                    src={c.foto}
                    width="60"
                    alt=""
                  />
                )}

              </td>

              <td>{c.nome}</td>

              <td>{c.status}</td>

              <td>

                <button onClick={() => editar(c)}>
                  Editar
                </button>

                <button onClick={() => excluir(c.id)}>
                  Excluir
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}