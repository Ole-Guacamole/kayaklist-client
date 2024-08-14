import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ClubsKayaksList = () => {
  const [kayaks, setKayaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddNewKayak = () => {
    navigate('/add-new-kayak'); // Adjust the path as needed
  };

  useEffect(() => {
    const fetchKayaks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/kayaks`
        );
        console.log("Fetched kayaks:", response.data); // Debugging log
        const clubKayaks = response.data.filter(
          (kayak) => kayak.ownerType === "Club Boat"
        );
        console.log("Filtered club kayaks:", clubKayaks); // Debugging log
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
      <div className="divider">Club Kayaks</div>
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
    
    <div className="w-full mt-6">
        <div className="flex justify-center">
    
    <button className="btn btn-outline mx-2" onClick={handleAddNewKayak}>
          Add New Kayak
        </button>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ClubsKayaksList;
