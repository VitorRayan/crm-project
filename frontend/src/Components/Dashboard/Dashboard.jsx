import { useEffect, useState } from "react";
import axios from "axios";

import "./Dashboard.css";

import toast from "react-hot-toast";

const Dashboard = ({ setScreen }) => {

    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const [nivel, setNivel] = useState("Cliente");
    const [status, setStatus] = useState("Ativo");

    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    async function fetchClients() {
        try {
            const response = await axios.get("http://localhost:3000/clients");

            setClients(response.data);

        } catch (error) {
            console.log(error);
            toast.error("Algo deu errado");
        }
    }

    useEffect(() => {
        fetchClients();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        try {

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
                toast.success("Cliente atualizado!");

                setEditingId(null);

            } else {

                await axios.post(
                    "http://localhost:3000/clients",
                    {
                        nome,
                        email,
                        nivel,
                        status,
                    }
                );
                toast.success("Cliente criado!");
            }

            setNome("");
            setEmail("");

            setNivel("Cliente");
            setStatus("Ativo");

            fetchClients();
            setShowModal(false);

        } catch (error) {
            console.log(error);
            toast.error("Email já cadastrado");
        }
    }

    async function handleDelete(id) {

        try {

            await axios.delete(
                `http://localhost:3000/clients/${id}`
            );
            toast.error("Cliente deletado!");

            fetchClients();

        } catch (error) {
            console.log(error);
            toast.error("Algo deu errado");
        }
    }

    function handleEdit(client) {

        setNome(client.nome);
        setEmail(client.email);
        setNivel(client.nivel);
        setStatus(client.status);

        setEditingId(client.id);
    }

    const filteredClients = clients.filter((client) => {
        const search = searchTerm.toLowerCase();
        return (
            client.nome.toLowerCase().includes(search) ||
            client.email.toLowerCase().includes(search)
        );
    });

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>CRM Dashboard</h1>
                <button
                    className="logout-btn"
                    onClick={() => setScreen("login")}
                    title="Fazer logout da conta"
                >
                    Sair
                </button>
            </div>

            <div className="top-bar">
                <div className="top-bar-left">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Procurar clientes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    className="new-user-btn"
                    onClick={() => {
                        setEditingId(null);
                        setNome("");
                        setEmail("");
                        setNivel("Cliente");
                        setStatus("Ativo");
                        setShowModal(true);
                    }}
                    title="Criar novo cliente"
                >
                    + Novo Cliente
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{editingId ? "Editar Cliente" : "Novo Cliente"}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="nome">Nome Completo</label>
                                <input
                                    id="nome"
                                    type="text"
                                    placeholder="ex: João Silva"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="ex: joao@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nivel">Nível de Acesso</label>
                                <select
                                    id="nivel"
                                    value={nivel}
                                    onChange={(e) => setNivel(e.target.value)}
                                >
                                    <option value="Cliente">Cliente</option>
                                    <option value="Admin">Administrador</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="modal-close-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit">
                                    {editingId ? "Salvar Alterações" : "Criar Cliente"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="table-wrapper">
                {clients.length > 0 ? (
                    <table className="clients-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Status</th>
                                <th>Nível</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.length > 0 ? (
                                filteredClients.map((client) => (
                                <tr key={client.id}>
                                    <td>{client.nome}</td>
                                    <td>{client.email}</td>
                                    <td>
                                        <span
                                            className={`status-badge ${
                                                client.status === "Ativo"
                                                    ? "status-active"
                                                    : "status-inactive"
                                            }`}
                                        >
                                            {client.status}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="nivel-badge">
                                            {client.nivel}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-btn"
                                                onClick={() => {
                                                    handleEdit(client);
                                                    setShowModal(true);
                                                }}
                                                title="Editar cliente"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(client.id)
                                                }
                                                title="Deletar cliente"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        <div className="empty-state" style={{ padding: "2rem 1rem" }}>
                                            <p>Cliente não encontrado</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <p>Nenhum cliente encontrado</p>
                        <p style={{ fontSize: "var(--font-size-sm)" }}>
                            Clique em "Novo Cliente" para começar
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;