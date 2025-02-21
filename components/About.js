import styled from "styled-components";

const AboutContainer = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Paragraph = styled.p`
    font-size: 18px;
    color: #444;
    line-height: 1.6;
    margin-bottom: 15px;
`;

const About = () => {
    return (
        <AboutContainer>
            <Paragraph>
                Welcome to the <strong>Virtual Herbal Garden</strong>, an interactive platform dedicated to showcasing the power of medicinal plants.
            </Paragraph>
            <Paragraph>
                Our goal is to educate users about the natural healing properties of herbs and their importance in traditional medicine, especially in AYUSH (Ayurveda, Yoga, Unani, Siddha, and Homeopathy).
            </Paragraph>
            <Paragraph>
                Explore a wide variety of plants, learn about their medicinal benefits, and discover their uses in daily life.
            </Paragraph>
            <Paragraph>
                🌱 Let’s embrace nature and promote a healthier lifestyle together!
            </Paragraph>
        </AboutContainer>
    );
};

export default About;
