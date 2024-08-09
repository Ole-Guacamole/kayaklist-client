import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to KayakList</h1>
      <nav>
        <ul>
          <li>
            <Link to="/kayaks">View All Kayaks</Link>
          </li>
          <li>
            <Link to="/kayaks/reco">Recommended Kayaks</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;