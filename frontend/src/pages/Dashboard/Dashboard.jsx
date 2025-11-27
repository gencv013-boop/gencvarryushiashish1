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
  Sun,
  Moon,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

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

  const templates = [
    "Modern CV",
    "Simple Clean",
    "Professional Blue",
    "Minimal Grey",
    "Creative Layout",
    "ATS Friendly",
  ];

  return (
    <div
      className={`flex h-screen overflow-hidden transition ${
        dark ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* SIDEBAR */}
      <div
        className={`backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 shadow-2xl flex flex-col border-r border-white/20 dark:border-gray-700/40 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="px-6 py-6 font-bold text-2xl border-b border-white/20 dark:border-gray-700/40 flex items-center justify-between">
          {!collapsed && "GenCV"}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-white/40 dark:hover:bg-gray-700/60"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
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

        <div className="p-4 border-t border-white/20 dark:border-gray-700/40">
          <SidebarItem
            icon={<LogOut size={20} />}
            label="Logout"
            collapsed={collapsed}
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 overflow-y-auto">
        <TopBar dark={dark} setDark={setDark} />

        <h1 className="text-4xl font-extrabold mb-6 tracking-tight">
          Welcome back! 👋
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 p-6 rounded-2xl shadow-xl text-center border border-white/30 dark:border-gray-700/60"
            >
              <h2 className="text-4xl font-bold drop-shadow-sm">{s.value}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm tracking-wide">
                {s.title}
              </p>
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
            onClick={() => setShowTemplates(true)} // <<< HERE
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

        {/* TEMPLATES SECTION (shows after clicking Templates card) */}
        {showTemplates && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Templates</h2>
              <button
                onClick={() => setShowTemplates(false)}
                className="text-sm px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((name, index) => (
                <button
                  key={index}
                  onClick={() => alert(`You clicked: ${name}`)}
                  className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 p-4 rounded-2xl shadow-md border border-white/30 dark:border-gray-700/60 text-left transition transform hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Fake preview box */}
                  <div className="h-32 mb-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-700 dark:to-gray-600" />

                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Click to use this template.
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Sidebar item */
function SidebarItem({ icon, label, onClick, active, collapsed }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${
        collapsed ? "justify-center" : "justify-start"
      } space-x-3 px-3 py-2 rounded-xl text-sm transition
      ${
        active
          ? "bg-blue-500/80 text-white shadow-md"
          : "bg-white/40 dark:bg-gray-800/40 hover:bg-white/70 dark:hover:bg-gray-700/70 text-gray-800 dark:text-gray-100"
      }`}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

/* Top bar */
function TopBar({ dark, setDark }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 w-64 rounded-xl border border-white/40 dark:border-gray-700/60 shadow-sm bg-white/70 dark:bg-gray-900/60 text-sm outline-none focus:ring-2 focus:ring-blue-400/60"
      />

      <div className="flex items-center space-x-4">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full border border-white/40 dark:border-gray-700/60 bg-white/70 dark:bg-gray-900/70 shadow-sm"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative p-2 rounded-full bg-white/70 dark:bg-gray-900/70 border border-white/40 dark:border-gray-700/60 cursor-pointer">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
            3
          </span>
        </div>

        {/* User avatar / name */}
        <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/70 dark:bg-gray-900/70 border border-white/40 dark:border-gray-700/60">
          <User2 size={20} />
          <span className="text-sm font-medium">Hello, User</span>
        </div>
      </div>
    </div>
  );
}

/* Feature card */
function FeatureCard({ title, description, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 p-6 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/60 text-left transition transform hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </button>
  );
}
