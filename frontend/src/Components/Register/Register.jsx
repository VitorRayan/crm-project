import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import axios from "axios";

import "./Register.css";

const Register = ({ setScreen }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {

    event.preventDefault();

    if(password !== confirmPassword){
        setError("As senhas não coincidem");
        return;
    }

    try {

        await axios.post(
            "http://localhost:3000/auth/register",
            {
                email,
                password,
            }
        );

        alert("Cadastro realizado!");

        setScreen("login");

    } catch (error) {

        console.log(error);

        setError("Erro ao cadastrar");
    }
};

    return (
        <div className="contanier">
            <form onSubmit={handleSubmit}>

                <h1>Criar Conta</h1>

                <div className="input-field">
                    <input
                        type="email"
                        placeholder="E-mail"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaUser className="icon" />
                </div>

                <div className="input-field">
                    <input
                        type="password"
                        placeholder="Senha"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className="icon" />
                </div>

                <div className="input-field">
                    <input
                        type="password"
                        placeholder="Confirmar senha"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <FaLock className="icon" />
                </div>

                <button type="submit">
                    Cadastrar
                </button>

                <div className="signup-link">
                    <a href="#" onClick={() => setScreen("login")}>Já tenho conta</a>
                </div>

            </form>
        </div>
    )
}

export default Register;