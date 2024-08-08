import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditKayakPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerType: '',
    name: '',
    model: '',
    type: '',
    material: '',
    characteristics: '',
    seats: 1,
    paddlerSize: '',
    stability: 1,
    speed: 1,
    hasBulkheads: false,
    steering: '',
    description: '',
    imageUrl: ''
  });
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchKayak = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/kayaks/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchKayak();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.imageUrl;

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('imageUrl', imageFile);
        const uploadRes = await axios.post('http://localhost:5005/upload', uploadData);
        imageUrl = uploadRes.data.fileUrl;
      }

      const kayakData = { ...formData, imageUrl };
      await axios.put(`http://localhost:5005/kayaks/${id}`, kayakData);
      navigate(`/kayaks/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Edit Kayak</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Owner Type:
          <select name="ownerType" value={formData.ownerType} onChange={handleChange} required>
            <option value="">Select Owner Type</option>
            <option value="Club Boat">Club Boat</option>
            <option value="Private Boat">Private Boat</option>
          </select>
        </label>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Model:
          <input type="text" name="model" value={formData.model} onChange={handleChange} required />
        </label>
        <label>
          Type:
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Touring Kayak">Touring Kayak</option>
            <option value="Sea Kayak">Sea Kayak</option>
            <option value="Racing Kayak">Racing Kayak</option>
            <option value="Wildwater Kayak">Wildwater Kayak</option>
          </select>
        </label>
        <label>
          Material:
          <select name="material" value={formData.material} onChange={handleChange} required>
            <option value="">Select Material</option>
            <option value="Plastic">Plastic</option>
            <option value="Fiberglass">Fiberglass</option>
            <option value="Wood">Wood</option>
            <option value="Kevlar/Carbon Fibre Laminate">Kevlar/Carbon Fibre Laminate</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Characteristics:
          <input type="text" name="characteristics" value={formData.characteristics} onChange={handleChange} required />
        </label>
        <label>
          Seats:
          <input type="number" name="seats" value={formData.seats} onChange={handleChange} required />
        </label>
        <label>
          Paddler Size:
          <select name="paddlerSize" value={formData.paddlerSize} onChange={handleChange}>
            <option value="">Select Paddler Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <label>
          Stability:
          <input type="number" name="stability" value={formData.stability} onChange={handleChange} required />
        </label>
        <label>
          Speed:
          <input type="number" name="speed" value={formData.speed} onChange={handleChange} required />
        </label>
        <label>
          Has Bulkheads:
          <input type="checkbox" name="hasBulkheads" checked={formData.hasBulkheads} onChange={handleChange} required />
        </label>
        <label>
          Steering:
          <select name="steering" value={formData.steering} onChange={handleChange}>
            <option value="">Select Steering</option>
            <option value="Skeg">Skeg</option>
            <option value="Rudder">Rudder</option>
            <option value="Skudder">Skudder</option>
            <option value="Skeg & Rudder">Skeg & Rudder</option>
            <option value="Tiller">Tiller</option>
            <option value="None">None</option>
          </select>
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Image:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Update Kayak</button>
      </form>
    </div>
  );
};

export default EditKayakPage;