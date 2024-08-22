import React, { useState, useEffect, useContext } from 'react';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';
import axios from 'axios';
import { AuthContext } from "../../context/auth.context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RentalDatePicker = ({ kayakId }) => {
  const [range, setRange] = useState(undefined);
  const [bookedDates, setBookedDates] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch booked dates from the backend
    fetchBookedDates();
  }, [kayakId]);

  const fetchBookedDates = () => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/rentals/kayaks/${kayakId}`)
      .then(response => {
        // Convert booked dates to Date objects
        const dates = response.data.map(rental => ({
          from: new Date(rental.startDate),
          to: new Date(rental.endDate),
          user: rental.user_id.name,
          userId: rental.user_id._id,
          id: rental._id
        }));
        setBookedDates(dates);
      })
      .catch(error => {
        console.error('Error fetching booked dates:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      });
  };

  const handleSubmit = () => {
    if (range?.from && range?.to) {
      axios.post(`${import.meta.env.VITE_SERVER_URL}/rentals`, { kayak_id: kayakId, user_id: user._id, startDate: range.from, endDate: range.to })
        .then(response => {
          // Handle the response data
          console.log(response.data);
          toast.success('New reservation created successfully!');
          // Fetch updated booked dates
          fetchBookedDates();
        })
        .catch(error => {
          console.error('Error submitting rental:', error);
          if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
          } else if (error.request) {
            console.error('Error request:', error.request);
          } else {
            console.error('Error message:', error.message);
          }
        });
    } else {
      console.error('Please select a date range.');
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_SERVER_URL}/rentals/${id}`)
      .then(response => {
        toast.success('Reservation deleted successfully!');
        fetchBookedDates(); // Refresh booked dates
      })
      .catch(error => {
        console.error('Error deleting reservation:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      });
  };

  // Convert booked dates to a format that can be used by react-day-picker
  const disabledDays = bookedDates.flatMap(({ from, to }) => {
    const days = [];
    for (let d = new Date(from); d <= new Date(to); d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  });

  return (
    <>
    <ToastContainer />
      <h3 className="text-xl font-bold mt-4 mb-2 text-center">Reserve Kayak:</h3>
      <div className="flex justify-center items-center w-full p-4 mb-4 rounded-lg border border-gray-300">
        <div className="text-center">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={disabledDays}
            modifiers={{
              booked: disabledDays,
              rounded: (date) => true, // Apply to all day
            }}
            modifiersStyles={{
              booked: {
                backgroundColor: '#ffcccc',
                color: '#ff0000'
              },
              rounded: {
                borderRadius: '30%' // Round the edges of the days
              }
            }}
          />
          <button className="btn btn-primary btn-outline mt-4" onClick={handleSubmit}>Reserve kayak</button>
        </div>
      </div>
      <div className="mt-4 mb-6 text-center">
        <h4 className="text-lg font-bold mb-2">Existing Reservations:</h4>
        <ul className="list-disc list-inside">
        {bookedDates.map((date, index) => (
            <p key={index} className="my-2">
              {date.from.toLocaleDateString()} - {date.to.toLocaleDateString()} by {date.user}
              {(user._id === date.userId) && (
                <button className="btn btn-danger btn-xs btn-outline ml-2" onClick={() => handleDelete(date.id)}>Delete</button>
              )}
            </p>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RentalDatePicker;