import { motion } from "framer-motion";

// Data anggota tim
const team = [
    {
        name: "Putri Salsabila",
        role: "Front-end Developer",
        description: "Spesialis React & Tailwind, suka membuat UI yang clean dan responsif.",
        skills: ["React", "Tailwind", "Framer Motion", "JavaScript"],
        img: "/images/kinan.jpg",
    },
    {
        name: "Nabila Indriyanti",
        role: "Back-end Developer",
        description: "Ahli Laravel & API, fokus pada performance dan keamanan sistem.",
        skills: ["Laravel", "MySQL", "PHP", "REST API"],
        img: "/images/nabila.jpg",
    },
    {
        name: "Melani Putri",
        role: "UI/UX Designer",
        description: "Mendesain interface yang intuitif dan menyenangkan untuk digunakan.",
        skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
        img: "/images/melani.jpg",
    },
    {
        name: "Ahmad Rizky",
        role: "DevOps Engineer",
        description: "Mengatur deployment & CI/CD, menjaga sistem tetap scalable dan stabil.",
        skills: ["Docker", "AWS", "CI/CD", "Linux"],
        img: "/images/rizky.jpg",
    },
    {
        name: "Fajar Pratama",
        role: "QA / Tester",
        description: "Memastikan kualitas produk melalui testing otomatis & manual.",
        skills: ["Testing", "Selenium", "Jest", "Postman"],
        img: "/images/fajar.jpg",
    },
    {
        name: "Dewi Anggraeni",
        role: "Product Manager",
        description: "Memimpin roadmap dan memastikan project sesuai kebutuhan pengguna.",
        skills: ["Agile", "Scrum", "Wireframing", "Project Management"],
        img: "/images/dewi.jpg",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
};

export default function About() {
    return (
        <section id="about" className="relative py-28 border-t border-white/10 bg-black">
            {/* subtle background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.06),transparent_60%)] " />

            <div className="relative mx-auto max-w-6xl px-6 text-center mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-black/40 px-4 py-1 text-sm text-green-300 mb-4">
                        Tim Kami
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-3">Bertemu dengan kreator kami</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Kami adalah tim berbakat yang menggabungkan teknologi, desain, dan strategi untuk
                        menghasilkan produk digital berkualitas tinggi.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid gap-12 sm:grid-cols-1 md:grid-cols-2"
                >
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            className="bg-black/60 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform"
                        >
                            {/* Foto */}
                            <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-green-500 mb-4">
                                <img
                                    src="https://i.pinimg.com/1200x/2c/be/51/2cbe51c91da3736934397d7f053b3d2d.jpg"
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Nama & role */}
                            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                            <p className="text-green-300 text-sm mt-1 mb-2">{member.role}</p>
                            {/* Deskripsi */}
                            <p className="text-gray-300 text-sm mb-3">{member.description}</p>
                            {/* Skills */}
                            <div className="flex flex-wrap justify-center gap-2 mt-2">
                                {member.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full border border-green-500"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
