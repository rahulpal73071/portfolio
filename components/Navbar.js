"use client";
import Link from "next/link";
import { useState } from "react";

function Navbar() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [logoHover, setLogoHover] = useState(false); // ✅ Track logo hover

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* === 3D LOGO BUTTON === */}
        <div
          className="relative group"
          onMouseEnter={() => setLogoHover(true)}
          onMouseLeave={() => setLogoHover(false)}
          onFocus={() => setLogoHover(true)}
          onBlur={() => setLogoHover(false)}
        >
          <Link
            href="/"
            className="relative block px-6 py-3 text-white text-2xl font-black tracking-wide transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10">RP</span>

            {/* Button Front Glow */}
            <div
              className={`absolute inset-0 rounded-xl transition-all duration-300 transform ${
                logoHover
                  ? "bg-gradient-to-br from-white/80 to-white/60 shadow-xl -translate-y-1 scale-105"
                  : "bg-gradient-to-br from-white/30 to-white/10"
              }`}
              style={{
                boxShadow: logoHover
                  ? "0 12px 35px rgba(255, 255, 255, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.8)"
                  : "0 4px 15px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            />

            {/* Depth Shadow */}
            <div
              className={`absolute inset-0 rounded-xl transition-all duration-300 transform translate-y-1 -z-10 ${
                logoHover
                  ? "bg-gradient-to-br from-white/40 to-white/20"
                  : "bg-gradient-to-br from-white/20 to-white/5"
              }`}
            />
          </Link>
        </div>

        {/* === NAV LINKS === */}
        <ul className="flex space-x-8">
          {["about", "projects"].map((item) => {
            const isHovered = hoveredItem === item;
            const colors =
              item === "about"
                ? ["from-emerald-500", "to-teal-600", "shadow-emerald-500/50", "from-emerald-700", "to-teal-800"]
                : ["from-violet-500", "to-purple-600", "shadow-violet-500/50", "from-violet-700", "to-purple-800"];

            return (
              <li key={item} className="relative">
                <Link
                  href={`/${item}`}
                  className="relative block px-6 py-3 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onFocus={() => setHoveredItem(item)}
                  onBlur={() => setHoveredItem(null)}
                >
                  <span className="relative z-10 capitalize">{item}</span>

                  {/* Button Glow */}
                  <div
                    className={`absolute inset-0 rounded-xl transition-all duration-300 transform ${
                      isHovered
                        ? `bg-gradient-to-r ${colors[0]} ${colors[1]} shadow-lg ${colors[2]} -translate-y-1 scale-105`
                        : "bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-gray-700/60 hover:to-gray-600/60"
                    }`}
                    style={{
                      boxShadow: isHovered
                        ? "0 8px 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                        : "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    }}
                  />

                  {/* Depth */}
                  <div
                    className={`absolute inset-0 rounded-xl transition-all duration-300 transform translate-y-1 -z-10 ${
                      isHovered
                        ? `bg-gradient-to-r ${colors[3]} ${colors[4]}`
                        : "bg-gradient-to-r from-gray-900 to-gray-800"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 animate-pulse -z-10" />

      {/* Bottom Border Glow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </nav>
  );
}

export default Navbar;
