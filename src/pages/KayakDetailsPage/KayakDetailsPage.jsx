import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../../components/ReviewForm";
import ReviewList from "../../components/ReviewList";

const KayakDetailsPage = () => {
  const { id } = useParams();
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

  const handleReviewSubmitted = (newReview) => {
    setShowReviewForm(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{kayak.name}</h2>
      {kayak.imageUrl && <img src={kayak.imageUrl} alt={kayak.name} />}
      <p>
        <strong>Model:</strong> {kayak.model}
      </p>
      <p>
        <strong>Type:</strong> {kayak.type}
      </p>
      <p>
        <strong>Material:</strong> {kayak.material}
      </p>
      <p>
        <strong>Characteristics:</strong> {kayak.characteristics}
      </p>
      <p>
        <strong>Seats:</strong> {kayak.seats}
      </p>
      <p>
        <strong>Paddler Size:</strong> {kayak.paddlerSize}
      </p>
      <p>
        <strong>Stability:</strong> {kayak.stability}
      </p>
      <p>
        <strong>Speed:</strong> {kayak.speed}
      </p>
      <p>
        <strong>Has Bulkheads:</strong> {kayak.hasBulkheads ? "Yes" : "No"}
      </p>
      <p>
        <strong>Steering:</strong> {kayak.steering}
      </p>
      <p>
        <strong>Description:</strong> {kayak.description}
      </p>

      <div>
        <button onClick={toggleReviewForm}>
          {showReviewForm ? "Cancel" : "Add Review"}
        </button>

        {showReviewForm && (
          <ReviewForm kayakId={id} onReviewSubmitted={handleReviewSubmitted} />
        )}

        <ReviewList kayakId={id} />
      </div>
    </div>
  );
};

export default KayakDetailsPage;
