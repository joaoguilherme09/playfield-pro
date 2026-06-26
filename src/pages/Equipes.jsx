import { useEffect, useState } from "react";

import {
    getTeams,
    createTeam,
    deleteTeam,
    updateTeam
} from "../services/teamService";

export default function Equipes() {

    const [teams,setTeams] = useState([]);

    const [nome,setNome] = useState("");

    const [escudo,setEscudo] = useState("");

    const [editing,setEditing] = useState(null);

    async function loadTeams(){

        const data = await getTeams();

        setTeams(data);

    }

    useEffect(()=>{

        loadTeams();

    },[]);

    async function salvar(e){

        e.preventDefault();

        if(editing){

            await updateTeam(editing,{
                nome,
                escudo
            });

        }else{

            await createTeam({

                nome,
                escudo

            });

        }

        setNome("");
        setEscudo("");
        setEditing(null);

        loadTeams();

    }

    async function excluir(id){

        if(window.confirm("Excluir equipe?")){

            await deleteTeam(id);

            loadTeams();

        }

    }

    function editar(team){

        setEditing(team.id);

        setNome(team.nome);

        setEscudo(team.escudo || "");

    }

    return(

        <div className="container">

            <h1>Cadastro de Equipes</h1>

            <form onSubmit={salvar}>

                <input
                    placeholder="Nome da equipe"
                    value={nome}
                    onChange={(e)=>setNome(e.target.value)}
                />

                <input
                    placeholder="URL do escudo (opcional)"
                    value={escudo}
                    onChange={(e)=>setEscudo(e.target.value)}
                />

                <button>

                    {editing ? "Atualizar" : "Salvar"}

                </button>

            </form>

            <table>

                <thead>

                    <tr>

                        <th>Escudo</th>

                        <th>Equipe</th>

                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {teams.map(team=>(

                        <tr key={team.id}>

                            <td>

                                {team.escudo
                                ?

                                <img
                                    src={team.escudo}
                                    alt=""
                                    width="40"
                                />

                                :

                                "⚽"

                                }

                            </td>

                            <td>

                                {team.nome}

                            </td>

                            <td>

                                <button
                                    onClick={()=>editar(team)}
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={()=>excluir(team.id)}
                                >
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