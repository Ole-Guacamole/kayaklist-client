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
  }, [kayakId]);

  const handleSubmit = () => {
    if (range?.from && range?.to) {
      axios.post(`${import.meta.env.VITE_SERVER_URL}/rentals`, { kayak_id: kayakId, user_id: user._id, startDate: range.from, endDate: range.to })
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
  const disabledDays = bookedDates.flatMap(({ from, to }) => {
    const days = [];
    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  });

  return (
    
    <div className="p-3 m-3 bg-gray-100 rounded-lg border border-gray-300">
      <h3 className="font-semibold">Chose a date range to book a kayak for rent:</h3>
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
      <button className="btn btn-xs btn-outline btn-neutral" onClick={handleSubmit}>Rent Kayak</button>
    </div>
  );
};

export default RentalDatePicker;