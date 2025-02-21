import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                navigate("/login");
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [message, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Password reset link has been sent to your email.");
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>


            {message && <p className="success-message">{message}</p>}
        </div>
    );
}

export default ForgotPassword;
