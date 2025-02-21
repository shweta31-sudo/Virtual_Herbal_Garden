import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background: url('/herbal-plants/bg3.avif') no-repeat center center/cover;
    padding: 20px;
    color: black;
    animation: fadeIn 1.5s ease-in-out;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const Title = styled.h1`
    font-size: 3em;
    font-weight: bold;
    margin-bottom: 20px;
    text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.5);
`;

const Description = styled.p`
    font-size: 1.5em;
    max-width: 700px;
    margin-bottom: 30px;
    text-shadow: 1px 1px 4px rgba(255, 255, 255, 0.5);
`;

const Button = styled.button`
    padding: 18px 40px;
    font-size: 1.8em;
    font-weight: bold;
    background: rgba(76, 175, 80, 0.9);
    color: black;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s, background 0.3s, box-shadow 0.3s;
    
    &:hover {
        background: rgba(69, 160, 73, 1);
        transform: scale(1.1);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
        transform: scale(1.05);
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    }
    
    @media (max-width: 768px) {
        font-size: 1.5em;
        padding: 14px 30px;
    }
    
    @media (max-width: 480px) {
        font-size: 1.2em;
        padding: 12px 25px;
    }
`;

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/home');
    };

    return (
        <LandingContainer>
            <Title>Welcome to the Virtual Herbal Garden</Title>
            <Description>
                Explore a vast collection of herbal plants, learn about their medicinal properties, and immerse yourself in the world of nature.
            </Description>
            <Button onClick={handleGetStarted}>Get Started</Button>
        </LandingContainer>
    );
};

export default LandingPage;
