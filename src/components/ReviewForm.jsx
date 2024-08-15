import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { ReviewContext } from "../context/review.context";
import { useParams } from "react-router-dom";

function ReviewForm() {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const { handleAddReview } = useContext(ReviewContext); // Access handleAddReview from ReviewContext
  const { id } = useParams(); // Get the id from the URL parameters
  const [reviewState, setReviewState] = useState({ rating: "", reviewContent: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviewState.rating < 1 || reviewState.rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }
    try {
      const newReview = {
        ...reviewState,
        user_id: user._id,
        kayak_id: id, // Use the id from the URL parameters
      };
      await handleAddReview(newReview);
      setReviewState({ rating: "", reviewContent: "" });
      onReviewSubmitted(); // Call the prop function to toggle the form
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="w-full">
        Rating:
        <select
          className="select select-bordered w-full"
          name="rating"
          value={reviewState.rating}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <br />
      <label className="w-full">
        Review:
        <textarea
          className="textarea textarea-bordered w-full"
          name="reviewContent"
          value={reviewState.reviewContent}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <div className="flex justify-center items-center">
        <button className="btn btn-primary btn-outline mx-2" type="submit">Submit Review</button>
      </div>
    </form>
  );
}

export default ReviewForm;
