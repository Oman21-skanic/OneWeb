import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "EcoTrack – Smart Farming Dashboard",
    image:
      "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNtYXJ0JTIwZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D",
    tech: ["Next.js", "Tailwind", "RESTful API"],
    live: "#",
    github: "#",
  },
  {
    id: 2,
    title: "CaffeineHub – Coffee Shop Ordering App",
    image:
      "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tech: ["React", "Firebase", "Stripe"],
    live: "#",
    github: "#",
  },
  {
    id: 3,
    title: "StreamVerse – Music & Podcast Platform",
    image:
      "https://plus.unsplash.com/premium_photo-1721128468152-af901dd8f9b8?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tech: ["Next.js", "Node.js", "MongoDB"],
    live: "#",
    github: "#",
  },
  {
    id: 4,
    title: "FoodSnap – AI Recipe Generator",
    image:
      "https://images.unsplash.com/photo-1634043319926-c2565ac15c63?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tech: ["React", "OpenAI API", "Tailwind"],
    live: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Wanderlust – Travel Blog CMS",
    image:
      "https://plus.unsplash.com/premium_photo-1684407617181-3408b55fef8e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tech: ["Laravel", "MySQL", "Bootstrap"],
    live: "#",
    github: "#",
  },
  {
    id: 6,
    title: "FitLife – Fitness Tracking App",
    image:
      "https://plus.unsplash.com/premium_photo-1712761999986-0686ec32ad91?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tech: ["React Native", "Redux", "Supabase"],
    live: "#",
    github: "#",
  },
];


export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-black relative text-white py-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-3xl font-Neue-Montreal-Light text-green-500 font-black mb-2">
            Things We’ve Built
          </div>
          <h2 className="text-4xl font-extrabold font-telegraf text-white mb-4 tracking-tight">
            Crafting digital experiences with{" "}
            <span className=" ">
              passion
            </span>{" "}
            and <span className="">precision.</span>
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                  <h3 className="text-2xl font-comfortaa mb-6">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-2xl bg-green-400 text-black font-comfortaa shadow-md"
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-black font-comfortaa hover:shadow-lg hover:shadow-green-500/20 transition"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-green-500/40 transition font-comfortaa"
                    >
                      <Github size={18} /> GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
