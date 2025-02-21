import React, { useState } from "react";
import { loginUser } from "../services/userService";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); 
        try {
            const response = await loginUser({ username, password });

            if (response === "Login successful") {
                setMessage("Login successful!");
                setTimeout(() => navigate("/plantManager"), 1000); 
            } else {
                setMessage("Invalid credentials. Please try again.");
            }
        } catch (error) {
            setMessage("Error logging in. Please try again later.");
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>

            
                {message && <p className="login-message">{message}</p>}

                <p onClick={handleRegister} className="register-link">Register</p>
                <p onClick={handleForgotPassword} className="forgot-password-link">
                    Forgot Password?
                </p>
            </form>
        </div>
    );
}

export default Login;
