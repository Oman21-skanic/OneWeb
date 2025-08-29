import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const sampleProjects = [
    {
        id: 1,
        title: "Sistem Presensi Sekolah",
        description: "Aplikasi presensi QR untuk siswa & guru, laporan real-time.",
        tech: ["Laravel", "React", "MySQL"],
        link: "#",
        repo: "#",
        img: "https://picsum.photos/400/250?random=1",
    },
    {
        id: 2,
        title: "Marketplace UMKM",
        description: "Platform jual-beli untuk UMKM lokal dengan payment gateway.",
        tech: ["Laravel", "React", "Midtrans"],
        link: "#",
        repo: "#",
        img: "https://picsum.photos/400/250?random=2",
    },
    {
        id: 3,
        title: "Dashboard IoT Kebun",
        description: "Monitoring kelembapan & nutrisi tanaman, notifikasi otomatis.",
        tech: ["NodeMCU", "Laravel", "Chart.js"],
        link: "#",
        repo: "#",
        img: "https://picsum.photos/400/250?random=3",
    },
    {
        id: 4,
        title: "E-Library Kampus",
        description: "Pencarian buku, peminjaman digital, dan rekomendasi bacaan.",
        tech: ["Laravel", "React", "ElasticSearch"],
        link: "#",
        repo: "#",
        img: "https://picsum.photos/400/250?random=4",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
};

export default function Projects() {
    return (
        <section id="projects" className="relative py-28 border-t border-white/10 bg-black ">
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-black/40 px-4 py-1 text-sm text-green-300 mb-4 mt-10">
                        Projects
                    </div>
                    <h2 className="text-4xl font-bold text-white">Yang sudah & akan kami bangun</h2>
                    <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
                        Beberapa contoh produk yang kami garap. Data bisa ditarik dari API Laravel atau placeholder.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
                >
                    {sampleProjects.map((p, i) => (
                        <motion.a
                            key={i}
                            variants={item}
                            href={p.link || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative rounded-3xl overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl transition transform hover:-translate-y-1"
                        >
                            {/* Gambar */}
                            <div className="w-full h-52 overflow-hidden rounded-t-2xl">
                                <img
                                    src={p.img}
                                    alt={p.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Konten */}
                            <div className="p-6 bg-black/70">
                                <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                                <p className="mt-2 text-gray-300 text-sm">{p.description}</p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {p.tech.map((t, idx) => (
                                        <span key={idx} className="text-xs text-green-300 border border-green-300 rounded-full px-2 py-1">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-4 flex gap-4 text-sm text-green-300">
                                    {p.link && (
                                        <span className="flex items-center gap-1 hover:underline">
                                            Live <ExternalLink size={16} />
                                        </span>
                                    )}
                                    {p.repo && (
                                        <a href={p.repo} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                                            <Github size={16} /> Repo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
