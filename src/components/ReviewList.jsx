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

  // Sort reviews by createdAt in descending order
  const sortedReviews = reviews.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <ToastContainer key="toast-container" />
      {sortedReviews && sortedReviews.length > 0 ? (
        sortedReviews.map((review) => (
          <div key={review._id}>
            <p>Rating: {review.rating}</p>
            <p>Review: {review.reviewContent}</p>
            {review.user_id === user._id && (
              <button className="btn" onClick={() => handleDelete(review._id)}>Delete</button>
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