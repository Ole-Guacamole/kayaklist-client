import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import KayakDetailsPage from "./pages/KayakDetailsPage/KayakDetailsPage";
import CreateKayakPage from "./pages/CreateKayakPage/CreateKayakPage";
import EditKayakPage from "./pages/EditKayakPage/EditKayakPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route
          path="/kayaks/:id"
          element={
          <KayakDetailsPage />
          }
        />

        <Route
          path="/create-new-kayak"
          element={
            
              <CreateKayakPage />
            
          }
        />

        <Route
          path="/kayaks/:id/edit"
          element={
            
              <EditKayakPage />
            
          }
        />

      </Routes>
    </div>
  );
}

export default App;
