import React, { useState } from "react";
import { Wand2, FileText } from "lucide-react";

export default function AICVBuilder() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    skills: "",
    experience: "",
    education: "",
  });

  const [generatedCV, setGeneratedCV] = useState(null);

  // Handle User Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // AI CV Generation Function (Mock for now)
  const generateAI = () => {
    const aiCV = {
      summary: `Experienced ${formData.title} with strong expertise in ${formData.skills}. 
      Proven track record in delivering high-impact results and contributing effectively 
      to organizational goals.`,

      experience: `• Managed ${formData.experience}  
• Improved workflow efficiency and contributed to key team objectives`,

      skills: formData.skills.split(",").map((s) => s.trim()),

      education: formData.education,
    };

    setGeneratedCV(aiCV);
  };

  return (
    <div className="flex h-screen">
      
      {/* LEFT PANEL - USER INPUT */}
      <div className="w-1/2 p-6 bg-white shadow-lg overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">AI CV Generator</h1>

        <div className="space-y-4">

          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            label="Job Title (e.g., Frontend Developer)"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <InputField
            label="Key Skills (comma separated)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />

          <InputField
            label="Experience Summary (1–2 lines)"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />

          <InputField
            label="Education"
            name="education"
            value={formData.education}
            onChange={handleChange}
          />

          <button
            onClick={generateAI}
            className="px-4 py-3 w-full bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700"
          >
            <Wand2 size={20} />
            <span>Generate CV with AI</span>
          </button>
        </div>
      </div>

      {/* RIGHT PANEL - LIVE PREVIEW */}
      <div className="w-1/2 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 flex items-center space-x-2">
          <FileText /> <span>CV Preview</span>
        </h1>

        {!generatedCV ? (
          <p className="text-gray-500">Fill details and click Generate.</p>
        ) : (
          <div className="bg-white p-6 shadow-lg rounded-lg space-y-4">

            <h2 className="text-3xl font-bold">{formData.name}</h2>
            <h3 className="text-lg text-gray-600">{formData.title}</h3>

            <section>
              <h4 className="font-bold text-xl border-b mb-2">Professional Summary</h4>
              <p className="text-gray-700">{generatedCV.summary}</p>
            </section>

            <section>
              <h4 className="font-bold text-xl border-b mb-2">Skills</h4>
              <ul className="list-disc pl-6">
                {generatedCV.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4 className="font-bold text-xl border-b mb-2">Experience</h4>
              <p className="text-gray-700 whitespace-pre-line">
                {generatedCV.experience}
              </p>
            </section>

            <section>
              <h4 className="font-bold text-xl border-b mb-2">Education</h4>
              <p className="text-gray-700">{generatedCV.education}</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

// REUSABLE INPUT FIELD COMPONENT
function InputField({ label, ...props }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <input
        {...props}
        className="w-full p-2 border rounded-lg mt-1"
      />
    </div>
  );
}