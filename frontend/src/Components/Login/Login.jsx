import {FaUser, FaLock} from 'react-icons/fa';
import { useState } from 'react';
import axios from "axios";
import "./Login.css";


const Login = ({ setScreen }) => {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {

    event.preventDefault();

    try {

        await axios.post(
            "http://localhost:3000/auth/login",
            {
                email: username,
                password,
            }
        );

        setError("");

        setScreen("dashboard");

    } catch (error) {

        console.log(error);

        setError("Email ou senha inválidos");
    }
};


  return (
    <div className="contanier">
        <form onSubmit={handleSubmit}>
            <h1>Acesse o sistema</h1>
            <div className ="input-field">
                <input 
                    type="email" 
                    placeholder="E-mail"
                    required 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <FaUser className="icon" />
            </div>
            <div className ="input-field">
                <input 
                    type="password" 
                    placeholder="Senha" 
                    required 
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <FaLock className="icon" />
            </div>



            <button>Entrar</button>

            <div className="signup-link">
                <a href="#" onClick={() => setScreen("register")}>Criar nova conta</a>
            </div>

        </form>
    </div>
  )
}

export default Login
