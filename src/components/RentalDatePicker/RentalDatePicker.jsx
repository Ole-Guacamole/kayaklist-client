import React, { useState, useEffect, useContext } from 'react';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';
import axios from 'axios';
import { AuthContext } from "../../context/auth.context";

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
          to: new Date(rental.endDate)
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
              rounded: (date) => true // Apply to all days
            }}
            modifiersStyles={{
              booked: {
                backgroundColor: '#ffcccc',
                color: '#ff0000'
              },
              rounded: {
                borderRadius: '50%' // Round the edges of the days
              }
            }}
          />
          <button className="btn btn-primary btn-outline mt-4" onClick={handleSubmit}>Rent Kayak</button>
        </div>
      </div>
    </>
  );
};

export default RentalDatePicker;