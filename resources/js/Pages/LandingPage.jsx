import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function LandingPage() {
    return (
        <div className="bg-black text-white selection:bg-green-500/40">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Contact />
            <Footer />
            <a href="#home" className="fixed bottom-6 right-6 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-white hover:bg-white/10" aria-label="Back to top">↑</a>
        </div>
    );
}
