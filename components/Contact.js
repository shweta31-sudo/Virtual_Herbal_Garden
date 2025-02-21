import React, { useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser"; 

const ContactContainer = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Title = styled.h2`
    color: green;
    font-size: 28px;
    margin-bottom: 10px;
`;

const Paragraph = styled.p`
    font-size: 18px;
    color: #444;
    line-height: 1.6;
    margin-bottom: 15px;
`;

const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    max-width: 500px;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #A5D6A7;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    width: 100%;
    max-width: 500px;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #A5D6A7;
    border-radius: 5px;
    height: 100px;
`;

const Button = styled.button`
    background: green;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background: darkgreen;
    }
`;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .send(
                "service_herbal_garden", 
                "template_m2435xm", 
                formData,
                "AJ7UsZa8wd5cAqRNh" 
            )
            .then(
                (response) => {
                    console.log("SUCCESS!", response.status, response.text);
                    alert("Your message has been sent successfully!");
                    setFormData({ name: "", email: "", message: "" }); 
                },
                (err) => {
                    console.log("FAILED...", err);
                    alert("Failed to send message. Please try again.");
                }
            );
    };

    return (
        <ContactContainer>
            <Title>📞 Contact Us</Title>
            <Paragraph>
                Have questions or suggestions? Feel free to reach out to us!
            </Paragraph>
            <ContactForm onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextArea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">Send Message</Button>
            </ContactForm>
        </ContactContainer>
    );
};

export default Contact;
