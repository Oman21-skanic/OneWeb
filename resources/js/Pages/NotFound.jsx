// resources/js/Pages/NotFound.jsx
import React from "react";

export default function NotFound() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black overflow-hidden text-white">
            {/* Background gradient wave */}
            <div className="absolute inset-0">
                <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 320"
                >
                    <defs>
                        <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
                            {/* hijau agak gelap tapi tetap segar */}
                            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="black" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#greenGradient)"
                        d="M0,256L80,240C160,224,320,192,480,181.3C640,171,800,181,960,197.3C1120,213,1280,235,1360,245.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
                    ></path>
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold">
                    <span className="text-white font-comfortaa">404</span>{" "}
                    <span className="text-green-400 font-comfortaa">Not Found</span>
                </h1>

                {/* Optional subtitle styled like input bubble */}
                <div className="inline-flex items-center px-5 py-3 rounded-xl bg-neutral-900/70 border border-green-500/30 shadow-lg">
                    <p className="text-green-200 text-sm md:text-base font-comfortaa">
                        The page you are looking for doesn’t exist
                    </p>
                </div>
            </div>
        </div>
    );
}
