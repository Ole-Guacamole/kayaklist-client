import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Adjust the import path as necessary

const RentalDatePicker = () => {
  const { kayakId } = useParams();
  const [range, setRange] = useState(undefined);
  const [bookedDates, setBookedDates] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch booked dates from the backend
    axios.get(`/rentals/kayaks/${kayakId}`)
      .then(response => {
        setBookedDates(response.data);
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
  }, [kayakId]);

  const handleSubmit = () => {
    if (range?.from && range?.to) {
      axios.post('/rentals', { kayak_id: kayakId, user_id: user._id, startDate: range.from, endDate: range.to })
        .then(response => {
          // Handle the response data
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error submitting rental:', error);
          if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
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
  const disabledDays = bookedDates.map(date => new Date(date));

  return (
    <div>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        disabled={disabledDays}
        modifiers={{
          booked: disabledDays
        }}
        modifiersStyles={{
          booked: {
            backgroundColor: '#ffcccc',
            color: '#ff0000'
          }
        }}
      />
      <button onClick={handleSubmit}>Rent Kayak</button>
    </div>
  );
};

export default RentalDatePicker;