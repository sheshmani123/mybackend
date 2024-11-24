import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import LoginPopup from "./components/LoginPopup/LoginPopup";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import List from "./pages/List/List";
import SearchResults from './pages/SearchResults/SearchResults.'

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginClose = () => {
    setShowLogin(false);
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route
          path="/"
          element={
            showLogin ? (
              <LoginPopup setShowLogin={handleLoginClose} />
            ) : null
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-list" element={<List />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </>
  );
};

export default App;
