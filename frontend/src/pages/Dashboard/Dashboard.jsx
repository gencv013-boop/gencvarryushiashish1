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
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

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

  const quickActions = [
    {
      label: "New CV",
      description: "Start a fresh CV",
      icon: FileText,
      onClick: () => navigate("/cv-ai-builder"),
    },
    {
      label: "AI Summary",
      description: "Generate a summary",
      icon: Sparkles,
      onClick: () => navigate("/ai-summary"),
    },
    {
      label: "Browse Templates",
      description: "See all templates",
      icon: Home,
      onClick: () => navigate("/templates"),
    },
  ];

  const recentActivity = [
    {
      title: "Updated CV for Frontend Developer role",
      time: "2 hours ago",
    },
    {
      title: "Generated AI summary for Product Manager CV",
      time: "1 day ago",
    },
    {
      title: "Downloaded CV - Software Engineer",
      time: "3 days ago",
    },
  ];

  return (
    <div
      className={`${
        dark
          ? "dark bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      } flex h-screen overflow-hidden transition-colors duration-300`}
    >
      {/* SIDEBAR */}
      <div
        className={`${
          dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
        } shadow-lg flex flex-col transition-all duration-300 border-r ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="px-4 py-5 font-bold text-2xl border-b flex items-center justify-between dark:border-gray-800">
          {!collapsed && <span>GenCV</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <div className="flex-1 px-2 py-4 space-y-1">
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

        <div className="p-3 border-t dark:border-gray-800">
          <SidebarItem
            icon={<LogOut size={20} />}
            label="Logout"
            collapsed={collapsed}
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b dark:border-gray-800">
          <TopBar
            dark={dark}
            setDark={setDark}
            onToggleSidebar={() => setCollapsed(!collapsed)}
          />
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-4">Welcome back! 👋</h1>
          <p className="text-gray-500 dark:text-gray-300 mb-6">
            Here’s a quick overview of your CV activity and tools.
          </p>

          {/* QUICK ACTIONS */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Quick actions</h2>
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                      bg-white dark:bg-gray-800 shadow hover:shadow-md
                      hover:-translate-y-0.5 transition transform"
                  >
                    <Icon size={18} />
                    <span>{action.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      · {action.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow
                  hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                <h2 className="text-3xl font-bold mb-1">{s.value}</h2>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  {s.title}
                </p>
              </div>
            ))}
          </div>

          {/* FEATURE CARDS + RECENT ACTIVITY */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:col-span-2">
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
                onClick={() => navigate("/templates")}
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

            {/* RECENT ACTIVITY */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow h-fit">
              <h2 className="text-lg font-semibold mb-4">Recent activity</h2>
              <ul className="space-y-3">
                {recentActivity.map((item, idx) => (
                  <li key={idx} className="border-b last:border-0 pb-3 last:pb-0 dark:border-gray-700">
                    <p className="text-sm font-medium mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.time}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, onClick, active, collapsed }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${
        collapsed ? "justify-center" : "justify-start"
      } space-x-3 px-3 py-2 rounded-lg cursor-pointer text-sm
      transition hover:bg-gray-100 dark:hover:bg-gray-800
      ${
        active
          ? "bg-gray-200 dark:bg-gray-700 font-semibold"
          : ""
      }`}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

function TopBar({ dark, setDark, onToggleSidebar }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>
        <input
          type="text"
          placeholder="Search CVs, templates..."
          className="p-2 w-52 sm:w-64 rounded-lg border shadow-sm text-sm
            bg-white dark:bg-gray-900 dark:border-gray-700"
        />
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full border bg-white dark:bg-gray-900
            dark:border-gray-700 hover:shadow"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] px-1 rounded-full">
            3
          </span>
        </div>

        {/* User dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-gray-900 border dark:border-gray-700 text-sm"
            onClick={() => setOpen(!open)}
          >
            <User2 size={18} />
            <span className="hidden sm:inline">Hello, User</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-lg w-40 text-sm z-10">
              <div
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
              >
                Profile
              </div>
              <div
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  navigate("/settings");
                  setOpen(false);
                }}
              >
                Settings
              </div>
              <div
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow
        hover:shadow-lg cursor-pointer transition transform hover:-translate-y-0.5 text-left"
    >
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-300">{description}</p>
    </button>
  );
}
