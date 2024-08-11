import { AuthContext } from "../context/auth.context";
import { ReviewContext } from "../context/review.context";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";

function ReviewList({ kayakId }) {
  const { user } = useContext(AuthContext);
  const { reviews, handleDelete } = useContext(ReviewContext);

  if (!user) {
    return <div>Please log in to see reviews.</div>;
  }

  console.log("Kayak ID:", kayakId);
  console.log("All Reviews:", reviews);

  // Filter reviews by kayakId and sort by createdAt in descending order
  const filteredAndSortedReviews = reviews
    .filter(review => review.kayak_id === kayakId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  console.log("Filtered Reviews:", filteredAndSortedReviews);

  return (
    <div>
      <h3 className="text-xl">User Reviews: </h3>
      <ToastContainer key="toast-container" />
      {filteredAndSortedReviews && filteredAndSortedReviews.length > 0 ? (
        filteredAndSortedReviews.map((review) => (
          <div
            key={review._id}
            className="p-3 m-3 bg-gray-100 rounded-lg border border-gray-300"
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
        <p>No reviews for this kayak yet.</p>
      )}
    </div>
  );
}

export default ReviewList;