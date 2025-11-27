import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    about: "",
  });

  const [avatar, setAvatar] = useState(null);

  // Load data from localStorage when page opens
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
      localStorage.setItem("avatar", url);
    }
  };

  // Load avatar also
  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const updateField = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(profile));
    alert("Profile saved!");
  };

  return (
    <div className="p-10">

      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center mb-6 text-blue-600"
      >
        <ArrowLeft className="mr-2" size={18} /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 shadow relative">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <User size={60} />
              </div>
            )}
          </div>

          <label className="mt-4 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Upload Photo
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        {/* FORM */}
        <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg border">
          <h2 className="text-xl font-semibold mb-4">Edit Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium">Full Name</label>
              <input
                type="text"
                value={profile.fullName || ""}
                onChange={(e) => updateField("fullName", e.target.value)}
                className="w-full p-3 border rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-medium">Job Title</label>
              <input
                type="text"
                value={profile.jobTitle || ""}
                onChange={(e) => updateField("jobTitle", e.target.value)}
                className="w-full p-3 border rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                value={profile.email || ""}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full p-3 border rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="font-medium">Phone</label>
              <input
                type="text"
                value={profile.phone || ""}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full p-3 border rounded-lg mt-1"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="font-medium">About You</label>
            <textarea
              value={profile.about || ""}
              onChange={(e) => updateField("about", e.target.value)}
              className="w-full p-3 border rounded-lg mt-1 h-32"
            ></textarea>
          </div>

          <button
            onClick={saveProfile}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-700"
          >
            <Save className="mr-2" size={18} /> Save Profile
          </button>
        </div>

      </div>
    </div>
  );
}
