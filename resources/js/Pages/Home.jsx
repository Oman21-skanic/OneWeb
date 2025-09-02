import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000/api"; // Sesuaikan dengan backend kamu

export default function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // 🔹 Fetch projects dengan axios
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE}/projects`);
        console.log("Data projects:", res.data); // Debugging
        setProjects(res.data);
      } catch (err) {
        console.error("Gagal fetch projects:", err);
      }
    };
    fetchProjects();
  }, []);

  // 🔹 Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {
      await axios.post(`${API_BASE}/contact`, formData);
      setSuccess("Pesan berhasil dikirim!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Gagal kirim pesan:", err);
    }
    setLoading(false);
  };

  return (
    <div className="font-sans">
      {/* 🔹 Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-black text-white px-8 py-4 flex justify-between items-center shadow-md z-50">
        <h1 className="text-2xl font-bold">OneWeb</h1>
        <div className="space-x-6">
          {["home", "about", "projects", "contact"].map((n) => (
            <a
              key={n}
              href={`#${n}`}
              className="hover:text-green-400 transition"
            >
              {n.charAt(0).toUpperCase() + n.slice(1)}
            </a>
          ))}
        </div>
      </nav>

      {/* 🔹 Hero Section */}
      <section
        id="home"
        className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-green-900 text-white text-center px-6"
      >
        <h2 className="text-5xl font-extrabold mb-4 animate-pulse">
          Selamat Datang di OneWeb
        </h2>
        <p className="text-lg max-w-xl">
          Solusi digital modern untuk website cepat, elegan, dan responsif.
        </p>
        <a
          href="#projects"
          className="mt-6 px-6 py-3 bg-green-500 text-black rounded-xl font-semibold hover:bg-green-400 transition"
        >
          Lihat Project
        </a>
      </section>

      {/* 🔹 About Section */}
      <section id="about" className="py-20 bg-white text-black text-center">
        <h2 className="text-3xl font-bold mb-6">Tentang Kami</h2>
        <p className="max-w-2xl mx-auto text-lg">
          OneWeb adalah tim kreatif yang berfokus pada pembuatan website
          berkualitas tinggi dengan performa cepat, desain modern, dan user
          experience yang optimal.
        </p>
      </section>

      {/* 🔹 Projects Section */}
      <section id="projects" className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Projek Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          {projects.length > 0 ? (
            projects.map((p, i) => (
              <div
                key={p.id || `project-${i}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={p.image || "https://via.placeholder.com/400x200"}
                  alt={p.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="text-gray-600">{p.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Belum ada project.</p>
          )}
        </div>
      </section>

      {/* 🔹 Contact Section */}
      <section
        id="contact"
        className="py-20 bg-black text-white flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold mb-6">Hubungi Kami</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-lg"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama"
            required
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Pesan"
            required
            rows="4"
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </button>
          {success && <p className="text-green-400 mt-4">{success}</p>}
        </form>
      </section>

      {/* 🔹 Footer */}
      <footer className="bg-black text-gray-400 py-6 text-center">
        <p>© {new Date().getFullYear()} OneWeb. All rights reserved.</p>
      </footer>
    </div>
  );
}
