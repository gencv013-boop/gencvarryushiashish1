import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  const features = [
    { title: "Create CV", icon: "📝", link: "/create" },
    { title: "Saved CVs", icon: "📂", link: "/cvs" },
    { title: "Templates", icon: "📄", link: "/templates" },
    { title: "Profile", icon: "👤", link: "/profile" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg text-center"
            onClick={() => nav(f.link)}
          >
            <div className="text-4xl">{f.icon}</div>
            <div className="mt-2 font-semibold">{f.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
