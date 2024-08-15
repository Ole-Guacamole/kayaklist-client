import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const KayakRecommendationPage = () => {
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
        console.error("Error fetching kayaks:", error);
      });
  }, []);  // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Filter kayaks based on formData
    const reversedStability = 10 - formData.stability;
    const filtered = kayaks.filter((kayak) => {
      const isWildwater = formData.type.includes("Wildwater Kayak");
      return (
        kayak.stability >= reversedStability &&
        (isWildwater || kayak.speed >= formData.speed) &&
        formData.type.includes(kayak.type) &&
        kayak.capacity >= formData.capacity &&
        kayak.seats === formData.seats // Filter based on solo/tandem
      );
    });
    // console.log("Filtered kayaks:", filtered); // Debugging log
    setFilteredKayaks(filtered); // Update the state with the filtered kayaks
  }, [formData, kayaks]); // Dependency array for useEffect, runs when formData or kayaks change

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from the event target

    if (name === "type") { // Check if the changed field is 'type'
      let types;
      if (value === "Touring Kayak") { // If the value is 'Touring Kayak' also set other types who are suitable for flat water use.
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
        [name]: parseInt(value, 10),  // Update the formData state with the parsed integer value
      }));
    }
  };

  const handleGetRecommendations = () => {
    if (formData.type.length === 0) {
      setErrorMessage(
        "Please choose where you want to kayak to get recommendations."
      );
    } else {
      setErrorMessage("");
      setShowRecommendations(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kayak Recommendation</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-4">
          <div className="form-control flex-1">
            <label className="label text-left w-full">
              <span>Where do you want to go?</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Choose
              </option>
              <option value="Touring Kayak">Flat water</option>
              <option value="Sea Kayak">Sea</option>
              <option value="Wildwater Kayak">Wild Water</option>
            </select>
          </div>
          <div className="form-control flex-1">
            <label className="label text-left w-full">
              <span>Are you going alone?</span>
            </label>
            <select
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Choose
              </option>
              <option value={1}>Solo</option>
              <option value={2}>Tandem</option>
            </select>
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label text-left w-full">
            <span>How experienced are you?</span>
          </label>
          <input
            type="range"
            name="stability"
            min={0}
            max={10}
            value={formData.stability}
            onChange={handleChange}
            className="range"
            step="1"
          />
          <div className="flex w-full justify-between px-2 text-xs sm:text-sm">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
            <span>Expert</span>
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label text-left w-full">
            <span>What kind of paddling do you want to do?</span>
          </label>
          <input
            type="range"
            name="speed"
            min={1}
            max={9}
            value={formData.speed}
            onChange={handleChange}
            className="range"
            step="1"
          />
          <div className="flex w-full justify-between px-2 text-xs sm:text-sm">
            <span>Leisure</span>
            <span>Relaxed Touring</span>
            <span>Fast Touring</span>
            <span>Marathon</span>
            <span>Racing</span>
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label text-left w-full">
            <span>For how long do you want to go:</span>
          </label>
          <input
            type="range"
            name="capacity"
            min={0}
            max="3"
            value={formData.capacity}
            onChange={handleChange}
            className="range"
            step="1"
          />
          <div className="flex w-full justify-between px-2 text-xs sm:text-sm">
            <span>Some Hours</span>
            <span>Day Trip</span>
            <span>Multy-Day-Trip</span>
            <span>One Week +</span>
          </div>
        </div>
      </form>

      <div className="flex flex-col items-center mt-4">
        <button onClick={handleGetRecommendations} className="btn btn-primary">
          Get Recommendations
        </button>
        {errorMessage && (
          <p className="text-red-500 mt-2 text-center">{errorMessage}</p>
        )}
      </div>

      {showRecommendations && (
        <>
          <h2>
            This are the kayaks which fit your needs. Feel free to change some
            values to get other results instantly.
          </h2>
          <ul className="flex flex-wrap">
            {filteredKayaks.length > 0 ? (
              filteredKayaks.map((kayak) => (
                <li key={kayak._id} className="w-full md:w-1/2 lg:w-1/3 p-2">
                  <Link to={`/kayaks/${kayak._id}`}>
                    <div className="border p-4 rounded-lg">
                      <img
                        src={kayak.imageUrl}
                        alt={kayak.name}
                        className="max-w-xl w-full h-auto"
                      />
                      <h3 className="text-xl font-bold">{kayak.name}</h3>
                      <p className="mb-4">{kayak.characteristics}</p>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li>No kayaks match your criteria.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default KayakRecommendationPage;
