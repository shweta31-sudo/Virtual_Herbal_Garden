import React, { useState, useEffect } from "react";
import { registerAdmin } from '../services/userService';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 75vh;
    font-family: "Arial", sans-serif;
    padding: 20px;
`;

const RegisterForm = styled.form`
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 350px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #A5D6A7;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s ease-in-out;

    &::placeholder {
        font-size: 14px;
        color: #81C784;
    }

    &:focus {
        outline: none;
        border: 2px solid #2E7D32;
        background: #E8F5E9;
        box-shadow: 0 0 8px rgba(46, 125, 50, 0.5);
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 14px;
    background: linear-gradient(to right, #4CAF50, #388E3C);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    font-weight: bold;

    &:hover {
        background: linear-gradient(to right, #388E3C, #2E7D32);
        transform: scale(1.05);
    }
`;

const Title = styled.h2`
    color: #2E7D32;
    font-family: "Georgia", serif;
    font-size: 24px;
    margin-bottom: 15px;
`;

const Message = styled.div`
    width: 100%;
    text-align: center;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    font-weight: bold;
`;

const SuccessMessage = styled(Message)`
    color: #155724;
`;

const ErrorMessage = styled(Message)`
    color: #721c24;
`;

export function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (message || errorMessage) {
            const timer = setTimeout(() => {
                setMessage("");
                setErrorMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, errorMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await registerAdmin({ username, password });

            if (response === "Admin already registered") {
                setErrorMessage("Admin already registered. Please log in.");
            } else {
                setMessage("Registration successful! Redirecting...");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            setErrorMessage("Error registering admin. Please try again.");
        }
    };

    return (
        <FormContainer>
            <RegisterForm onSubmit={handleSubmit}>
                <Title>Register</Title>
                <Input
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Register</Button>

                
                {message && <SuccessMessage>{message}</SuccessMessage>}
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </RegisterForm>
        </FormContainer>
    );
}

export default Register;
