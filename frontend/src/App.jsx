import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import AISummary from "./pages/AI/AISummary";


// Add these imports 👇
import CVTemplate1 from "./pages/CVBuilder/CVTemplate1";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <Router>
      <Routes>

        {/* Default → Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* CV Builder */}
        <Route path="/cv-template-1" element={<CVTemplate1 />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/ai-summary" element={<AISummary />} />


      </Routes>
    </Router>
  );
}

export default App;
