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
  const sortedReviews = reviews
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <ToastContainer key="toast-container" />
      {sortedReviews && sortedReviews.length > 0 ? (
        sortedReviews.map((review) => (
          <div
            key={review._id}
            className="p-4 m-4 bg-gray-100 rounded-lg border border-gray-300"
          >
            <h3 className="font-semibold">Rating: {review.rating}</h3>
            <p>Review: {review.reviewContent}</p>
            {review.user_id === user._id && (
              <button
                className="btn btn-xs btn-outline btn-neutral"
                onClick={() => handleDelete(review._id)}
              >
                Delete
              </button>
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
