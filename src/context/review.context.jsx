import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create a context for reviews
export const ReviewContext = createContext();

export const ReviewProviderWrapper = ({ children }) => {
  // State to hold all reviews
  const [reviews, setReviews] = useState([]);
  // State to hold the rating of a new review
  const [rating, setRating] = useState("");
  // State to hold the content of a new review
  const [reviewContent, setReviewContent] = useState("");

  // Function to fetch reviews from the API
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/reviews`
      );
      setReviews(response.data); // Set the fetched reviews to state
    } catch (error) {
      console.error("Error fetching reviews:", error); // Log any errors
      toast.error("Failed to fetch reviews."); // Show error toast notification
    }
  };

  useEffect(() => {
    fetchReviews(); // Fetch reviews when the component mounts
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle adding a new review
  const handleAddReview = async (newReview) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/reviews`,
        newReview
      );
      setReviews((prevReviews) => [...prevReviews, response.data]); // Add the new review to state
      toast.success("Review added successfully!"); // Show success toast notification
    } catch (error) {
      console.error("Error adding review:", error); // Log any errors
      toast.error("Failed to add review."); // Show error toast notification
    }
  };

  // Function to handle review submission
  const onReviewSubmitted = (newReview) => {
    setRating(newReview.rating); // Set the rating state
    setReviewContent(newReview.reviewContent); // Set the review content state
    setReviews((prevReviews) => [...prevReviews, newReview]); // Add the new review to state
  };

  // Function to handle deleting a review
  const handleDelete = async (reviewId) => {
    try {
      // console.log(`Attempting to delete review with ID: ${reviewId}`); // Debugging log
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/reviews/${reviewId}`
      );
      // console.log(`Server response: ${response.status}`); // Debugging log
      if (response.status === 204) {
        // console.log(`Review with ID: ${reviewId} deleted successfully`); // Debugging log
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        ); // Remove the deleted review from state
        toast.success("Review deleted successfully!"); // Show success toast notification
      } else {
        console.error(`Failed to delete review with ID: ${reviewId}`); // Log any errors
        toast.error("Failed to delete review."); // Show error toast notification
      }
    } catch (error) {
      console.error("Error deleting review:", error); // Log any errors
      toast.error("Failed to delete review."); // Show error toast notification
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