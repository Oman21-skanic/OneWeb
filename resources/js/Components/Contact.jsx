import { useState, useMemo } from "react";
import { ArrowRight, Mail } from "lucide-react";

const API_BASE = "http://localhost:8000/api";

export default function Contact() {
    const [form,setForm] = useState({name:"",email:"",message:""});
    const [sending,setSending] = useState(false);
    const [status,setStatus] = useState("");

    const canSubmit = useMemo(()=>form.name && form.email.includes("@") && form.message.length>=10,[form]);

    async function onSubmit(e){
        e.preventDefault();
        if(!canSubmit) return;
        try{
            setSending(true); setStatus("");
            const res = await fetch(`${API_BASE}/contact`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(form)
            });
            if(!res.ok) throw new Error("Gagal mengirim pesan");
            setForm({name:"",email:"",message:""});
            setStatus("Terkirim! Kami akan balas secepatnya.");
        } catch(err){
            setStatus("Gagal mengirim. Pastikan API Laravel /api/contact aktif.");
        } finally{ setSending(false); }
    }

    return (
        <section id="contact" className="relative py-24 border-t border-white/10">
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_60%)]" />
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-black/40 px-3 py-1 text-xs text-green-300">
                    <Mail size={14}/> Kontak
                </div>
                <h2 className="mt-4 text-3xl font-bold text-white">Ayo ngobrol tentang ide kamu</h2>
                <p className="mt-2 text-gray-300 max-w-2xl">Kirim pesan singkat mengenai kebutuhanmu. Kami akan menanggapi secepatnya.</p>

                <form onSubmit={onSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-sm text-gray-300">Nama</label>
                        <input required value={form.name} onChange={e=>setForm(s=>({...s,name:e.target.value}))}
                               className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Nama kamu"/>
                    </div>
                    <div>
                        <label className="text-sm text-gray-300">Email</label>
                        <input required type="email" value={form.email} onChange={e=>setForm(s=>({...s,email:e.target.value}))}
                               className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="email@domain.com"/>
                    </div>
                    <div className="sm:col-span-2">
                        <label className="text-sm text-gray-300">Pesan</label>
                        <textarea required minLength={10} value={form.message} onChange={e=>setForm(s=>({...s,message:e.target.value}))} rows={5}
                                  className="mt-1 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ceritakan kebutuhan atau ide projectmu"/>
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-3">
                        <button disabled={!canSubmit || sending} className="inline-flex items-center gap-2 rounded-2xl bg-green-500 px-6 py-3 font-semibold text-black hover:bg-green-400 transition disabled:opacity-50">
                            {sending ? "Mengirim…" : "Kirim Pesan"} <ArrowRight size={18}/>
                        </button>
                        <span className="text-sm text-gray-400">{status}</span>
                    </div>
                </form>
            </div>
        </section>
    );
}
