export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-white/10 bg-black/50 py-8 text-gray-400 flex justify-center items-center font-comfortaa text-sm">
            <p>© {year} OneWeb. All rights reserved.</p>
        </footer>
    );
}
