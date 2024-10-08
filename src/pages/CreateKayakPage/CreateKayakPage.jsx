import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateKayakPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerType: "", // Default value
    name: "",
    model: "",
    type: "", // Default value
    material: "", // Default value
    characteristics: "",
    seats: 1,
    paddlerSize: "", // Default value
    stability: 1,
    speed: 1,
    capacity: 1,
    hasBulkheads: false,
    steering: "", // Default value
    description: "",
    imageUrl: "",
    user_id: "",
  });
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user_id: user._id,
      }));
      setIsUserLoaded(true);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(`Updated ${name} to ${type === "checkbox" ? checked : value}`);
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    //console.log('Selected file:', e.target.files[0]);
  };

  const validateForm = () => {
    const messages = [];
    if (!formData.ownerType) messages.push("Owner Type");
    if (!formData.name) messages.push("Name");
    if (!formData.model) messages.push("Model");
    if (!formData.type) messages.push("Type");
    if (!formData.material) messages.push("Material");
    if (!formData.characteristics) messages.push("Characteristics");
    if (!formData.paddlerSize) messages.push("Paddler Size");
    if (!formData.steering) messages.push("Steering");
    if (!formData.description) messages.push("Description");
    if (messages.length > 0) {
      setValidationMessage(
        `Please fill out the following fields: ${messages.join(", ")}`
      );
      return false;
    }
    setValidationMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let imageUrl = formData.imageUrl;

        if (imageFile) {
          const uploadData = new FormData();
          uploadData.append("imageUrl", imageFile);
          const uploadRes = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/upload`,
            uploadData
          );
          imageUrl = uploadRes.data.fileUrl;
        }

        const kayakData = { ...formData, imageUrl };
        // console.log("Kayak data:", kayakData);
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/kayaks`,
          kayakData
        );
        toast.success("Kayak created successfully!");
        setTimeout(() => navigate("/kayaks"), 2000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Create New Kayak</h1>
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
              <option value="" disabled>
                Pick one
              </option>
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
              <option value="" disabled>
                Pick one
              </option>
              <option value="Touring Kayak">Touring Kayak</option>
              <option value="Sea Kayak">Sea Kayak</option>
              <option value="Racing Kayak">Racing Kayak</option>
              <option value="Surf Ski">Surf Ski</option>
              <option value="Wildwater Kayak">Wildwater Kayak</option>
              <option value="Canoe">Canoe</option>
              <option value="SUP">SUP</option>
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
              <option value="" disabled>
                Pick one
              </option>
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
              <option value="" disabled>
                Pick one
              </option>
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
              max={3}
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
              <option value="" disabled>
                Pick one
              </option>
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
        {validationMessage && (
          <div className="alert alert-warning">{validationMessage}</div>
        )}
        <div className="w-full mt-6">
          <div className="flex justify-center">
            <button type="submit" className="btn btn-outline btn-primary mx-2">
              Create Kayak
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateKayakPage;
