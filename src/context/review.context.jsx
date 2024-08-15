import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ReviewContext = createContext();

export const ReviewProviderWrapper = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/reviews`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAddReview = async (newReview) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/reviews`,
        newReview
      );
      setReviews((prevReviews) => [...prevReviews, response.data]);
      toast.success("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review.");
    }
  };

  const onReviewSubmitted = (newReview) => {
    setRating(newReview.rating);
    setReviewContent(newReview.reviewContent);
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const handleDelete = async (reviewId) => {
    try {
      console.log(`Attempting to delete review with ID: ${reviewId}`);
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/reviews/${reviewId}`
      );
      console.log(`Server response: ${response.status}`);
      if (response.status === 204) {
        console.log(`Review with ID: ${reviewId} deleted successfully`);
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
        toast.success("Review deleted successfully!");
      } else {
        console.error(`Failed to delete review with ID: ${reviewId}`);
        toast.error("Failed to delete review.");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review.");
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        rating,
        reviewContent,
        onReviewSubmitted,
        handleAddReview,
        handleDelete,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};