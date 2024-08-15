import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../../components/ReviewForm";
import ReviewList from "../../components/ReviewList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KayakDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kayak, setKayak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this kayak?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/kayaks/${kayak._id}`
        );
        if (response.status === 204) {
          toast.success("Kayak deleted successfully");
          setTimeout(() => navigate("/kayaks"), 2000); // Navigate after 2 seconds
        } else {
          console.error("Failed to delete the kayak");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    const fetchKayakDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/kayaks/${id}`
        );
        setKayak(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKayakDetails();
  }, [id]);

  const toggleReviewForm = () => {
    setShowReviewForm((prevState) => !prevState);
  };

  const handleReviewSubmitted = () => {
    toggleReviewForm(); // Toggle the form visibility
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous route
  };

  const handleEditClick = () => {
    navigate(`/kayaks/${id}/edit`); // Navigate to the edit route
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto p-4">
      <div className="rounded-box bg-base-200 max-w-xl p-6">
        <h2 className="text-2xl font-bold mb-4">{kayak.name}</h2>
        {kayak.imageUrl && (
          <img
            src={kayak.imageUrl}
            alt={kayak.name}
            className="w-full h-auto mb-4 rounded"
          />
        )}
        <div className="flex flex-wrap">
          <div className="w-full p-2">
            <p>
              <strong>Model:</strong> {kayak.model}
            </p>
          </div>
        </div>
        <div className="w-full p-2">
          <p>
            <strong>Characteristics:</strong> {kayak.characteristics}
          </p>
        </div>
        <div className="w-full  p-2">
          <p>
            <strong>Type:</strong> {kayak.type}
          </p>
        </div>
        <div className="w-full p-2">
          <p>
            <strong>Material:</strong> {kayak.material}
          </p>
          {(kayak.material === "Wood" ||
            kayak.material === "Kevlar/Carbon Fibre Laminate") && (
            <div className="alert alert-warning mt-2">
              <p>
                <strong>Warning:</strong> This kayak is made of a delicate
                material. Please treat it with special care. You shouldn't land
                it directly on beaches but get out beforehand. You should also
                store it on stands if possible and not place it directly on hard
                floors such as concrete.
              </p>
            </div>
          )}
        </div>
        <div className="w-full p-2">
          <p>
            <strong>Seats:</strong> {kayak.seats}
          </p>
        </div>
        <div className="w-full p-2">
          <p>
            <strong>Paddler Size:</strong> {kayak.paddlerSize}
          </p>
        </div>
        <div className="w-full p-2">
          <p>
            <strong>Stability suitable for:</strong>
            <input
              type="range"
              min={0}
              max="10"
              value={kayak.stability}
              className="range"
              step="1"
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <span>Experts only</span>
              <span>Advanced</span>
              <span>Intermediate</span>
              <span>Beginner</span>
            </div>
          </p>
        </div>
        <div className="w-full p-2">
          <p>
            <strong>Speed suitable for:</strong>
            <input
              type="range"
              min={0}
              max="10"
              value={kayak.speed}
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
          </p>
        </div>
        <div className="w-full p-2">
          <p>
            <strong>Capacity is suitable for:</strong>
            <input
              type="range"
              min={0}
              max="3"
              value={kayak.capacity}
              className="range"
              step="1"
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <span>Training only</span>
              <span>Day Trip</span>
              <span>Multy Day Trip</span>
              <span>One Week + Trip</span>
            </div>
          </p>
        </div>
        <div className="w-full p-2">
          <p>
            <strong>Has Bulkheads:</strong> {kayak.hasBulkheads ? "Yes" : "No"}
          </p>
          {!kayak.hasBulkheads && (
            <div className="alert alert-warning mt-2">
              <p>
                <strong>Warning:</strong> This Kayak has no bulkheads, always
                ensure that buoyancy bags are in place and filled with air
                before paddling.
              </p>
            </div>
          )}
        </div>
        <div className="w-full  p-2">
          <p>
            <strong>Steering:</strong> {kayak.steering}
          </p>
        </div>
        <div className="w-full p-2">
          <p>
            <strong>Description:</strong> {kayak.description}
          </p>
        </div>
        {kayak.ownerType === "Private Boat" && kayak.user_id && (
          <div className="card w-full p-4 mt-4 text-left items-start bg-base-300">
            <p>
              <strong>Contact:</strong> This is a private Kayak. If you want to
              test it you can contact the owner,{" "}
              <span className="font-semibold">{kayak.user_id.name}</span>,
              under:
            </p>
            <p text-left>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 10.882l7.997-4.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 5-8-5V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {kayak.user_id.email}
            </p>
            <p mt-2 text-left>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.36 11.36 0 004.25.81 1 1 0 011 1v3.5a1 1 0 01-1 1A19.93 19.93 0 012 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.81 4.25 1 1 0 01-.27 1.11l-2.2 2.2z" />
              </svg>
              {kayak.user_id.phone}
            </p>
          </div>
        )}
      </div>

      <div className="w-full mt-6">
        <div className="flex justify-center">
          <button
            className="btn btn-primary btn-outline mx-2"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button className="btn btn-outline mx-2" onClick={toggleReviewForm}>
            {showReviewForm ? "Cancel" : "Add Review"}
          </button>
          <button className="btn btn-outline mx-2" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-outline mx-2" onClick={handleBackClick}>
            Back
          </button>
        </div>

        {showReviewForm && (
          <ReviewForm kayakId={id} onReviewSubmitted={handleReviewSubmitted} />
        )}

        <ReviewList kayakId={id} />
      </div>
    </div>
  );
};

export default KayakDetailsPage;
