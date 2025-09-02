import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import '@fortawesome/fontawesome-free/css/all.min.css';

const API_BASE = "http://localhost:8000/api";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", message: "", rating: 0 });
  const [sending, setSending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.message || form.rating === 0) return;

    try {
      setSending(true);
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Gagal mengirim pesan");

      // langsung reload halaman
      window.location.reload();

    } catch (err) {
      console.error(err);
      window.alert("Gagal mengirim. Pastikan API aktif.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="relative min-h-screen bg-black text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 mt-28">
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.button
            className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm font-comfortaa hover:bg-white/10 transition-colors duration-200"
            variants={fadeInUp}
            custom={0}
          >
            Contact
          </motion.button>

          <motion.h2 className="text-4xl font-comfortaa" variants={fadeInUp} custom={1}>
            Hubungi Kami
          </motion.h2>

          <motion.p className="text-gray-400 max-w-md font-comfortaa" variants={fadeInUp} custom={2}>
            Ada pertanyaan atau ingin memulai komunikasi dengan kami?
          </motion.p>

          <motion.div className="space-y-4 mt-6" variants={fadeInUp} custom={3}>
            {[
              { icon: "fa-envelope", title: "Email", value: "catmythh@gmail.com", href: "mailto:catmythh@gmail.com" },
              { icon: "fa-phone", title: "Telepon", value: "+62 851-8780-4324", href: "https://wa.me/6285187804324" },
              { icon: "fa-location-dot", title: "Lokasi", value: "Bogor, Jawa Barat, Indonesia", href: "https://www.google.com/maps/search/?api=1&query=Indonesia,Bogor,Jawa+Barat" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                variants={fadeInUp}
                custom={i + 4}
              >
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <i className={`fa-solid ${item.icon} text-green-400 text-xl`}></i>
                    <div>
                      <p className="text-sm text-gray-400 font-comfortaa ml-2">{item.title}</p>
                      <p className="text-white font-comfortaa ml-2">{item.value}</p>
                    </div>
                  </div>
                  <ArrowRight className="text-gray-400" size={18} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.input
            type="text"
            placeholder="Nama"
            required
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-white/10 focus:shadow-none font-comfortaa mt-2"
            variants={fadeInUp}
            custom={0}
          />
          <motion.textarea
            placeholder="Pesan"
            required
            rows={6}
            value={form.message}
            onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
            className="rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-white/10 focus:shadow-none font-comfortaa"
            variants={fadeInUp}
            custom={1}
          />

          <motion.p className="text-gray-400 font-comfortaa mb-1 mt-1 ml-2" variants={fadeInUp} custom={2}>
            Rating:
          </motion.p>
          <motion.div className="flex gap-1 ml-2 -mt-1" variants={fadeInUp} custom={3}>
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`fa-solid fa-star text-2xl cursor-pointer ${
                  form.rating >= star ? "text-yellow-400" : "text-gray-400"
                }`}
                onClick={() => setForm((s) => ({ ...s, rating: star }))}
              ></i>
            ))}
          </motion.div>

          <motion.button
            disabled={sending}
            className="w-full py-3 rounded-xl bg-white text-black font-comfortaa flex items-center justify-center gap-2 mt-4 hover:bg-gray-200 transition-colors duration-200"
            variants={fadeInUp}
            custom={4}
          >
            {sending ? "Sending..." : "Kirim"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
