import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Wand2,
  Settings,
  LogOut,
  User2,
  ChevronLeft,
  ChevronRight,
  Bell,
  Menu,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", route: "/dashboard" },
    { icon: FileText, label: "Create CV", route: "/cv-ai-builder" },
    { icon: Wand2, label: "AI Generator", route: "/cv-ai-builder" },
    { icon: User2, label: "Profile", route: "/profile" },
    { icon: Settings, label: "Settings", route: "/settings" },
  ];

  const stats = [
    { title: "CVs Created", value: 12 },
    { title: "AI Summaries", value: 5 },
    { title: "Templates Used", value: 7 },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* SIDEBAR */}
      <div
        className={`bg-white shadow-lg flex flex-col transition-all duration-300 border-r
        ${collapsed ? "w-20" : "w-64"}`}
      >
        <div className="px-6 py-6 font-bold text-2xl border-b flex items-center justify-between">
          {!collapsed && "GenCV"}
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <div className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.route;
            return (
              <SidebarItem
                key={idx}
                icon={<Icon size={20} />}
                label={item.label}
                collapsed={collapsed}
                active={isActive}
                onClick={() => navigate(item.route)}
              />
            );
          })}
        </div>

        <div className="p-4 border-t">
          <SidebarItem
            icon={<LogOut size={20} />}
            label="Logout"
            collapsed={collapsed}
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">
        <TopBar />

        <h1 className="text-3xl font-bold mb-6">Welcome back! 👋</h1>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-3xl font-bold">{s.value}</h2>
              <p className="text-gray-500">{s.title}</p>
            </div>
          ))}
        </div>

        {/* FEATURE CARDS */}
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

function SidebarItem({ icon, label, onClick, active, collapsed }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition
      ${active ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"}`}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </div>
  );
}

function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-3">
        <Menu className="md:hidden cursor-pointer" />
        <input
          type="text"
          placeholder="Search..."
          className="p-2 w-64 rounded-lg border shadow-sm"
        />
      </div>

      <div className="flex items-center space-x-6 relative">
        <div className="relative cursor-pointer">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>

        <div className="cursor-pointer font-medium" onClick={() => setOpen(!open)}>
          Hello, User
        </div>

        {open && (
          <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg p-3 w-40">
            <div className="cursor-pointer p-2 hover:bg-gray-100 rounded">Profile</div>
            <div className="cursor-pointer p-2 hover:bg-gray-100 rounded">Settings</div>
            <div className="cursor-pointer p-2 hover:bg-gray-100 rounded">Logout</div>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition transform hover:scale-[1.02]"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}