import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"; // Import FaGithub

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2025 Virtual Herbal Garden. All Rights Reserved.</p>
            
            <nav>
                <a href="https://ayush.gov.in" target="_blank" rel="noopener noreferrer">
                    AYUSH Website
                </a>
                <a href="/about">About Us</a>
                <a href="/contact">Contact</a>
            </nav>

            <div className="social-media">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                </a>
                <a href="https://github.com/vedant7682/virtual_herbal_garden.git" target="_blank" rel="noopener noreferrer" aria-label="GitHub"> {/* Add GitHub link */}
                    <FaGithub />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
