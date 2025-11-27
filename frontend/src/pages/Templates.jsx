import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Templates() {
  const navigate = useNavigate();

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
            onClick={() =>
              navigate("/template-editor", { state: { template: t } })
            }
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
    </div>
  );
}
