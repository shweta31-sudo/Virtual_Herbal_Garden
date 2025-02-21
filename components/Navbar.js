import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
    background-color: #2e7d32;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.h1`
    font-family: "Times New Roman", sans-serif;
    font-size: 1.8rem;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;

    &:hover {
        opacity: 0.8;
        transform: scale(1.07);
        // box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }
`;

const NavSection = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const Button = styled.button`
    background-color: white;
    color: #2e7d32;
    border: 2px solid #2e7d32;
    padding: 8px 15px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: #2e7d32;
        color: white;
        transform: scale(1.05);
    }
`;

const NavLinks = styled.div`
    display: flex;
    gap: 20px;
    
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    &:hover {
        opacity: 0.8;
        transform: scale(1.07);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }
`;



const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = Boolean(localStorage.getItem("token"));

    const handleSearchClick = () => {
        navigate("/search-plants");
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload(); // Ensures UI updates properly
    };

    return (
        <NavbarContainer>
            <Logo onClick={handleLogoClick}>🌿 Virtual Herbal Garden</Logo>

            <NavSection>
                <Button onClick={handleSearchClick}>Search Plants</Button>

                <NavLinks>
                    <StyledLink to="/home">Our Garden</StyledLink>
                    {!isAuthenticated ? (
                        <>
                            {/* <StyledLink to="/register">Sign Up</StyledLink> */}
                            <StyledLink to="/login">Admin</StyledLink>
                        </>
                    ) : (
                        <Button onClick={handleLogout}>Logout</Button>
                    )}
                </NavLinks>
            </NavSection>
        </NavbarContainer>
    );
};

export default Navbar;
