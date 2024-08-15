import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const KayakRecommendationPage = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    stability: 2,
    speed: 0,
    type: [],
    capacity: 0,
    seats: 1,
  });

  // State to hold all kayaks fetched from the API
  const [kayaks, setKayaks] = useState([]);
  // State to hold filtered kayaks based on form data
  const [filteredKayaks, setFilteredKayaks] = useState([]);
  // State to control the visibility of recommendations
  const [showRecommendations, setShowRecommendations] = useState(false);
  // State to hold error messages
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch kayaks from the API
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/kayaks`)
      .then((response) => {
        // console.log("API response:", response.data); // Debugging log
        setKayaks(response.data); // Set the fetched kayaks to state
      })
      .catch((error) => {
        console.error("Error fetching kayaks:", error); // Log any errors
      });
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Filter kayaks based on formData
    const filtered = kayaks.filter((kayak) => {
      return (
        kayak.stability >= formData.stability &&
        kayak.speed >= formData.speed &&
        (formData.type.length === 0 || formData.type.includes(kayak.type)) &&
        kayak.capacity >= formData.capacity &&
        kayak.seats >= formData.seats
      );
    });
    // console.log("Filtered kayaks:", filtered); // Debugging log to check the filtered kayaks
    setFilteredKayaks(filtered); // Update the state with the filtered kayaks
  }, [formData, kayaks]); // Dependency array for useEffect, runs when formData or kayaks change

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from the event target

    if (name === "type") { // Check if the changed field is 'type'
      let types;
      if (value === "Touring Kayak") { // If the value is 'Touring Kayak'
        types = [
          "Touring Kayak",
          "Sea Kayak",
          "Racing Kayak",
          "Wildwater Kayak",
          "Surf Ski",
          "SUP",
          "Canoe",
        ]; // Set types to an array of related kayak types
      } else if (value === "Sea Kayak") { // If the value is 'Sea Kayak'
        types = ["Sea Kayak", "Surf Ski"]; // Set types to an array of related kayak types
      } else {
        types = [value]; // Otherwise, set types to an array with the single value
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: types, // Update the formData state with the new types array
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parseInt(value, 10), // Update the formData state with the parsed integer value
      }));
    }
  };

  return (
    <div>
      <h1>Kayak Recommendation Page</h1>
      {/* Form to input kayak preferences */}
      <form>
        <label>
          Stability:
          <input
            type="number"
            name="stability"
            value={formData.stability}
            onChange={handleChange}
          />
        </label>
        <label>
          Speed:
          <input
            type="number"
            name="speed"
            value={formData.speed}
            onChange={handleChange}
          />
        </label>
        <label>
          Type:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="Touring Kayak">Touring Kayak</option>
            <option value="Sea Kayak">Sea Kayak</option>
            <option value="Racing Kayak">Racing Kayak</option>
            <option value="Wildwater Kayak">Wildwater Kayak</option>
            <option value="Surf Ski">Surf Ski</option>
            <option value="SUP">SUP</option>
            <option value="Canoe">Canoe</option>
          </select>
        </label>
        <label>
          Capacity:
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
        </label>
        <label>
          Seats:
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
          />
        </label>
      </form>
      <button onClick={() => setShowRecommendations(true)}>
        Show Recommendations
      </button>
      {showRecommendations && (
        <div>
          <h2>Recommended Kayaks</h2>
          {filteredKayaks.length > 0 ? (
            <ul>
              {filteredKayaks.map((kayak) => (
                <li key={kayak.id}>
                  <Link to={`/kayaks/${kayak.id}`}>{kayak.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No kayaks match your criteria.</p>
          )}
        </div>
      )}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default KayakRecommendationPage;