    import { motion } from "framer-motion";
    import { useEffect, useState, useCallback } from "react";
    import Particles, { initParticlesEngine } from "@tsparticles/react";
    import { loadSlim } from "@tsparticles/slim";
    import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

    const team = [
    {
        name: "M. Abdul Rohman",
        role: "Project Manager",
        img: "https://i.pinimg.com/736x/2f/ed/c1/2fedc10cbc4d636644205fc98daa3cd9.jpg",
        socials: { ig: "#", linkedin: "#", github: "#" },
    },
    {
        name: "Putri Salsabila",
        role: "Front-End Developer",
        img: "https://i.pinimg.com/736x/2f/ed/c1/2fedc10cbc4d636644205fc98daa3cd9.jpg",
        socials: { ig: "#", linkedin: "#", github: "#" },
    },
    {
        name: "Divinka Azani Rachdian",
        role: "Front-End Developer",
        img: "https://i.pinimg.com/736x/2f/ed/c1/2fedc10cbc4d636644205fc98daa3cd9.jpg",
        socials: { ig: "#", linkedin: "#", github: "#" },
    },
    {
        name: "Vio Adytia Syahputra",
        role: "Data Analyst",
        img: "https://i.pinimg.com/736x/2f/ed/c1/2fedc10cbc4d636644205fc98daa3cd9.jpg",
        socials: { ig: "#", linkedin: "#", github: "#" },
    },
    {
        name: "M. Fauzi Ibnu Kosim",
        role: "UX/UI Designer",
        img: "https://i.pinimg.com/736x/2f/ed/c1/2fedc10cbc4d636644205fc98daa3cd9.jpg",
        socials: { ig: "#", linkedin: "#", github: "#" },
    },
    {
        name: "Rakha Pradipta",
        role: "Digital Business",
        img: "https://i.pinimg.com/736x/2f/ed/c1/2fedc10cbc4d636644205fc98daa3cd9.jpg",
        socials: { ig: "#", linkedin: "#", github: "#" },
    },
    ];

    const cardContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } },
    };

    const cardItem = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    };

    function TeamCard({ member }) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 1500);
    };

    return (
        <motion.div
        variants={cardItem}
        whileHover={{ 
            y: -5, 
            boxShadow: "0 0 100px 20px rgba(65, 255, 163, 0.2)", // Blur hijau dengan spread besar dan opacity tipis
            transition: { duration: 0.3 }
        }}
        onClick={handleClick}
        animate={clicked ? { boxShadow: "0 0 25px #88ff00ff", transition: { duration: 0.3 } } : { boxShadow: "0 0 0 transparent" }}
        className="relative w-[240px] md:w-[260px] bg-black border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer shadow-md"
        >
        <div className="relative w-full h-[220px]">
            <img
            src={member.img}
            alt={`Foto ${member.name}`}
            className="w-full h-full object-cover rounded-t-2xl"
            />
            <div className="absolute top-3 right-3 flex flex-col gap-2">
            <a href={member.socials.ig} className="bg-gray-900 p-2 rounded-full text-white hover:bg-gray-700 transition">
                <FaInstagram size={18} />
            </a>
            <a href={member.socials.linkedin} className="bg-gray-900 p-2 rounded-full text-white hover:bg-gray-700 transition">
                <FaLinkedin size={18} />
            </a>
            <a href={member.socials.github} className="bg-gray-900 p-2 rounded-full text-white hover:bg-gray-700 transition">
                <FaGithub size={18} />
            </a>
            </div>
        </div>

        <div className="p-4 text-center">
            <h3 className="text-lg font-comfortaa font-bold text-white">{member.name}</h3>
            <p className="text-sm font-comfortaa text-gray-300">{member.role}</p>
        </div>
        </motion.div>
    );
    }

    export default function About() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => await loadSlim(engine)).then(() => setInit(true));
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log("Particles loaded:", container);
    }, []);

    return (
        <section id="about" className="relative py-32 bg-black overflow-hidden">
        {init && (
            <Particles
            id="tsparticles"
            loaded={particlesLoaded}
            options={{
                fullScreen: { enable: false },
                background: { color: { value: "transparent" } },
                fpsLimit: 60,
                particles: {
                number: { value: 25, density: { enable: true, area: 900 } },
                color: { value: "#00ff2f" },
                shape: { type: "circle" },
                opacity: { value: { min: 0.3, max: 0.6 }, random: true },
                size: { value: { min: 2, max: 4 }, random: true },
                move: { enable: true, speed: { min: 0.5, max: 1.2 }, outModes: "out" },
                links: {
                    enable: true,
                    distance: 120,
                    color: "#00ff2f",
                    opacity: 0.2,
                    width: 1,
                },
                },
                interactivity: {
                events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" } },
                modes: { grab: { distance: 180, links: { opacity: 0.25 } }, push: { quantity: 2 } },
                },
                detectRetina: true,
            }}
            className="absolute inset-0 z-0"
            />
        )}

        <div className="relative mx-auto max-w-7xl px-6 text-center z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-20">
            <div className="text-3xl font-Neue-Montreal-Light text-green-500 font-black mb-2">
                Meet our team!
            </div>
            <h2 className="text-5xl font-telegraf text-white mb-4 tracking-tight">
                <span className="font-bold">Teamwork</span> makes the dream <span className="font-bold">work.</span>
            </h2>
            </motion.div>

            <motion.div
            variants={cardContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-y-10 gap-x-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto justify-items-center"
            >
            {team.map((member, i) => (
                <TeamCard key={i} member={member} />
            ))}
            </motion.div>
        </div>
        </section>
    );
    }