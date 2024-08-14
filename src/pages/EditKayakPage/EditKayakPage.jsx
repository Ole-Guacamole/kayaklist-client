import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditKayakPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerType: "",
    name: "",
    model: "",
    type: "",
    material: "",
    characteristics: "",
    seats: 1,
    paddlerSize: "",
    stability: 1,
    speed: 1,
    capacity: 0,
    hasBulkheads: false,
    steering: "",
    description: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchKayak = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/kayaks/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchKayak();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.imageUrl;

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("imageUrl", imageFile);
        const uploadRes = await axios.post(
          "http://localhost:5005/upload",
          uploadData
        );
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
              <option value="Kevlar/Carbon Fibre Laminate">
                Kevlar/Carbon Fibre Laminate
              </option>
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
              type="range"
              name="stability"
              min={1}
              max={10}
              value={formData.stability}
              onChange={handleChange}
              className="range"
              step="1"
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <span>Experts only</span>
              <span>Advanced</span>
              <span>Intermediate</span>
              <span>Beginner</span>
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Speed</span>
            </label>
            <input
              type="range"
              name="speed"
              min={1}
              max={10}
              value={formData.speed}
              onChange={handleChange}
              className="range"
              step="1"
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <span>Leisure</span>
              <span>Relaxed Touring</span>
              <span>Fast Touring</span>
              <span>Marathon</span>
              <span>Racing</span>
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label text-left w-full">
              <span>Capacity suitable for:</span>
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
            <div className="flex w-full justify-between px-2 text-xs">
              <span>Training</span>
              <span>Day Trip</span>
              <span>Multy-Day-Trip</span>
              <span>One Week +</span>
            </div>
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
            <button
              type="button"
              className="btn btn-outline mx-2"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditKayakPage;
