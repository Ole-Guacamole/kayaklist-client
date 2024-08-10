import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { ReviewContext } from "../context/review.context";
import { useParams } from "react-router-dom";

function ReviewForm() {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const { reviewState, reviewDispatch, onReviewSubmitted } =
    useContext(ReviewContext); // Access review state and dispatch from ReviewContext
  const { id } = useParams(); // Get the id from the URL parameters

  if (!reviewState) {
    return null; // or some fallback UI
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    reviewDispatch({
      type: "UPDATE_REVIEW",
      payload: { [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviewState.rating < 1 || reviewState.rating > 5) {
      alert("Rating must be between 1 and 5");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5005/reviews", {
        ...reviewState,
        user_id: user._id,
        kayak_id: id, // Use the id from the URL parameters
      });
      onReviewSubmitted(response.data);
      reviewDispatch({
        type: "RESET_REVIEW",
        payload: { user_id: user._id, kayak_id: id },
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <select
          className="select select-bordered w-full"
          name="rating"
          value={reviewState.rating ?? ""}
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>Select Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <br />
      <label>
        Review:
        <textarea
          className="textarea textarea-bordered w-full"
          name="reviewContent"
          value={reviewState.reviewContent ?? ""}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button className="btn" type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
