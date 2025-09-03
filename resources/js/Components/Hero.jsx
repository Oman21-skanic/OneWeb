import { motion } from "framer-motion";

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
    id ="home" 
    className="relative min-h-screen bg-gradient-to-b from-emerald-950/80 via-emerald-950/50 to-black flex flex-col items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="w-[1000px] h-[1000px] rounded-full bg-emerald-300/10 blur-3xl"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300/40 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, -50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl px-6 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <span className="px-4 py-1 rounded-full text-sm font-comfortaa bg-emerald-500/10 text-emerald-300 border border-emerald-300/20">
            OneWeb Team
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-Neue-Montreal font-bold leading-tight mb-6">
          Menciptakan Proyek Digital Secara{" "}
          <span className="text-emerald-300">Kolaboratif</span>
        </h1>

        <p className="text-gray-400 mb-8 font-comfortaa">
          OneWeb adalah kelompok kreatif yang menyatukan ide dan 
          kolaborasi untuk menciptakan proyek digital inovatif.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo("projects")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-400/10 border border-emerald-300/30 text-emerald-200 hover:bg-emerald-400/20 transition-all font-comfortaa"
          >
            <i className="fa-solid fa-folder-open"></i> Lihat Project
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo("contact")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-400/10 border border-emerald-300/30 text-emerald-200 hover:bg-emerald-400/20 transition-all font-comfortaa"
          >
            <i className="fa-solid fa-envelope"></i> Contact
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
