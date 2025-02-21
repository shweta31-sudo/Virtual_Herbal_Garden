import React, { useState, useEffect } from "react";
import { addPlant, updatePlant, deletePlant, getAllPlants } from "../services/userService";
import { useNavigate } from "react-router-dom";
import "./PlantManager.css";

const PlantManager = () => {
    const [plants, setPlants] = useState([]);
    const [formData, setFormData] = useState({
        commonName: "",
        scientificName: "",
        family: "",
        description: "",
        habitat: "",
        medicinalUses: "",
        disease: "",
        imageUrl: ""
    });
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPlants();
    }, []);

  
    useEffect(() => {
        if (message || errorMessage) {
            const timer = setTimeout(() => {
                setMessage("");
                setErrorMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, errorMessage]);

    const fetchPlants = async () => {
        setLoading(true);
        try {
            const data = await getAllPlants();
            setPlants(data);
        } catch (error) {
            setErrorMessage("Failed to fetch plants.");
            console.error("Error fetching plants:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (selectedPlant) {
                const updatedPlant = await updatePlant(selectedPlant.id, formData);
                setPlants(plants.map((p) => (p.id === selectedPlant.id ? updatedPlant : p)));
                setMessage("Plant details updated successfully!");
            } else {
                const newPlant = await addPlant(formData);
                setPlants([...plants, newPlant]);
                setMessage("Plant added successfully!");
            }
            resetForm();
        } catch (error) {
            setErrorMessage("Failed to process the request.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this plant?")) return;
        setLoading(true);
        try {
            await deletePlant(id);
            setPlants(plants.filter((p) => p.id !== id));
            setMessage("Plant deleted successfully!");
        } catch (error) {
            setErrorMessage("Failed to delete plant.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
        window.location.reload();
    };

    const resetForm = () => {
        setFormData({
            commonName: "",
            scientificName: "",
            family: "",
            description: "",
            habitat: "",
            medicinalUses: "",
            disease: "",
            imageUrl: ""
        });
        setSelectedPlant(null);
        setShowForm(false);
    };

    return (
        <div className="plant-manager">
            <div className="header">
                <h2>🌿 Manage Plants</h2>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

    
            {message && <div className="success-message">{message}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {!showForm && !selectedPlant && (
                <button onClick={() => setShowForm(true)} className="add-btn">Add Plant</button>
            )}

            {(showForm || selectedPlant) && (
                <form onSubmit={handleFormSubmit} className="plant-form">
                    {Object.keys(formData).map((key) => (
                        <input
                            key={key}
                            type="text"
                            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                            value={formData[key]}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                            required
                        />
                    ))}
                    <button type="submit" disabled={loading}>{selectedPlant ? "Update Plant" : "Add Plant"}</button>
                    <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>
                </form>
            )}

            <ul className="plant-list">
                {loading ? <p>Loading plants...</p> : (
                    plants.length > 0 ? plants.map((plant) => (
                        <li key={plant.id} className="plant-item">
                            <img src={plant.imageUrl} alt={plant.commonName} />
                            <div>
                                <strong>{plant.commonName}</strong> - {plant.scientificName}
                            </div>
                            <div>
                                <button
                                    className="edit-btn"
                                    onClick={() => {
                                        setSelectedPlant(plant);
                                        setFormData({ ...plant });
                                        setShowForm(true);
                                    }}
                                >Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(plant.id)}>Delete</button>
                            </div>
                        </li>
                    )) : <p>No plants available</p>
                )}
            </ul>
        </div>
    );
};

export default PlantManager;
