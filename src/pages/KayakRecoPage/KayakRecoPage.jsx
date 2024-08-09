import React, { useState } from "react";
import axios from "axios";

function KayakRecoPage() {
  const [formData, setFormData] = useState({
    skillLevel: "",
    suitableForLargerPersons: false,
    waterType: "",
  });
  const [filteredKayaks, setFilteredKayaks] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5005/kayaks", {
        params: {
          skillLevel: formData.skillLevel,
          suitableForLargerPersons: formData.suitableForLargerPersons,
          waterType: formData.waterType,
        },
      });
      setFilteredKayaks(response.data);
    } catch (error) {
      console.error("Error fetching filtered kayaks:", error);
    }
  };

  return (
    <div>
      <h1>Kayak Reco Page</h1>
      <p>This is the Kayak Reco Page</p>
      <form onSubmit={handleSubmit}>
        <label>
          Skill Level:
          <select
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Skill Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <br />
        <label>
          Suitable for Larger Persons:
          <input
            type="checkbox"
            name="suitableForLargerPersons"
            checked={formData.suitableForLargerPersons}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Water Type:
          <select
            name="waterType"
            value={formData.waterType}
            onChange={handleChange}
            required
          >
            <option value="">Select Water Type</option>
            <option value="flat">Flat Water</option>
            <option value="sea">Sea</option>
            <option value="wildwater">Wildwater</option>
          </select>
        </label>
        <br />
        <button type="submit">Get Recommendations</button>
      </form>
      <div>
        <h2>Recommended Kayaks</h2>
        <ul>
          {filteredKayaks.map((kayak) => (
            <li key={kayak._id}>
              <h3>{kayak.name}</h3>
              <p>{kayak.description}</p>
              <p>Skill Level: {kayak.skillLevel}</p>
              <p>
                Suitable for Larger Persons:{" "}
                {kayak.suitableForLargerPersons ? "Yes" : "No"}
              </p>
              <p>Where are you planning to paddle?: {kayak.waterType}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default KayakRecoPage;
