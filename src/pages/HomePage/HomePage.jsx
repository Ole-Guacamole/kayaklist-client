import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to KayakList</h1>
      
      <div className="rounded-box border p-4 m-4">
            <Link to="/kayaks">View All Kayaks</Link>
        </div>
      <div className="rounded-box border p-4 m-4">
            <Link to="/kayaks/reco">Get personal reccommendation</Link>
      </div>
     
    </div>
  );
};

export default HomePage;