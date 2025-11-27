import React, { useState } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function TemplateEditor() {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive template from /templates page
  const template = location.state?.template;

  const [form, setForm] = useState({
    fullName: "John Doe",
    jobTitle: "Software Developer",
    summary: "Experienced developer with strong skills...",
    experience: "Company A (2020 - 2023)\n- Led projects...\n- Built apps...",
    skills: "JavaScript, React, Node.js, TailwindCSS",
  });

  const handleDownload = () => {
    window.print(); // TEMP — will replace with real PDF system later
  };

  if (!template)
    return <p className="p-10 text-red-600">No template selected!</p>;

  return (
    <div className="p-10">

      {/* Back Button */}
      <button
        onClick={() => navigate("/templates")}
        className="flex items-center mb-6 text-blue-600"
      >
        <ArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-4">
        Editing: {template.name}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT — FORM */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Customize Content</h2>

          <div className="space-y-4">
            {Object.keys(form).map((key) => (
              <div key={key}>
                <label className="block font-medium capitalize mb-1">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>

                <textarea
                  value={form[key]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg h-24"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleDownload}
            className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg flex items-center"
          >
            <Download className="mr-2" size={18} /> Download PDF
          </button>
        </div>

        {/* RIGHT — LIVE CV PREVIEW */}
        <div className="border p-6 shadow rounded-xl bg-white">
          <h2 className="text-3xl font-bold">{form.fullName}</h2>
          <p className="text-lg text-gray-600">{form.jobTitle}</p>

          <hr className="my-4" />

          <h3 className="font-semibold text-xl">Summary</h3>
          <p className="whitespace-pre-line">{form.summary}</p>

          <h3 className="font-semibold text-xl mt-4">Experience</h3>
          <p className="whitespace-pre-line">{form.experience}</p>

          <h3 className="font-semibold text-xl mt-4">Skills</h3>
          <p>{form.skills}</p>
        </div>

      </div>
    </div>
  );
}
