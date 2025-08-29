import { useEffect, useState } from "react";

export default function useSectionObserver(ids) {
    const [active, setActive] = useState(ids[0]);
    useEffect(() => {
        const opts = { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, opts);
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids]);
    return active;
}
