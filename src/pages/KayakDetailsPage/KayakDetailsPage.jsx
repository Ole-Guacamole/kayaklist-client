import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../../components/ReviewForm";
import ReviewList from "../../components/ReviewList";

const KayakDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kayak, setKayak] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchKayakDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/kayaks/${id}`);
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
    setShowReviewForm(false);
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
      <div className="rounded-box bg-neutral/50 max-w-xl p-6">
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
        <div className="w-full  p-2">
          <p>
            <strong>Material:</strong> {kayak.material}
          </p>
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
        <div className="w-full  p-2">
          <p>
            <strong>Stability:</strong> {kayak.stability}
          </p>
        </div>
        <div className="w-full p-2">
          <p>
            <strong>Speed:</strong> {kayak.speed}
          </p>
        </div>
        <div className="w-full p-2">
          <p>
            <strong>Has Bulkheads:</strong> {kayak.hasBulkheads ? "Yes" : "No"}
          </p>
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
      </div>

      <div className="w-full mt-6">
        <div className="flex justify-center">
          <button className="btn btn-primary btn-outline mx-2" onClick={handleEditClick}>
            Edit
          </button>
          <button className="btn btn-outline mx-2" onClick={toggleReviewForm}>
            {showReviewForm ? "Cancel" : "Add Review"}
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
