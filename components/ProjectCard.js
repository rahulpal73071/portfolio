"use client"
import { useState, useRef, useEffect } from "react"

import { FiGithub, FiCode, FiStar, FiEye, FiZap, FiHeart, FiTrendingUp } from "react-icons/fi"

/**
 * @typedef {Object} ProjectCardProps
 * @property {string} icon
 * @property {string} title
 * @property {string} description
 * @property {string} [liveLink]
 * @property {string} [githubLink]
 */

/**
 * @param {ProjectCardProps} props
 */
export default function ProjectCard({ icon, title, description, liveLink, githubLink }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [showRipple, setShowRipple] = useState(false)
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 })
  const [animationPhase, setAnimationPhase] = useState(0)
  const cardRef = useRef(null)

  // Mouse tracking for 3D tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setMousePosition({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY,
    })

    // Update ripple position
    setRipplePosition({ x, y })
  }

  // Handle hover enter with cool animations
  const handleMouseEnter = () => {
    setIsHovered(true)
    setShowRipple(true)
    setAnimationPhase(1)

    // Trigger sequential animations
    setTimeout(() => setAnimationPhase(2), 200)
    setTimeout(() => setAnimationPhase(3), 400)
    setTimeout(() => setAnimationPhase(4), 600)
  }

  // Handle hover leave
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
    setShowRipple(false)
    setAnimationPhase(0)
  }

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative group h-full transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Ripple Effect */}
      <div
        className={`absolute pointer-events-none transition-all duration-1000 ${
          showRipple ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: ripplePosition.x - 50,
          top: ripplePosition.y - 50,
          width: 100,
          height: 100,
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: showRipple ? "scale(3)" : "scale(0)",
          filter: "blur(10px)",
        }}
      />

      {/* Energy Waves */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 animate-ping"
              style={{
                animationDelay: `${i * 300}ms`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Particles around card */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full transition-all duration-1000 ${
              animationPhase >= 2 ? "opacity-100 animate-pulse" : "opacity-0"
            }`}
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 3) * 25}%`,
              background: `linear-gradient(45deg, ${
                ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"][i % 5]
              }, transparent)`,
              animationDelay: `${i * 100}ms`,
              transform:
                animationPhase >= 2
                  ? `translate(${Math.sin(i) * 30}px, ${Math.cos(i) * 30}px) scale(${1 + Math.sin(i) * 0.5})`
                  : "translate(0, 0) scale(0)",
            }}
          />
        ))}
      </div>

      {/* Lightning Effect */}
      {animationPhase >= 3 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div
            className="absolute w-1 bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-80 animate-pulse"
            style={{
              height: "100%",
              left: "20%",
              animation: "lightning 0.5s ease-in-out",
              animationDelay: "0.6s",
            }}
          />
          <div
            className="absolute w-1 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-60 animate-pulse"
            style={{
              height: "100%",
              right: "30%",
              animation: "lightning 0.5s ease-in-out",
              animationDelay: "0.8s",
            }}
          />
        </div>
      )}

      {/* Main Card Container */}
      <div
        className={`relative h-full transition-all duration-700 ease-out ${isHovered ? "scale-105" : "scale-100"}`}
        style={{
          transform: `
            perspective(1000px) 
            rotateX(${mousePosition.y * 12}deg) 
            rotateY(${mousePosition.x * 12}deg) 
            translateZ(${isHovered ? "30px" : "0px"})
            scale(${isHovered ? "1.05" : "1"})
          `,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Holographic Background Effect */}
        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(59, 130, 246, 0.15) 0%, 
                rgba(139, 92, 246, 0.15) 25%, 
                rgba(236, 72, 153, 0.15) 50%, 
                rgba(16, 185, 129, 0.15) 75%, 
                rgba(59, 130, 246, 0.15) 100%
              )
            `,
            backgroundSize: "400% 400%",
            animation: isHovered ? "holographic 4s ease infinite" : "none",
          }}
        />

        {/* Scan Line Effect */}
        {animationPhase >= 1 && (
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(59, 130, 246, 0.3) 50%, 
                transparent 100%
              )`,
              animation: "scan-line 2s ease-in-out infinite",
            }}
          />
        )}

        {/* Main Card */}
        <div
          className="relative h-full p-8 rounded-2xl border backdrop-blur-xl overflow-hidden"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(15, 15, 35, 0.95) 0%, 
                rgba(26, 26, 46, 0.9) 50%, 
                rgba(22, 33, 62, 0.95) 100%
              )
            `,
            borderColor: isHovered ? "rgba(59, 130, 246, 0.6)" : "rgba(255, 255, 255, 0.1)",
            boxShadow: isHovered
              ? `
                0 30px 60px rgba(0, 0, 0, 0.6),
                0 0 40px rgba(59, 130, 246, 0.4),
                inset 0 2px 0 rgba(255, 255, 255, 0.3),
                inset 0 0 20px rgba(59, 130, 246, 0.1)
              `
              : `
                0 10px 30px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `,
          }}
        >
          {/* Animated Circuit Pattern */}
          <div
            className={`absolute inset-0 opacity-10 transition-opacity duration-700 ${
              isHovered ? "opacity-30" : "opacity-10"
            }`}
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 2px, transparent 2px),
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px, 50px 50px, 25px 25px, 25px 25px",
              animation: isHovered ? "circuit-flow 3s linear infinite" : "none",
            }}
          />

          {/* Project Icon Section */}
          <div className="relative mb-6">
            <div
              className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-700 ${
                animationPhase >= 1 ? "scale-110 rotate-12" : "scale-100"
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: `
                  ${animationPhase >= 1 ? "scale(1.15) rotateY(20deg) rotateX(15deg)" : "scale(1)"}
                  translateZ(${animationPhase >= 1 ? "40px" : "0px"})
                `,
                boxShadow:
                  animationPhase >= 1
                    ? `
                    0 25px 50px rgba(0, 0, 0, 0.5),
                    0 0 40px rgba(59, 130, 246, 0.6),
                    inset 0 3px 0 rgba(255, 255, 255, 0.4)
                  `
                    : "0 8px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              {icon ? (
                <img
                  src={icon || "/placeholder.svg"}
                  alt={`${title} icon`}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{
                    transform: animationPhase >= 1 ? "scale(1.2) rotate(5deg)" : "scale(1)",
                    filter: animationPhase >= 1 ? "brightness(1.2) contrast(1.1)" : "brightness(1)",
                  }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center transition-all duration-700"
                  style={{
                    background: `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)`,
                    backgroundSize: "200% 200%",
                    animation: animationPhase >= 1 ? "gradient-shift 2s ease infinite" : "none",
                  }}
                >
                  <FiCode className="text-white text-3xl" />
                </div>
              )}

              {/* Icon Energy Ring */}
              {animationPhase >= 2 && (
                <div
                  className="absolute inset-0 rounded-xl border-2 border-blue-400 animate-spin"
                  style={{
                    animation: "energy-ring 2s linear infinite",
                  }}
                />
              )}

              {/* Icon Reflection */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/30 transition-opacity duration-700 ${
                  animationPhase >= 1 ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Floating Icon Glow */}
            <div
              className={`absolute inset-0 rounded-xl transition-all duration-700 ${
                animationPhase >= 1 ? "opacity-100 scale-200" : "opacity-0 scale-100"
              }`}
              style={{
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)",
                filter: "blur(25px)",
                transform: "translateZ(-15px)",
              }}
            />

            {/* Power Indicators */}
            <div className="absolute -top-3 -right-3 flex gap-1">
              <div
                className={`w-4 h-4 rounded-full transition-all duration-500 ${
                  animationPhase >= 2 ? "bg-green-400 shadow-lg shadow-green-400/50 animate-pulse" : "bg-green-400/30"
                }`}
                title="Online"
              />
              <div
                className={`w-4 h-4 rounded-full transition-all duration-500 delay-200 ${
                  animationPhase >= 3 ? "bg-blue-400 shadow-lg shadow-blue-400/50 animate-pulse" : "bg-blue-400/30"
                }`}
                title="Featured"
              />
              <div
                className={`w-4 h-4 rounded-full transition-all duration-500 delay-400 ${
                  animationPhase >= 4
                    ? "bg-purple-400 shadow-lg shadow-purple-400/50 animate-pulse"
                    : "bg-purple-400/30"
                }`}
                title="Premium"
              />
            </div>
          </div>

          {/* Project Title with Typewriter Effect */}
          <h3
            className={`text-2xl font-bold mb-4 transition-all duration-500 ${
              animationPhase >= 2 ? "text-blue-400 transform translate-y-1" : "text-white"
            }`}
            style={{
              textShadow: animationPhase >= 2 ? "0 0 25px rgba(59, 130, 246, 0.6)" : "none",
              transform: `translateZ(${animationPhase >= 2 ? "25px" : "0px"})`,
              animation: animationPhase >= 2 ? "text-glow 2s ease-in-out infinite alternate" : "none",
            }}
          >
            {title}
          </h3>

          {/* Project Description */}
          <p
            className="text-gray-300 leading-relaxed mb-8 transition-all duration-500"
            style={{
              transform: `translateZ(${animationPhase >= 2 ? "20px" : "0px"})`,
              opacity: animationPhase >= 2 ? 1 : 0.8,
            }}
          >
            {description}
          </p>

          {/* Animated Tech Stack */}
          <div className="flex gap-2 mb-6">
            {["React", "Next.js", "TypeScript"].map((tech, index) => (
              <span
                key={tech}
                className={`px-3 py-1 text-xs rounded-full border transition-all duration-500 ${
                  animationPhase >= 3
                    ? "border-blue-400/60 bg-blue-400/20 text-blue-300 shadow-lg shadow-blue-400/30"
                    : "border-gray-600 bg-gray-700/50 text-gray-400"
                }`}
                style={{
                  transform: `translateZ(${animationPhase >= 3 ? "15px" : "0px"}) scale(${animationPhase >= 3 ? "1.05" : "1"})`,
                  transitionDelay: `${index * 150}ms`,
                  animation: animationPhase >= 3 ? `tech-pulse 2s ease-in-out infinite ${index * 0.3}s` : "none",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex gap-4 mt-auto">
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-500 transform hover:scale-110"
                style={{
                  transform: `translateZ(${animationPhase >= 4 ? "30px" : "0px"})`,
                  transformStyle: "preserve-3d",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiZap className="text-sm transition-transform duration-300 group-hover/btn:scale-125" />
                  Live Demo
                </span>
                <div
                  className="absolute inset-0 rounded-lg transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    boxShadow:
                      animationPhase >= 4
                        ? "0 15px 30px rgba(59, 130, 246, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3)"
                        : "0 4px 10px rgba(59, 130, 246, 0.3)",
                    transform: "translateZ(-8px)",
                    animation: animationPhase >= 4 ? "button-glow 2s ease-in-out infinite alternate" : "none",
                  }}
                />

                {/* Button Energy Effect */}
                {animationPhase >= 4 && (
                  <div
                    className="absolute inset-0 rounded-lg opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                      filter: "blur(15px)",
                      transform: "translateZ(-15px) scale(1.2)",
                      animation: "button-energy 1.5s ease-in-out infinite",
                    }}
                  />
                )}
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-500 transform hover:scale-110"
                style={{
                  transform: `translateZ(${animationPhase >= 4 ? "30px" : "0px"})`,
                  transformStyle: "preserve-3d",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiGithub className="text-sm transition-transform duration-300 group-hover/btn:scale-125" />
                  Source Code
                </span>
                <div
                  className="absolute inset-0 border-2 rounded-lg transition-all duration-500"
                  style={{
                    borderColor: animationPhase >= 4 ? "rgba(6, 182, 212, 0.8)" : "rgba(255, 255, 255, 0.3)",
                    backgroundColor: animationPhase >= 4 ? "rgba(6, 182, 212, 0.15)" : "transparent",
                    boxShadow:
                      animationPhase >= 4
                        ? "0 15px 30px rgba(6, 182, 212, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.2)"
                        : "0 4px 10px rgba(0, 0, 0, 0.2)",
                    transform: "translateZ(-8px)",
                  }}
                />
              </a>
            )}
          </div>

          {/* Floating Stats with Animation */}
          <div
            className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-700 ${
              animationPhase >= 3 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            <div className="flex items-center gap-1 text-xs text-yellow-400">
              <FiStar className="text-xs animate-spin" style={{ animationDuration: "3s" }} />
              <span>4.9</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-400">
              <FiEye className="text-xs animate-pulse" />
              <span>2.1k</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-red-400">
              <FiHeart className="text-xs animate-bounce" />
              <span>156</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <FiTrendingUp className="text-xs" />
              <span>+12%</span>
            </div>
          </div>

          {/* Dynamic Corner Accents */}
          <div
            className={`absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 rounded-tl-2xl transition-all duration-500 ${
              animationPhase >= 1 ? "border-blue-400 scale-125 shadow-lg shadow-blue-400/50" : "border-gray-600"
            }`}
          />
          <div
            className={`absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 rounded-br-2xl transition-all duration-500 ${
              animationPhase >= 1 ? "border-purple-400 scale-125 shadow-lg shadow-purple-400/50" : "border-gray-600"
            }`}
          />
          <div
            className={`absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 rounded-tr-2xl transition-all duration-500 delay-200 ${
              animationPhase >= 2 ? "border-pink-400 scale-125 shadow-lg shadow-pink-400/50" : "border-gray-600"
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 rounded-bl-2xl transition-all duration-500 delay-400 ${
              animationPhase >= 3 ? "border-green-400 scale-125 shadow-lg shadow-green-400/50" : "border-gray-600"
            }`}
          />
        </div>

        {/* Enhanced 3D Depth Shadow */}
        <div
          className="absolute inset-0 rounded-2xl -z-10 transition-all duration-700"
          style={{
            background: "linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%)",
            transform: isHovered
              ? "translate(15px, 15px) translateZ(-40px) rotateX(8deg) rotateY(8deg)"
              : "translate(8px, 8px) translateZ(-20px)",
            filter: "blur(12px)",
          }}
        />
      </div>
    </div>
  )
}
