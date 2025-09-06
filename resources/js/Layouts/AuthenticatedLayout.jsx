import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Home,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User, // tetap dipakai buat About
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
            {/* Custom SVG Profile Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-emerald-400"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 
              22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 
              0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 
              0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 
              40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 
              31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 
              31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 
              156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 
              100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 
              15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 
              43-17t17-43q0-26-17-43t-43-17q-26 
              0-43 17t-17 43q0 26 17 43t43 17Z"/>
            </svg>
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
            href={route('admin.member.index')}
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
