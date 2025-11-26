import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  Wand2,
  Settings,
  LogOut,
  User2,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="px-6 py-6 font-bold text-2xl border-b">
          GenCV
        </div>

        <div className="flex-1 px-4 py-6 space-y-3">
          <SidebarItem 
            icon={<Home size={20} />} 
            label="Home" 
            onClick={() => navigate("/dashboard")} 
          />

          <SidebarItem 
            icon={<FileText size={20} />} 
            label="Create CV" 
            onClick={() => navigate("/cv-ai-builder")} 
          />

          <SidebarItem 
            icon={<Wand2 size={20} />} 
            label="AI Generator" 
            onClick={() => navigate("/cv-ai-builder")} 
          />

          <SidebarItem 
            icon={<User2 size={20} />} 
            label="Profile" 
            onClick={() => navigate("/profile")} 
          />

          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            onClick={() => navigate("/settings")} 
          />
        </div>

        <div className="p-4 border-t">
          <SidebarItem 
            icon={<LogOut size={20} />} 
            label="Logout" 
            onClick={() => navigate("/")} 
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        <TopBar />

        <h1 className="text-3xl font-bold mb-6">Welcome back! 👋</h1>

        {/* CARDS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <FeatureCard
            title="Build a CV"
            description="Create a professional CV in minutes."
            icon={<FileText size={32} />}
            onClick={() => navigate("/cv-ai-builder")}
          />

          <FeatureCard
            title="AI Resume Summary"
            description="Generate smart resume summaries."
            icon={<Wand2 size={32} />}
            onClick={() => navigate("/ai-summary")}

          />

          <FeatureCard
            title="Templates"
            description="Choose from modern templates."
            icon={<Home size={32} />}
          />

          <FeatureCard
            title="Profile"
            description="View and edit your account details."
            icon={<User2 size={32} />}
            onClick={() => navigate("/profile")}
          />

          <FeatureCard
            title="Settings"
            description="Manage your preferences."
            icon={<Settings size={32} />}
            onClick={() => navigate("/settings")}
          />
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex justify-between items-center mb-8">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 w-64 rounded-lg border shadow-sm"
      />

      <div className="flex items-center space-x-4">
        <span className="font-medium">Hello, User</span>
        <User2 size={28} className="text-gray-600" />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
