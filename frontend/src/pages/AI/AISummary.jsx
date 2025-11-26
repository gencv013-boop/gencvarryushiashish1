import React, { useState } from "react";
import { Sparkles } from "lucide-react";

export default function AISummary() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!input.trim()) {
      alert("Please enter your experience or skills first!");
      return;
    }

    setLoading(true);

    try {
      // Correct backend route
      const response = await fetch("http://localhost:5000/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "User",
          skills: input,
          experience: input,
          education: "Not Provided"
        }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      console.error("Error generating summary:", err);
      setSummary("❌ Error generating summary. Make sure backend is running.");
    }

    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">AI Resume Summary Generator</h1>

      <textarea
        className="w-full p-4 border rounded-lg mb-4"
        rows="6"
        placeholder="Describe your skills, experience or projects..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={generateSummary}
        className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
        disabled={loading}
      >
        <Sparkles size={18} />
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h2 className="font-bold text-xl mb-2">AI Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

