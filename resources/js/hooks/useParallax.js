import { useScroll, useTransform } from "framer-motion";

export default function useParallax(ref) {
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
    return { y, opacity };
}
