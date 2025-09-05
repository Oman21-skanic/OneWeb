import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  User,
  Home,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import About from '@/Components/About';

export default function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;
  const [collapsed, setCollapsed] = useState(false);

  // Deteksi layar kecil → otomatis collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true); // collapse kalau layar kecil (< md)
      } else {
        setCollapsed(false); // expand kalau layar gede
      }
    };

    handleResize(); // cek awal
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-emerald-300 font-comfortaa">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? "4rem" : "16rem" }}
        transition={{ duration: 0.3 }}
        className="bg-emerald-950/90 border-r border-emerald-800 flex flex-col"
      >
        {/* Logo + Collapse Button */}
        <div className="flex items-center justify-between p-4">
          <ApplicationLogo className="h-8 w-auto text-emerald-400" />
          {/* Tombol collapse cuma muncul di layar gede */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block p-1 rounded-md hover:bg-emerald-900/80 transition"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-2">
          <Link
            href={route('dashboard')}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-emerald-400 hover:bg-emerald-900/80 hover:text-white transition"
          >
            <LayoutDashboard className="h-5 w-5 text-emerald-400" />
            {!collapsed && <span>Dashboard</span>}
          </Link>
          <Link
            href={route('profile.edit')}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-emerald-400 hover:bg-emerald-900/80 hover:text-white transition"
          >
            <User className="h-5 w-5 text-emerald-400" />
            {!collapsed && <span>Profile</span>}
          </Link>
          <Link
            href={route('admin.hero.index')}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-emerald-400 hover:bg-emerald-900/80 hover:text-white transition"
          >
            <Home className="h-5 w-5 text-emerald-400" />
            {!collapsed && <span>Hero</span>}
          </Link>
          <Link
            href={route('admin.about.index')}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-emerald-400 hover:bg-emerald-900/80 hover:text-white transition"
          >
            <User className="h-5 w-5 text-emerald-400" />
            {!collapsed && <span>About</span>}
          </Link>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {header && (
          <header className="flex items-center justify-between bg-emerald-950/90 px-4 sm:px-6 py-3 sm:py-4">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold">{header}</h1>

            {/* Logout di pojok kanan */}
            <Link
              href={route('logout')}
              method="post"
              as="button"
              className="flex items-center gap-2 rounded-md px-3 sm:px-4 py-2 border border-red-500 text-red-500 font-semibold hover:border-red-400 hover:text-red-400 transition"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </Link>
          </header>
        )}

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 p-4 sm:p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
