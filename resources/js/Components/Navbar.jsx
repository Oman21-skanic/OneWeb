import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import useSectionObserver from "../hooks/useSectionObserver";
import { Link } from '@inertiajs/react';


const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useSectionObserver(nav.map((n) => n.id));

  // Fungsi untuk gulir halus
  const handleScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false); // otomatis nutup kalau di mobile
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl border border-green-400/20 bg-black/50 backdrop-blur shadow-lg">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleScroll(e, "home")}
              className="flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 120"
                width="40"
                height="40"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#animatedGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="314"
                  strokeDashoffset="0"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="628"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <path
                  d="M35 65 L50 85 L70 35 L90 85"
                  stroke="url(#animatedGradient)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="200"
                    dur="6s"
                    repeatCount="indefinite"
                  />
                </path>

                <defs>
                  <linearGradient
                    id="animatedGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22c55e">
                      <animate
                        attributeName="stop-color"
                        values="#22c55e;#16a34a;#22c55e"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#16a34a">
                      <animate
                        attributeName="stop-color"
                        values="#16a34a;#22c55e;#16a34a"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                </defs>
              </svg>

              <span className="font-comfortaa font-semibold tracking-wide text-lg bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                OneWeb
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-2">
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={(e) => handleScroll(e, n.id)}
                  className={`px-3 py-2 rounded-xl text-sm transition-all duration-300 font-comfortaa ${active === n.id
                    ? "text-green-500 bg-green-500/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {n.label}
                </a>
              ))}
            </div>
            <div>
              <Link href={route('login')} className=" p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-200 hover:underline ">Login</Link>
              {/* <Link href={route('register')} className=" p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-200 hover:underline">Register</Link> */}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen((o) => !o)}
                className="p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-200"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
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
                      onClick={(e) => handleScroll(e, n.id)}
                      className={`px-3 py-2 rounded-xl text-sm transition-all duration-300 font-comfortaa ${active === n.id
                        ? "text-green-500 bg-green-500/10"
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
