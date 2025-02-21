import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"; // Import bookmark icons
import "./Home.css";

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [bookmarkedPlants, setBookmarkedPlants] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load bookmarks from local storage
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarkedPlants")) || [];
    setBookmarkedPlants(new Set(savedBookmarks));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:2020/api/get_allplants")
      .then((response) => {
        setPlants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching plants:", error);
        setError("Failed to load plants. Try again later.");
        setLoading(false);
      });
  }, []);

  // Function to toggle bookmarks
  const toggleBookmark = (plantId) => {
    const updatedBookmarks = new Set(bookmarkedPlants);
    if (updatedBookmarks.has(plantId)) {
      updatedBookmarks.delete(plantId);
    } else {
      updatedBookmarks.add(plantId);
    }
    setBookmarkedPlants(updatedBookmarks);
    localStorage.setItem("bookmarkedPlants", JSON.stringify([...updatedBookmarks]));
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to the Virtual Herbal Garden 🌿</h2>
      <p className="home-subtitle">Explore the world of medicinal plants and their benefits!</p>

      <div className="plant-grid">
        {plants.map((plant) => (
          <div key={plant.id} className="plant-card">
            <Link to={`/plant/${plant.id}`}>
              <img src={plant.imageUrl} alt={plant.commonName} />
              <h3>
                {plant.commonName}{" "}
                <span onClick={(e) => { 
                  e.preventDefault(); 
                  toggleBookmark(plant.id); 
                }} 
                style={{ cursor: "pointer", marginLeft: "8px" }}>
                  {bookmarkedPlants.has(plant.id) ? <FaBookmark color="gold" /> : <FaRegBookmark />}
                </span>
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
