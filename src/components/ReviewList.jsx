import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/auth.context";
import { ReviewContext } from "../context/review.context";

function ReviewList() {
  const { user } = useContext(AuthContext);
  const { reviews, handleDelete } = useContext(ReviewContext);

  if (!user) {
    return <div>Please log in to see reviews.</div>;
  }

  return (
    <div>
      <ToastContainer key="toast-container" />
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id}>
            <p>Rating: {review.rating}</p>
            <p>Review: {review.reviewContent}</p>
            {review.user_id === user._id && (
              <button onClick={() => handleDelete(review._id)}>Delete</button>
            )}
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default ReviewList;