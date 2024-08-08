import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateKayakPage = () => {
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
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('imageUrl', imageFile);
        const uploadRes = await axios.post('http://localhost:5005/upload', uploadData);
        imageUrl = uploadRes.data.fileUrl;
        console.log('Uploaded Image URL:', imageUrl); // Debugging
      }

      const kayakData = { ...formData, imageUrl };
      console.log('Kayak Data:', kayakData); // Debugging
      await axios.post('http://localhost:5005/kayaks', kayakData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Create New Kayak</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Owner Type:
          <select name="ownerType" value={formData.ownerType} onChange={handleChange} required>
            <option value="">Select Owner Type</option>
            <option value="club boat">Club Boat</option>
            <option value="private boat">Private Boat</option>
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
          <input type="text" name="type" value={formData.type} onChange={handleChange} required />
        </label>
        <label>
          Material:
          <input type="text" name="material" value={formData.material} onChange={handleChange} required />
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
          <input type="text" name="paddlerSize" value={formData.paddlerSize} onChange={handleChange} />
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
          <input type="checkbox" name="hasBulkheads" checked={formData.hasBulkheads} onChange={handleChange} />
        </label>
        <label>
          Steering:
          <input type="text" name="steering" value={formData.steering} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Image:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Create Kayak</button>
      </form>
    </div>
  );
};

export default CreateKayakPage;