import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import useSectionObserver from "../hooks/useSectionObserver";

const nav = [ { id: "home", label: "Home" }, { id: "about", label: "About" }, { id: "projects", label: "Projects" }, { id: "contact", label: "Contact" } ];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const active = useSectionObserver(nav.map((n) => n.id));

    return (
        <div className="fixed top-0 inset-x-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-4 rounded-2xl border border-green-500/20 bg-black/50 backdrop-blur shadow-lg">
                    <div className="flex items-center justify-between px-4 py-3">
                        <a href="#home" className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_15px_4px_rgba(34,197,94,0.6)]" />
                            <span className="font-semibold tracking-wide text-green-400">KelompokKita</span>
                        </a>
                        <div className="hidden md:flex items-center gap-1">
                            {nav.map((n) => (
                                <a key={n.id} href={`#${n.id}`}
                                   className={`px-3 py-2 rounded-xl text-sm transition ${active===n.id?"text-green-400 bg-green-500/10":"text-gray-300 hover:text-white hover:bg-white/5"}`}>
                                    {n.label}
                                </a>
                            ))}
                        </div>
                        <div className="md:hidden">
                            <button onClick={() => setOpen((o)=>!o)} className="p-2 rounded-xl border border-white/10 hover:bg-white/5">
                                {open ? <X size={20}/> : <Menu size={20}/>}
                            </button>
                        </div>
                    </div>
                    <AnimatePresence>
                        {open && (
                            <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="md:hidden px-4 pb-4">
                                <div className="grid gap-2">
                                    {nav.map((n)=>(
                                        <a key={n.id} href={`#${n.id}`} onClick={()=>setOpen(false)}
                                           className={`px-3 py-2 rounded-xl text-sm transition ${active===n.id?"text-green-400 bg-green-500/10":"text-gray-300 hover:text-white hover:bg-white/5"}`}>
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
