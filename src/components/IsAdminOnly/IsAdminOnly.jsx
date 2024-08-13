import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";

function IsPrivate({ children }) {
  const { isLoggedIn, isAdmin, isLoading } = useContext(AuthContext);

  console.log("isLoggedIn:", isLoggedIn); // Debug log
  console.log("isAdmin:", isAdmin); // Debug log

  // If the authentication is still loading ⏳
  if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    // If the user is not logged in, navigate to the login page ❌
    return <Navigate to="/login" />;
  }

  if (isLoggedIn && !isAdmin) {
    // If the user is logged in but not an admin, show a message ❌
    return <div>This page is only accessible for admins.</div>;
  }

  // If the user is logged in and is an admin, allow to see the page ✅
  return children;
}

export default IsPrivate;
