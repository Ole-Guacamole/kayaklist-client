import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";

import logo from "../../assets/images/logo.png";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Function to close dropdown
  const closeDropdown = () => setDropdownOpen(false);

  // Function to handle logout
  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  return (
    <nav className="relative w-full top-0 left-0 right-0 p-4">
      <div className="navbar bg-neutral text-neutral-content rounded-lg w-full ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/" onClick={closeDropdown} className="hover:bg-gray-700 hover:text-white">Home</Link>
                </li>
                <li>
                  <Link to="/kayaks" onClick={closeDropdown} className="hover:bg-gray-700 hover:text-white">Kayak Catalogue</Link>
                </li>
                <li>
                  <Link to="/kayaks/reco" onClick={closeDropdown} className="hover:bg-gray-700 hover:text-white">Kayak Recommendation</Link>
                </li>
                <li>
                  <Link to="/create-new-kayak" onClick={closeDropdown} className="hover:bg-gray-700 hover:text-white">Create New Kayak</Link>
                </li>
                <li>
                  <Link to="/about" onClick={closeDropdown} className="hover:bg-gray-700 hover:text-white">About</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="navbar-center w-40">
          {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
          
                <img
                  alt="Tailwind CSS Navbar component"
                  src={logo}
                />
            
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={toggleDropdown}
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {!isLoggedIn && (
                  <>
                    <li>
                      <Link to="/signup" onClick={closeDropdown} className="hover:bg-gray-700 hover:text-white">Signup</Link>
                    </li>
                    <li>
                      <Link to="/login" onClick={closeDropdown} className="hover:bg-gray-700 hover:text-white">Login</Link>
                    </li>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <li>
                      <Link to="/profile" onClick={closeDropdown} className="hover:bg-gray-700 hover:text-white">Profile</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="hover:bg-gray-700 hover:text-white">Logout</button>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;