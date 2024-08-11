import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditKayakPage = () => {
  const [formData, setFormData] = useState({
    ownerType: '',
    name: '',
    model: '',
    type: '',
    material: '',
    characteristics: '',
    seats: '',
    paddlerSize: '',
    stability: '',
    speed: '',
    hasBulkheads: false,
    steering: '',
    description: '',
    imageUrl: '',
    image: null
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5005/kayaks/${id}`)
      .then(response => {
        const kayakData = response.data;
        setFormData({
          ownerType: kayakData.ownerType || '',
          name: kayakData.name || '',
          model: kayakData.model || '',
          type: kayakData.type || '',
          material: kayakData.material || '',
          characteristics: kayakData.characteristics || '',
          seats: kayakData.seats || '',
          paddlerSize: kayakData.paddlerSize || '',
          stability: kayakData.stability || '',
          speed: kayakData.speed || '',
          hasBulkheads: kayakData.hasBulkheads || false,
          steering: kayakData.steering || '',
          description: kayakData.description || '',
          imageUrl: kayakData.imageUrl || '',
          image: null
        });
      })
      .catch(error => {
        setError('Error fetching kayak data');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    axios.put(`http://localhost:5005/kayaks/${id}`, data)
      .then(() => {
        navigate('/kayaks');
      })
      .catch(error => {
        setError('Error updating kayak');
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Kayak: {formData.name}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Owner Type</span>
            </label>
            <select
              name="ownerType"
              value={formData.ownerType}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Club Boat">Club Boat</option>
              <option value="Private Boat">Private Boat</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Model</span>
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Type</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Touring Kayak">Touring Kayak</option>
              <option value="Sea Kayak">Sea Kayak</option>
              <option value="Racing Kayak">Racing Kayak</option>
              <option value="Wildwater Kayak">Wildwater Kayak</option>
            </select>
          </div>
          <div className="form-control w-full md:col-span-2 lg:col-span-3">
            <label className="label text-left w-full">
              <span>Characteristics</span>
            </label>
            <textarea
              name="characteristics"
              value={formData.characteristics}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              rows="3"
            />
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Material</span>
            </label>
            <select
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Plastic">Plastic</option>
              <option value="Fiberglass">Fiberglass</option>
              <option value="Wood">Wood</option>
              <option value="Kevlar/Carbon Fibre Laminate">Kevlar/Carbon Fibre Laminate</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Seats</span>
            </label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Paddler Size</span>
            </label>
            <select
              name="paddlerSize"
              value={formData.paddlerSize}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Stability</span>
            </label>
            <input
              type="number"
              name="stability"
              value={formData.stability}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Speed</span>
            </label>
            <input
              type="number"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Steering</span>
            </label>
            <select
              name="steering"
              value={formData.steering}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Skeg">Skeg</option>
              <option value="Rudder">Rudder</option>
              <option value="Skudder">Skudder</option>
              <option value="Skeg & Rudder">Skeg & Rudder</option>
              <option value="Tiller">Tiller</option>
              <option value="None">None</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Image</span>
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="cursor-pointer label w-full">
              <span className="label text-left">Has Bulkheads</span>
              <input
                type="checkbox"
                name="hasBulkheads"
                checked={formData.hasBulkheads}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label text-left w-full">
            <span>Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="6"
          />
        </div>
        <div className="w-full mt-6">
          <div className="flex justify-center">
            <button type="submit" className="btn btn-outline btn-primary mx-2">
              Update Kayak
            </button>
            <button className="btn btn-outline mx-2" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditKayakPage;