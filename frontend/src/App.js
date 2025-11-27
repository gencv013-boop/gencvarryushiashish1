import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";

import CVTemplate1 from "./pages/CVBuilder/CVTemplate1"; // This will be /cv-ai-builder
import Profile from "./pages/Profile/Profile";
import AISummary from "./pages/AI/AISummary";
import Templates from "./pages/Templates";
import TemplateEditor from "./pages/TemplateEditor";





function App() {
  return (
    <Router>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* CV AI Builder */}
        <Route path="/cv-ai-builder" element={<CVTemplate1 />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/ai-summary" element={<AISummary />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/template-editor" element={<TemplateEditor />} />



      </Routes>
    </Router>
  );
}

export default App;
