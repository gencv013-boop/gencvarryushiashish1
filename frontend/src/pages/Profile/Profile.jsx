import React from "react";
import { User2 } from "lucide-react";

export default function Profile() {
  // Example static data. Later you can fetch from backend
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    title: "Frontend Developer",
    skills: ["React", "Tailwind CSS", "JavaScript"],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <User2 size={48} className="text-blue-500" />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.title}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg border-b pb-1 mb-2">Email</h3>
          <p>{user.email}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg border-b pb-1 mb-2">Skills</h3>
          <ul className="list-disc pl-6">
            {user.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
