import React, { useState, useEffect } from "react";
import { getAllPlants } from "../services/userService"; 
import { useNavigate } from "react-router-dom";
import "./SearchPlants.css"; 

const SearchPlants = () => {
    const [plants, setPlants] = useState([]);
    const [filteredPlants, setFilteredPlants] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [uniqueCommonNames, setUniqueCommonNames] = useState([]);
    const [uniqueDiseases, setUniqueDiseases] = useState([]);
    const [uniqueFamilies, setUniqueFamilies] = useState([]);

    const [selectedCommonName, setSelectedCommonName] = useState("");
    const [selectedDisease, setSelectedDisease] = useState("");
    const [selectedFamily, setSelectedFamily] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getAllPlants()
            .then((data) => {
                console.log("Fetched Plants:", data);
                setPlants(data);
                setFilteredPlants(data);

       
                setUniqueCommonNames([...new Set(data.map(plant => plant.commonName))]);
                setUniqueDiseases([...new Set(data.map(plant => plant.disease).filter(Boolean))]);
                setUniqueFamilies([...new Set(data.map(plant => plant.family).filter(Boolean))]);
            })
            .catch((error) => {
                console.error("Error fetching plants:", error);
            });
    }, []);

    useEffect(() => {
        let filtered = plants;

        if (searchTerm.trim()) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter((plant) =>
                plant.commonName?.toLowerCase().includes(lowerSearchTerm) ||
                plant.scientificName?.toLowerCase().includes(lowerSearchTerm) ||
                plant.disease?.toLowerCase().includes(lowerSearchTerm) ||
                plant.family?.toLowerCase().includes(lowerSearchTerm)
            );
        }

        if (selectedCommonName) {
            filtered = filtered.filter(plant => plant.commonName === selectedCommonName);
        }
        if (selectedDisease) {
            filtered = filtered.filter(plant => plant.disease === selectedDisease);
        }
        if (selectedFamily) {
            filtered = filtered.filter(plant => plant.family === selectedFamily);
        }

        setFilteredPlants(filtered);
    }, [searchTerm, selectedCommonName, selectedDisease, selectedFamily, plants]);

    return (
        <div className="search-container">
            <h2>Search for Medicinal Plants 🌱</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search plants"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="dropdown-filters">
                    <select
                        value={selectedCommonName}
                        onChange={(e) => setSelectedCommonName(e.target.value)}
                    >
                        <option value="">All Common Names</option>
                        {uniqueCommonNames.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>

                    <select
                        value={selectedDisease}
                        onChange={(e) => setSelectedDisease(e.target.value)}
                    >
                        <option value="">All Diseases</option>
                        {uniqueDiseases.map((disease, index) => (
                            <option key={index} value={disease}>{disease}</option>
                        ))}
                    </select>

                    <select
                        value={selectedFamily}
                        onChange={(e) => setSelectedFamily(e.target.value)}
                    >
                        <option value="">All Families</option>
                        {uniqueFamilies.map((family, index) => (
                            <option key={index} value={family}>{family}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="plant-list">
                {filteredPlants.length > 0 ? (
                    <ul>
                        {filteredPlants.map((plant) => (
                            <li
                                key={plant.id}
                                className="plant-card"
                                onClick={() => navigate(`/plant/${plant.id}`)}
                            >
                                <img src={plant.imageUrl} alt={plant.commonName} className="plant-image" />
                                <div className="plant-info">
                                    <h3>{plant.commonName} ({plant.scientificName})</h3>
                                    <p><strong>Description:</strong> {plant.description}</p>
                                    <p><strong>Disease:</strong> {plant.disease}</p>
                                    <p><strong>Family:</strong> {plant.family || "Unknown"}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-results">No plants found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPlants;
