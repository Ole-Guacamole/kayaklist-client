import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrivateKayaksList = () => {
  const [kayaks, setKayaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKayaks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/kayaks`);
        console.log('Fetched kayaks:', response.data); // Debugging log
        const privateKayaks = response.data.filter(kayak => kayak.ownerType === 'Private Boat');
        console.log('Filtered private kayaks:', privateKayaks); // Debugging log
        setKayaks(privateKayaks);
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
    <h2>Private Kayaks</h2>
    <ul className="flex flex-wrap">
      {kayaks.map((kayak) => (
        <li key={kayak._id} className="w-full md:w-1/2 lg:w-1/3 p-2">
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold">{kayak.name}</h3>
            <p className="mb-4">{kayak.description}</p>
            <img src={kayak.imageUrl} alt={kayak.name} className="max-w-xs w-full h-auto"  />
          </div>
        </li>
      ))}
    </ul>
  </div>
);
};

export default PrivateKayaksList;