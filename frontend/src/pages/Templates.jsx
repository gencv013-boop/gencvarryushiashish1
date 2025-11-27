import React, { useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const templates = [
    { id: 1, name: "Modern CV", preview: "/templates/template1.png" },
    { id: 2, name: "Simple Clean", preview: "/templates/template2.png" },
    { id: 3, name: "Professional Blue", preview: "/templates/template3.png" },
  ];

  return (
    <div className="p-10">
      {/* Back Btn */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center mb-6 text-blue-600"
      >
        <ArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Choose a Template</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border shadow hover:shadow-lg p-4 cursor-pointer"
            onClick={() => navigate("/template-editor", { state: { template: t } })}

          >
            <img
              src={t.preview}
              alt={t.name}
              className="w-full h-60 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold">{t.name}</h3>
          </div>
        ))}
      </div>

      {/* Template Preview Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl">
            <img
              src={selected.preview}
              alt="Preview"
              className="w-full rounded-lg mb-4"
            />

            <h2 className="text-xl font-bold mb-2">{selected.name}</h2>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>

              <button
                onClick={() => navigate("/cv-ai-builder")}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Use Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
