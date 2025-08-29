import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="relative border-t border-white/10 bg-black/50 py-8 text-gray-400">
            <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p>© {year} Kelompok Kita. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <a href="#" target="_blank" rel="noreferrer" className="hover:text-white"><Github size={20}/></a>
                    <a href="#" target="_blank" rel="noreferrer" className="hover:text-white"><Linkedin size={20}/></a>
                    <a href="#" target="_blank" rel="noreferrer" className="hover:text-white"><Instagram size={20}/></a>
                </div>
            </div>
        </footer>
    );
}
