import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClubsKayaksList = () => {
  const [kayaks, setKayaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKayaks = async () => {
      try {
        const response = await axios.get('http://localhost:5005/kayaks');
        console.log('Fetched kayaks:', response.data); // Debugging log
        const clubKayaks = response.data.filter(kayak => kayak.ownerType === 'Club Boat');
        console.log('Filtered club kayaks:', clubKayaks); // Debugging log
        setKayaks(clubKayaks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKayaks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Club Kayaks</h2>
      <ul>
        {kayaks.map((kayak) => (
          <li key={kayak._id}>
            <h3>{kayak.name}</h3>
            <p>{kayak.description}</p>
            <img src={kayak.imageUrl} alt={kayak.name} className="max-w-xs w-full h-auto"  />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubsKayaksList;