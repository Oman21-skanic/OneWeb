import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Lorem Ipsum Dolor Sit Amet",
    image:
      "https://i.pinimg.com/1200x/7a/15/7c/7a157c19db11d707d51877ec7941c1ba.jpg",
    tech: ["Laravel", "React", "MySQL"],
    live: "#",
    github: "https://github.com/dearalsa",
  },
  {
    id: 2,
    title: "Lorem Ipsum Dolor Sit Amet",
    image:
      "https://i.pinimg.com/1200x/7a/15/7c/7a157c19db11d707d51877ec7941c1ba.jpg",
    tech: ["Next.js", "Tailwind", "MongoDB"],
    live: "#",
    github: "https://github.com/dearalsa",
  },
   {
    id: 2,
    title: "Lorem Ipsum Dolor Sit Amet",
    image:
      "https://i.pinimg.com/1200x/7a/15/7c/7a157c19db11d707d51877ec7941c1ba.jpg",
    tech: ["Next.js", "Tailwind", "MongoDB"],
    live: "#",
    github: "https://github.com/dearalsa",
  },
   {
    id: 2,
    title: "Lorem Ipsum Dolor Sit Amet",
    image:
      "https://i.pinimg.com/1200x/7a/15/7c/7a157c19db11d707d51877ec7941c1ba.jpg",
    tech: ["Next.js", "Tailwind", "MongoDB"],
    live: "#",
    github: "https://github.com/dearalsa",
  },
];

export default function Projects() {
  return (
    <section className="bg-black relative text-white py-20 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-raligo text-white drop-shadow-lg">
            OUR PROJECTS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.25,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotate: [0, 0.3, 0] }}
              className="group bg-zinc-900 rounded-3xl shadow-xl transition duration-500 overflow-hidden relative"
            >

              <div className="overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-8 relative z-10">
                <h3 className="text-2xl font-telegraf mb-6">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-2xl bg-green-400 text-black font-telegraf shadow-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-black font-telegraf hover:shadow-lg hover:shadow-green-500/20 transition"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-green-500/40 transition font-telegraf"
                  >
                    <Github size={18} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}