import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";  
import "./PlantDetails.css";

function PlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:2020/api/get_plant/${id}`)
      .then((response) => {
        setPlant(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching plant details:", error);
        setError("Plant not found!");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  const generatePDF = () => {
    const doc = new jsPDF();

   
    doc.setFont("helvetica", "normal");

    
    const tableData = [
      ["Common Name", plant.commonName || "Not Available"],
      ["Scientific Name", plant.scientificName || "Not Available"],
      ["Description", plant.description || "No description available."],
      ["Family", plant.family || "Not Available"],
      ["Habitat", plant.habitat || "Not Available"],
      ["Medicinal Uses", plant.medicinalUses || "Not Available"],
      ["Diseases Treated", plant.disease || "Not Available"]
    ];


    doc.setFont("helvetica", "bold");
    doc.text("Plant Details", 20, 20);


    const tableConfig = {
      startY: 30, 
      head: [["Details", "Specification"]],
      body: tableData,
      theme: "striped", 
      headStyles: { fillColor: [0, 102, 204] }, 
      margin: { top: 10 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: "auto" } },
    };

   
    doc.autoTable(tableConfig);

   
    doc.save(`${plant.name}_details.pdf`);
  };

  return (
    <div className="plant-details-container">
      <h1 className="plant-title">{plant.name}</h1>
      <h2 className="scientific-name">{plant.scientificName}</h2>
      <img src={plant.imageUrl} alt={plant.name} className="plant-image" />
      <p className="plant-description">{plant.description}</p>

      {plant.commonName && <p><strong>Common Name:</strong> {plant.commonName}</p>}
      {plant.family && <p><strong>Family:</strong> {plant.family}</p>}

      {plant.habitat && (
        <div>
          <h3>Habitat:</h3>
          <p>{plant.habitat}</p>
        </div>
      )}

      {plant.medicinalUses && plant.medicinalUses.length > 0 && (
        <div>
          <h3>Medicinal Uses:</h3>
          <ul>
            {plant.medicinalUses.split(",").map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>
      )}

      {plant.disease && (
        <div>
          <h3>Diseases Treated:</h3>
          <ul>
            {plant.disease.split(",").map((disease, index) => (
              <li key={index}>{disease.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate("/home")}>
          🔙 Back to Home
        </button>
      </div>

   
      <button className="download-pdf-button" onClick={generatePDF}>
        Download PDF
      </button>
    </div>
  );
}

export default PlantDetails;
