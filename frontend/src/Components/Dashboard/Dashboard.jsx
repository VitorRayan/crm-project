import { useEffect, useState } from "react";
import axios from "axios";

import "./Dashboard.css";

const Dashboard = ({ setScreen }) => {

    const [clients, setClients] = useState([]);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const [nivel, setNivel] = useState("Cliente");
    const [status, setStatus] = useState("Ativo");

    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // LISTAR CLIENTES
    async function fetchClients() {
        try {
            const response = await axios.get("http://localhost:3000/clients");

            setClients(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    // CARREGA CLIENTES AO ABRIR
    useEffect(() => {
        fetchClients();
    }, []);

    // ADICIONAR CLIENTE
    async function handleSubmit(e) {
        e.preventDefault();

        try {

            // EDITAR
            if(editingId){

                await axios.patch(
                    `http://localhost:3000/clients/${editingId}`,
                    {
                        nome,
                        email,
                        nivel,
                        status,
                    }
                );

                setEditingId(null);

            } else {

                // CRIAR
                await axios.post(
                    "http://localhost:3000/clients",
                    {
                        nome,
                        email,
                        nivel,
                        status,
                    }
                );
            }

            setNome("");
            setEmail("");

            setNivel("Cliente");
            setStatus("Ativo");

            fetchClients();
            setShowModal(false);

        } catch (error) {
            console.log(error);
        }
    }

    // EXCLUIR
    async function handleDelete(id) {

        try {

            await axios.delete(
                `http://localhost:3000/clients/${id}`
            );

            fetchClients();

        } catch (error) {
            console.log(error);
        }
    }

    // EDITAR
    function handleEdit(client) {

        setNome(client.nome);
        setEmail(client.email);
        setNivel(client.nivel);
        setStatus(client.status);

        setEditingId(client.id);
    }

    return (
        <div className="dashboard-container">

            <h1>CRM Dashboard</h1>
            <button
                className="logout-btn"
                onClick={() => setScreen("login")}
            >
                Sair
            </button>

        <div className="top-bar">

            <button
                className="new-user-btn"
                onClick={() => setShowModal(true)}
            >
                + Novo Usuário
            </button>

        </div>

            {showModal && (

        <div className="modal-overlay">

            <div className="modal-content">

                <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <select
                    value={nivel}
                    onChange={(e) => setNivel(e.target.value)}
                >

                    <option value="Cliente">
                        Cliente
                    </option>

                    <option value="Admin">
                        Admin
                    </option>

                </select>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >

                    <option value="Ativo">
                        Ativo
                    </option>

                    <option value="Inativo">
                        Inativo
                    </option>

                </select>

                <button type="submit">
                    {editingId ? "Salvar" : "Adicionar"}
                </button>

                </form>

            </div>

        </div>

)}

            <table className="clients-table">

                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Nível</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>

                    {clients.map((client) => (

                        <tr key={client.id}>

                            <td>{client.nome}</td>

                            <td>{client.email}</td>

                            <td>

                                <span
                                    className={
                                        client.status === "Ativo"
                                        ? "status-active"
                                        : "status-inactive"
                                    }
                                >
                                    {client.status}
                                </span>

                            </td>

                            <td>{client.nivel}</td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() => {
                                        handleEdit(client);
                                        setShowModal(true);
                                    }}
                                >
                                    Editar
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(client.id)}
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

export default Dashboard;