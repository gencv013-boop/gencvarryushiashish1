import React, { useState } from "react";
import { Download, Sparkles } from "lucide-react";

export default function CVTemplate1() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    about: "",
    skills: "",
    experience: "",
    education: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const autoFillAI = () => {
    setFormData({
      name: "Aryushi Mishra",
      title: "Frontend Developer",
      email: "aryushi@example.com",
      phone: "+91 98765 43210",
      about:
        "Passionate frontend developer skilled in React, TailwindCSS and building modern UI experiences.",
      skills: "React, JavaScript, HTML, CSS, Tailwind, Git, REST API",
      experience:
        "Frontend Developer Intern at ABC Tech (2024)\n- Built modern UI pages\n- Integrated frontend with backend",
      education:
        "B.Tech in Computer Science — XYZ University (2025)",
    });
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT PANEL — FORM */}
      <div className="p-6 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Fill Your CV Details</h2>

        {/* Auto Fill Button */}
        <button
          onClick={autoFillAI}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-purple-700"
        >
          <Sparkles size={18} /> Auto-Fill using AI
        </button>

        {/* Form */}
        {[
          { label: "Full Name", name: "name" },
          { label: "Professional Title", name: "title" },
          { label: "Email", name: "email" },
          { label: "Phone", name: "phone" },
        ].map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        <TextAreaField
          label="About You"
          name="about"
          value={formData.about}
          onChange={handleChange}
        />

        <TextAreaField
          label="Skills (comma separated)"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
        />

        <TextAreaField
          label="Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />

        <TextAreaField
          label="Education"
          name="education"
          value={formData.education}
          onChange={handleChange}
        />
      </div>

      {/* RIGHT PANEL — LIVE CV PREVIEW */}
      <div className="p-6 bg-white overflow-y-auto">
        <div className="max-w-[700px] mx-auto border shadow-lg p-6 rounded-xl">

          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900">{formData.name || "Your Name"}</h1>
          <p className="text-gray-600 mb-4">{formData.title || "Your Title"}</p>

          {/* Contact */}
          <div className="text-sm text-gray-700 mb-6">
            <p>Email: {formData.email || "example@mail.com"}</p>
            <p>Phone: {formData.phone || "+91 XXXXX XXXXX"}</p>
          </div>

          <Section title="About Me" content={formData.about} placeholder="Write about yourself..." />
          <Section title="Skills" content={formData.skills} placeholder="List your skills..." />
          <Section title="Experience" content={formData.experience} placeholder="Add your experience..." />
          <Section title="Education" content={formData.education} placeholder="Add your education..." />

          {/* Download Button */}
          <button className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Download size={18} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE INPUT COMPONENTS */

function InputField({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="font-medium">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-lg border mt-1"
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="font-medium">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="3"
        className="w-full p-2 rounded-lg border mt-1"
      ></textarea>
    </div>
  );
}

function Section({ title, content, placeholder }) {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-gray-700 whitespace-pre-line">
        {content || placeholder}
      </p>
    </div>
  );
}
