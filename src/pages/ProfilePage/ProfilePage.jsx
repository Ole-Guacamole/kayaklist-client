import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user: authUser, isLoading: authLoading } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [kayaks, setKayaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authUser) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/${authUser._id}`);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      }
    };

    const fetchUserReviews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/reviews/users/${authUser._id}`);
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching user reviews:', err);
        setError(err.message);
      }
    };

    const fetchUserKayaks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/kayaks/users/${authUser._id}`);
        setKayaks(response.data);
      } catch (err) {
        console.error('Error fetching user kayaks:', err);
        setError(err.message);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUserData(), fetchUserReviews(), fetchUserKayaks()]);
      setLoading(false);
    };

    fetchData();
  }, [authUser]);

  if (authLoading || loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full p-4 m-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile Page</h1>
      <div className="divider">Your User Details</div>
      
      {user && (
        <div className="text-md mb-4 text-center">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
      )}
      <div>
      <div className="divider">Your Kayaks</div>
      <div className="border p-4 rounded-lg  p-2 flex w-full flex-col border-opacity-50 ">
        
      
      <ul className="flex flex-wrap">
        {kayaks.map((kayak) => (
          <li key={kayak._id} className="w-full md:w-1/2 lg:w-1/3 p-2">
            <Link to={`/kayaks/${kayak._id}`}>
              <div className="border p-4 rounded-lg">
                <img
                  src={kayak.imageUrl}
                  alt={kayak.name}
                  className="max-w-xl w-full h-auto"
                />
                <h3 className="text-xl font-bold">{kayak.name}</h3>
                <p className="mb-4">{kayak.characteristics}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
    <div className="divider">Your Reviews</div>
        <ul>
          {reviews.map(review => (
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
          ))}
        </ul>
    </div>
  );
};

export default ProfilePage;