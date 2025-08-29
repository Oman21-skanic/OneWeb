import { useRef } from "react";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Mail, ChevronDown } from "lucide-react";
import useParallax from "../hooks/useParallax";

export default function Hero() {
    const ref = useRef(null);
    const { y, opacity } = useParallax(ref);

    return (
        <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Gradient + Animasi */}
            <div className="absolute inset-0 animate-background-gradient" 
                 style={{ background: "radial-gradient(circle at 20% 30%, rgba(34,197,94,0.15), transparent 40%), radial-gradient(circle at 80% 20%, rgba(34,197,94,0.15), transparent 40%)"}} />

            {/* Konten Hero */}
            <motion.div style={{ y, opacity }} className="relative z-10 w-full">
                <div className="mx-auto max-w-7xl px-6 text-center sm:text-left">
                    {/* Badge */}
                    <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.8 }} className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-black/40 px-3 py-1 text-xs text-green-300 shadow-md">
                        <Rocket size={14} /> We build useful things
                    </motion.div>

                    {/* Judul */}
                    <motion.h1 
                        initial={{ x:-50, opacity:0 }} 
                        animate={{ x:0, opacity:1 }} 
                        transition={{ delay:0.4, type:"spring", stiffness:120 }}
                        className="mt-5 text-4xl sm:text-6xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-200">
                        Kelompok <span className="text-green-300">Kita</span> — Kreatif, Cepat, Terarah
                    </motion.h1>

                    {/* Deskripsi */}
                    <motion.p 
                        initial={{ x:50, opacity:0 }} 
                        animate={{ x:0, opacity:1 }} 
                        transition={{ delay:0.6, duration:1 }}
                        className="mt-4 text-lg text-gray-300 max-w-xl mx-auto sm:mx-0">
                        Kami membangun produk digital dengan standar tinggi. Dari ide hingga rilis, kami hadir untuk membuat dampak nyata.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div 
                        initial={{ opacity:0, y:20 }} 
                        animate={{ opacity:1, y:0 }} 
                        transition={{ delay:0.8, duration:1 }} 
                        className="mt-8 flex flex-wrap items-center justify-center justify-start  gap-4 ">
                        <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl bg-green-500 px-6 py-3 ml-8 font-semibold text-black hover:bg-green-400 transition-transform transform hover:scale-105 shadow-lg">
                            Lihat Project <ArrowRight size={18} />
                        </a>
                        <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-medium text-white hover:bg-white/20 transition hover:scale-105">
                            Kontak Kami <Mail size={18} />
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <div className="absolute inset-x-0 bottom-6 flex justify-center">
                <motion.div
                    animate={{ y: [0,10,0] }}
                    transition={{ duration:1.5, repeat:Infinity, ease:"easeInOut" }}
                    className="text-green-400"
                >
                    <ChevronDown size={28} />
                </motion.div>
            </div>
        </section>
    );
}
