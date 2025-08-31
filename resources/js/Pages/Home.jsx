import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Mail, Menu, X, Users, Rocket, Hammer, ChevronDown, ExternalLink, CheckCircle2, Linkedin } from "lucide-react";

/**
 * Landing Page Hitam–Ijo (One-Page) – React + Tailwind + Framer Motion
 * — Fitur Utama —
 * 1) Sticky Navbar + Mobile Drawer
 * 2) Smooth scroll antar section
 * 3) Hero dengan parallax dan animasi
 * 4) About (perkenalan kelompok)
 * 5) Projects (grid + animasi, auto-fetch dari Laravel API dengan fallback lokal)
 * 6) Tech/Values strip
 * 7) Contact (form POST ke Laravel API)
 * 8) Footer + Socials
 * 9) Reveal Animation on Scroll
 * 10) Scroll Progress Indicator
 *
 * ⚙️ Integrasi Backend Laravel (opsional, lihat komentar `API_BASE` di bawah)
 */

// 👉 Ganti ini jika API Laravel kamu berbeda (contoh: http://localhost:8000/api)
const API_BASE = "http://localhost:8000/api";

// Fallback data jika fetch ke Laravel gagal
const sampleProjects = [
    {
        id: 1,
        title: "Sistem Presensi Sekolah",
        description: "Aplikasi presensi QR untuk siswa & guru, laporan real-time.",
        tech: ["Laravel", "React", "MySQL"],
        link: "#",
        repo: "#",
    },
    {
        id: 2,
        title: "Marketplace UMKM",
        description: "Platform jual-beli untuk UMKM lokal dengan payment gateway.",
        tech: ["Laravel", "React", "Midtrans"],
        link: "#",
        repo: "#",
    },
    {
        id: 3,
        title: "Dashboard IoT Kebun",
        description: "Monitoring kelembapan & nutrisi tanaman, notifikasi otomatis.",
        tech: ["NodeMCU", "Laravel", "Chart.js"],
        link: "#",
        repo: "#",
    },
    {
        id: 4,
        title: "E-Library Kampus",
        description: "Pencarian buku, peminjaman digital, dan rekomendasi bacaan.",
        tech: ["Laravel", "React", "ElasticSearch"],
        link: "#",
        repo: "#",
    },
];

const nav = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
};
const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function useSectionObserver(ids) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const opts = { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, opts);
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids]);
    return active;
}

function useParallax(ref) {
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
    return { y, opacity };
}

function useScrollProgress() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return { ref, scaleX };
}

function Navbar() {
    const [open, setOpen] = useState(false);
    const active = useSectionObserver(nav.map((n) => n.id));
    const { ref, scaleX } = useScrollProgress();

    return (
        <div ref={ref} className="fixed top-0 inset-x-0 z-50">
            {scaleX && (
                <motion.div
                    className="h-1 bg-gradient-to-r from-green-500/0 via-green-500/80 to-green-500/0"
                    style={{ scaleX: scaleX, transformOrigin: "0%" }}
                />
            )}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-4 rounded-2xl border border-green-500/20 bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/40 shadow-lg">
                    <div className="flex items-center justify-between px-4 py-3">
                        <a href="#home" className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_15px_4px_rgba(34,197,94,0.6)]" />
                            <span className="font-semibold tracking-wide text-green-400">KelompokKita</span>
                        </a>
                        <div className="hidden md:flex items-center gap-1">
                            {nav.map((n) => (
                                <a
                                    key={n.id}
                                    href={`#${n.id}`}
                                    className={`px-3 py-2 rounded-xl text-sm transition ${active === n.id
                                            ? "text-green-400 bg-green-500/10"
                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {n.label}
                                </a>
                            ))}
                        </div>
                        <div className="md:hidden">
                            <button
                                aria-label="Toggle menu"
                                onClick={() => setOpen((o) => !o)}
                                className="p-2 rounded-xl border border-white/10 hover:bg-white/5"
                            >
                                {open ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="md:hidden px-4 pb-4"
                            >
                                <div className="grid gap-2">
                                    {nav.map((n) => (
                                        <a
                                            key={n.id}
                                            href={`#${n.id}`}
                                            onClick={() => setOpen(false)}
                                            className={`px-3 py-2 rounded-xl text-sm transition ${active === n.id
                                                    ? "text-green-400 bg-green-500/10"
                                                    : "text-gray-300 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            {n.label}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function Hero() {
    const ref = useRef(null);
    const { y, opacity } = useParallax(ref);
    return (
        <section id="home" ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#0B8C5C,transparent_40%),radial-gradient(circle_at_80%_20%,#0B8C5C,transparent_40%)]" />
            <motion.div style={{ y, opacity }} className="relative z-10 w-full">
                <div className="mx-auto max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-black/40 px-3 py-1 text-xs text-green-300">
                            <Rocket size={14} />
                            <span>We build useful things</span>
                        </div>
                        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                            Kelompok <span className="text-green-400">Kita</span> —
                            <br className="hidden sm:block" />
                            Kreatif, Cepat, dan Terarah.
                        </h1>
                        <p className="mt-4 text-lg text-gray-300">
                            Kami adalah tim pengembang yang fokus membangun produk digital berdampak.
                            Dari ide hingga rilis, kami kerjakan dengan standar produksi.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 rounded-2xl bg-green-500 px-5 py-3 font-semibold text-black hover:bg-green-400 transition shadow"
                            >
                                Lihat Project <ArrowRight size={18} />
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white hover:bg-white/10 transition"
                            >
                                Kontak Kami <Mail size={18} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
            <div className="absolute inset-x-0 bottom-6 flex justify-center">
                <ChevronDown className="text-green-500 animate-bounce" />
            </div>
        </section>
    );
}

function About() {
    return (
        <section id="about" className="relative py-24 border-t border-white/10">
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(34,197,94,0.08),transparent_60%)]" />
            <div className="relative mx-auto max-w-7xl px-6">
                <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-10 md:grid-cols-2 items-center">
                    <motion.div variants={fadeInUp}>
                        <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-black/40 px-3 py-1 text-xs text-green-300">
                            <Users size={14} />
                            <span>Tentang Kami</span>
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-white">Tim kecil dengan ambisi besar</h2>
                        <p className="mt-3 text-gray-300">
                            Kami terdiri dari developer, designer, dan product thinker. Kami suka
                            membangun software yang menyelesaikan masalah nyata, bukan hanya demo.
                        </p>
                        <ul className="mt-6 space-y-2 text-gray-300">
                            {["Cepat iterasi & ship", "Desain clean dan aksesibel", "Kualitas production", "Dokumentasi rapi"].map((f) => (
                                <li key={f} className="flex items-center gap-3"><CheckCircle2 className="text-green-400" size={18} />{f}</li>
                            ))}
                        </ul>
                        <div className="mt-6 flex gap-3">
                            <a href="#contact" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10">Kolaborasi</a>
                            <a href="#projects" className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2 text-green-300 hover:bg-green-500/20">Portfolio</a>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp}>
                        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/10 to-transparent p-6 shadow-2xl">
                            <div className="grid grid-cols-2 gap-4">
                                {["React", "Laravel", "Tailwind", "MySQL", "Docker", "Framer Motion"].map((t) => (
                                    <div key={t} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-gray-200">
                                        {t}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 rounded-2xl bg-black/50 p-4 text-sm text-gray-300">
                                <div className="flex items-center gap-2 text-green-300"><Hammer size={16} />Cara kerja kami</div>
                                <ol className="mt-2 list-decimal space-y-1 pl-6">
                                    <li>Brief & scope singkat</li>
                                    <li>Wireframe & arsitektur ringan</li>
                                    <li>Build iteratif (CI/CD)</li>
                                    <li>Uji, rilis, dokumentasi</li>
                                </ol>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;
        async function load() {
            try {
                setLoading(true);
                const res = await fetch(`${API_BASE}/projects`);
                if (!res.ok) throw new Error("Gagal memuat data proyek");
                const data = await res.json();
                if (!ignore && Array.isArray(data)) {
                    setProjects(data.length ? data : sampleProjects);
                } else {
                    setProjects(sampleProjects);
                }
            } catch (e) {
                console.error("Fetch error:", e);
                setProjects(sampleProjects);
                setError("Menampilkan data contoh (API tidak terhubung)");
            } finally {
                setLoading(false);
            }
        }
        load();
        return () => { ignore = true; };
    }, []);

    if (loading) return <div className="text-center py-24 text-gray-400">Memuat proyek...</div>;
    if (!projects.length) return <div className="text-center py-24 text-red-400">Tidak ada proyek yang tersedia.</div>;

    return (
        <section id="projects" className="relative py-24 border-t border-white/10">
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.08),transparent_60%)]" />
            <div className="relative mx-auto max-w-7xl px-6">
                <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}>
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-black/40 px-3 py-1 text-xs text-green-300">
                                <Rocket size={14} />
                                <span>Projects</span>
                            </div>
                            <h2 className="mt-4 text-3xl font-bold text-white">Yang sudah & akan kami bangun</h2>
                            <p className="mt-2 text-gray-300">Beberapa contoh produk yang kami garap. Data bisa ditarik dari API Laravel.</p>
                        </div>
                        <div className="text-sm text-gray-400">{error || "Terhubung"}</div>
                    </div>
                    <motion.div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((p, i) => (
                            <motion.div variants={fadeInUp} key={p.id || `project-${i}`} initial="hidden" whileInView="show" viewport={{ once: true }}>
                                <a
                                    href={p.link || "#"}
                                    target={p.link ? "_blank" : undefined}
                                    rel={p.link ? "noreferrer" : undefined}
                                    className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 hover:border-green-500/30 hover:from-green-500/10 transition overflow-hidden"
                                >
                                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition" />
                                    <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                                    <p className="mt-2 text-sm text-gray-300">{p.description}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {(p.tech || []).map((t) => (
                                            <span key={t} className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-gray-300">{t}</span>
                                        ))}
                                    </div>
                                    <div className="mt-5 flex items-center gap-4 text-sm text-green-300">
                                        {p.link && <span className="inline-flex items-center gap-1">Live <ExternalLink size={16} /></span>}
                                        {p.repo && (
                                            <a href={p.repo} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                                                <Github size={16} /> Repo
                                            </a>
                                        )}
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");
    const [sending, setSending] = useState(false);

    const canSubmit = useMemo(() => form.name && form.email.includes("@") && form.message.length >= 10, [form]);

    async function onSubmit(e) {
        e.preventDefault();
        if (!canSubmit) return;
        try {
            setSending(true);
            setStatus("");
            const res = await fetch(`${API_BASE}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Gagal mengirim pesan");
            setForm({ name: "", email: "", message: "" });
            setStatus("Terkirim! Kami akan balas secepatnya.");
        } catch (err) {
            console.error("Contact error:", err);
            setStatus("Gagal mengirim. Pastikan API Laravel /api/contact aktif.");
        } finally {
            setSending(false);
        }
    }

    return (
        <section id="contact" className="relative py-24 border-t border-white/10">
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_60%)]" />
            <div className="relative mx-auto max-w-7xl px-6">
                <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-black/40 px-3 py-1 text-xs text-green-300">
                        <Mail size={14} />
                        <span>Kontak</span>
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-white">Ayo ngobrol tentang ide kamu</h2>
                    <p className="mt-2 text-gray-300 max-w-2xl">Kirim pesan singkat mengenai kebutuhanmu. Kami akan menanggapi secepatnya.</p>
                    <form onSubmit={onSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                        <motion.div variants={fadeInUp}>
                            <label className="text-sm text-gray-300">Nama</label>
                            <input
                                required
                                value={form.name}
                                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                                className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Nama kamu"
                            />
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <label className="text-sm text-gray-300">Email</label>
                            <input
                                required
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                                className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="email@domain.com"
                            />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="sm:col-span-2">
                            <label className="text-sm text-gray-300">Pesan</label>
                            <textarea
                                required
                                minLength={10}
                                value={form.message}
                                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                                rows={5}
                                className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Ceritakan kebutuhan atau ide projectmu"
                            />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="sm:col-span-2 flex items-center gap-3">
                            <button
                                disabled={!canSubmit || sending}
                                className="inline-flex items-center gap-2 rounded-2xl bg-green-500 px-6 py-3 font-semibold text-black hover:bg-green-400 transition disabled:opacity-50"
                            >
                                {sending ? "Mengirim…" : "Kirim Pesan"}
                                <ArrowRight size={18} />
                            </button>
                            <span className="text-sm text-gray-400">{status}</span>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="border-t border-white/10 py-10">
            <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>KelompokKita © {new Date().getFullYear()}</span>
                </div>
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-green-400 inline-flex items-center gap-1"><Github size={16} /> GitHub</a>
                    <a href="#" className="hover:text-green-400 inline-flex items-center gap-1"><Linkedin size={16} /> LinkedIn</a>
                    <a href="mailto:hello@kelompokkita.dev" className="hover:text-green-400 inline-flex items-center gap-1"><Mail size={16} /> Email</a>
                </div>
            </div>
        </footer>
    );
}

export default function LandingPage() {
    const scrollRef = useRef(null);

    return (
        <div ref={scrollRef} className="bg-black text-white selection:bg-green-500/40">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Contact />
            <Footer />
            {/* Back to top */}
            <a
                href="#home"
                className="fixed bottom-6 right-6 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-white hover:bg-white/10"
                aria-label="Back to top"
            >
                ↑
            </a>
        </div>
    );
}