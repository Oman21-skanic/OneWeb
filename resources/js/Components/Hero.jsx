    import { motion } from "framer-motion";
    import { FolderGit2, Mail } from "lucide-react";

    const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.4, delay, ease: "easeOut" },
    },
    });

    export default function Hero() {
    // fungsi untuk smooth scroll
    const handleScroll = (id) => {
        const el = document.getElementById(id);
        if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="home" className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center px-6">
        {/* Background gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/20 to-black pointer-events-none" />

        {/* Floating orb effect */}
        <motion.div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-green-500/30 blur-3xl pointer-events-none"
            animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 30, -30, 0],
            y: [0, 20, -20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center">
            {/* Header badge */}
            <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate="show"
            className="mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm flex items-center gap-2"
            >
            <span>One team. Many ideas</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
            variants={fadeUp(0.4)}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-6xl font-bold text-center max-w-3xl leading-tight"
            >
            Welcome to{" "}
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                OneWeb
            </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
            variants={fadeUp(0.6)}
            initial="hidden"
            animate="show"
            className="mt-4 text-lg text-gray-400 max-w-2x1 text-center"
            >Kami adalah tim beranggotakan 6 orang yang menggabungkan desain, teknologi, dan ide-ide segar untuk menghadirkan proyek yang bermakna.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
            variants={fadeUp(0.8)}
            initial="hidden"
            animate="show"
            className="mt-8 flex gap-4 flex-wrap justify-center"
            >
            {/* View Projects button */}
            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleScroll("projects")}
                className="flex items-center px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
            >
                <FolderGit2 className="w-4 h-4 mr-2" /> View our projects
            </motion.button>

            {/* Contact Us button */}
            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleScroll("contact")}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-white font-medium hover:opacity-90 transition flex items-center gap-2"
            >
                <Mail className="w-4 h-4" /> Contact us
            </motion.button>
            </motion.div>

                                    {/* <motion.div
            variants={fadeUp(1)}
            initial="hidden"
            animate="show"
            className="mt-12 text-center text-gray-400"
            >
            <p className="text-lg font-medium">Trusted by our partners & projects</p>
            <div className="flex flex-wrap gap-6 justify-center mt-4 opacity-80">
                <span className="text-sm">Hackathon 2024</span>
                <span className="text-sm">Open Source</span>
                <span className="text-sm">Startup X</span>
                <span className="text-sm">Community Y</span>
            </div>
            </motion.div> */}


        </div>

        {/* Curve effect */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-green-900/30 to-transparent rounded-t-[50%] pointer-events-none" />
        </section>
    );
    }
