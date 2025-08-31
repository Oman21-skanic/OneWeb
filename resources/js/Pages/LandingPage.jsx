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
      </div>
    );
}
