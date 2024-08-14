import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import KayakDetailsPage from "./pages/KayakDetailsPage/KayakDetailsPage";
import CreateKayakPage from "./pages/CreateKayakPage/CreateKayakPage";
import EditKayakPage from "./pages/EditKayakPage/EditKayakPage";
import KayakListPage from "./pages/KayakListPage/KayakListPage";
import KayakRecoPage from "./pages/KayakRecoPage/KayakRecoPage";
import AboutPage from "./pages/AboutPage/AboutPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import IsAdminOnly from "./components/IsAdminOnly/IsAdminOnly";


function App() {
  return (
    <div className="App flex flex-col items-center justify-center min-h-screen">
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
            <IsAdminOnly>
              <SignupPage />
            </IsAdminOnly>
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

        <Route path="/kayaks/:id" element={<IsPrivate><KayakDetailsPage /></IsPrivate>} />

        <Route path="/about" element={<IsPrivate><AboutPage /></IsPrivate>} />

        <Route path="/kayaks/" element={<IsPrivate><KayakListPage /></IsPrivate>} />

        <Route path="/kayaks/reco" element={<IsPrivate><KayakRecoPage /></IsPrivate>} />

        <Route path="/create-new-kayak" element={<IsPrivate><CreateKayakPage /></IsPrivate>} />

        <Route path="/kayaks/:id/edit" element={<IsPrivate><EditKayakPage /></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
