    import { motion } from "framer-motion";
    import { useCallback, useEffect, useState } from "react";
    import Particles, { initParticlesEngine } from "@tsparticles/react";
    import { loadSlim } from "@tsparticles/slim";

    // Data anggota tim
    const team = [
    {
        name: "Putri Salsabila",
        role: "Front-end Developer",
        description: "Spesialis React & Tailwind, suka membuat UI yang clean dan responsif.",
        skills: ["React", "Tailwind", "Framer Motion", "JavaScript"],
        img: "/assets/images/testimg.jpg",
    },
    {
        name: "Divinka Azani Rachdian",
        role: "Front-end Developer",
        description: "Ahli Laravel & API, fokus pada performance dan keamanan sistem.",
        skills: ["Laravel", "MySQL", "PHP", "REST API"],
        img: "/assets/images/testimg.jpg",
    },
    {
        name: "Melani Putri",
        role: "UI/UX Designer",
        description: "Mendesain interface yang intuitif dan menyenangkan untuk digunakan.",
        skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
        img: "/assets/images/testimg.jpg",
    },
    {
        name: "Ahmad Rizky",
        role: "DevOps Engineer",
        description: "Mengatur deployment & CI/CD, menjaga sistem tetap scalable dan stabil.",
        skills: ["Docker", "AWS", "CI/CD", "Linux"],
        img: "/assets/images/testimg.jpg",
    },
    {
        name: "Fajar Pratama",
        role: "QA / Tester",
        description: "Memastikan kualitas produk melalui testing otomatis & manual.",
        skills: ["Testing", "Selenium", "Jest", "Postman"],
        img: "/assets/images/testimg.jpg",
    },
    {
        name: "Dewi Anggraeni",
        role: "Product Manager",
        description: "Memimpin roadmap dan memastikan project sesuai kebutuhan pengguna.",
        skills: ["Agile", "Scrum", "Wireframing", "Project Management"],
        img: "/assets/images/testimg.jpg",
    },
    ];

    // Animasi container dan kartu
    const cardContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2, when: "beforeChildren" },
    },
    };
    const cardItem = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    };

    function TeamCard({ member }) {
    return (
        <motion.div
        variants={cardItem}
        whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-[266px] h-[350px] bg-black/50 backdrop-blur-2x1 border border-white/10 rounded-2xl p-0 flex flex-col items-center text-center shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20"
        aria-label={`Profil ${member.name}, ${member.role}`}
        >
        {/* Foto dengan Efek Blend */}
        <div className="relative w-[266px] h-[230px] overflow-hidden border-1 border-green-500/30 mb-4 group">
            <motion.img
            src={member.img}
            alt={`Foto ${member.name}`}
            loading="lazy"
            onError={(e) => {
                console.error(`Failed to load image: ${member.img} for ${member.name}`);
                e.target.src = "/assets/images/fallback.jpg";
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent opacity-100 transition-opacity duration-300" />
        </div>
        {/* Nama & Role */}
        <h3 className="text-xl font-bold text-white tracking-wide transition-colors duration-300 hover:text-green-300">
            {member.name}
        </h3>
        <p className="text-green-400 text-xs font-medium mt-1 mb-2 transition-colors duration-300 hover:text-green-300">
            {member.role}
        </p>
        </motion.div>
    );
    }

    export default function About() {
    const [init, setInit] = useState(false);

    // Inisialisasi tsParticles
    useEffect(() => {
        initParticlesEngine(async (engine) => {
        await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log("Particles loaded:", container);
    }, []);

    return (
        <section id="about" className="relative py-32 bg-black overflow-hidden">
        {/* Efek Partikel */}
        {init && (
            <Particles
            id="tsparticles"
            loaded={particlesLoaded}
            options={{
                fullScreen: { enable: false },
                background: { color: { value: "transparent" } },
                fpsLimit: 60,
                particles: {
                number: { value: 30, density: { enable: true, area: 1000 } },
                color: { value: "#00ff2fff" },
                shape: { type: "circle" },
                opacity: { value: { min: 0.3, max: 0.7 }, random: true },
                size: { value: { min: 2, max: 5 }, random: true },
                move: {
                    enable: true,
                    speed: { min: 0.5, max: 1.5 },
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: "out",
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#00ff2fff",
                    opacity: 0.3,
                    width: 1,
                },
                },
                interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                    onClick: { enable: true, mode: "push" },
                    resize: true,
                },
                modes: {
                    grab: { distance: 200, links: { opacity: 0.3 } },
                    push: { quantity: 3 },
                },
                },
                detectRetina: true,
            }}
            className="absolute inset-0 z-0"
            style={{
                filter: "blur(100px)",
                boxShadow: "0 0 10px rgba(0, 255, 47, 0.5), 0 0 20px rgba(0, 255, 47, 0.3)",
            }}
            />
        )}

        <div className="relative mx-auto max-w-7xl px-6 text-center">
            {/* Header Section */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-20"
            >
            <div className="inline-flex items-center gap-3 rounded-full border border-green-500/20 bg-black/50 px-5 py-2 text-sm font-medium text-green-300 shadow-inner mb-6">
                Meet our team
            </div>
            <h2
                className="text-5xl font-extrabold text-white mb-4 tracking-wide font-raligo"
                style={{
                fontFamily: "'Raligo', sans-serif",
                }}
            >
                UNVEILING OUR TEAM
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                We are a forward-thinking collective, blending cutting-edge innovation, technology, and
                strategy to craft exceptional digital experiences.
            </p>
            </motion.div>

            {/* Grid Kartu Anggota */}
            <motion.div
            variants={cardContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative"
            style={{
                position: "relative",
                overflow: "hidden",
            }}
            >
            {/* Elemen Dekoratif Gradient Abstrak */}
            <div
                className="absolute w-16 h-16 bg-gradient-to-br from-[#22C55E]/50 to-transparent opacity-50 blur-xl"
                style={{
                top: "10%",
                left: "10%",
                transform: "rotate(-15deg)",
                zIndex: 0,
                }}
            />
            <div
                className="absolute w-12 h-12 bg-gradient-to-tr from-[#22C55E]/40 to-transparent opacity-40 blur-lg"
                style={{
                top: "25%",
                right: "15%",
                transform: "rotate(30deg)",
                zIndex: 0,
                }}
            />
            <div
                className="absolute w-20 h-20 bg-gradient-to-tl from-[#22C55E]/60 to-transparent opacity-60 blur-2xl"
                style={{
                bottom: "20%",
                left: "20%",
                transform: "rotate(-45deg)",
                zIndex: 0,
                }}
            />
            {team.map((member, i) => (
                <TeamCard key={i} member={member} />
            ))}
            </motion.div>
        </div>
        </section>
    );
    }