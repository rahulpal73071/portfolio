"use client"
import { useState, useEffect } from "react"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/data/projectsData"

// Floating Background Elements
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Larger floating orbs */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute w-4 h-4 rounded-full opacity-20 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"][Math.floor(Math.random() * 5)]} 0%, transparent 70%)`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Code-themed floating elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`code-${i}`}
          className="absolute text-xs opacity-10 text-blue-400 font-mono animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          {["</>", "{}", "[]", "()"][Math.floor(Math.random() * 4)]}
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      className="relative min-h-screen px-6 py-24 text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${50 + mousePosition.x * 0.01}% ${50 + mousePosition.y * 0.01}%, 
          rgba(59, 130, 246, 0.15) 0%, 
          rgba(139, 92, 246, 0.1) 35%, 
          rgba(16, 185, 129, 0.05) 100%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
        `,
      }}
    >
      {/* Floating Background Elements */}
      <FloatingElements />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 3D Heading Section */}
        <div className="text-center mb-20">
          {/* Main Title */}
          <div className="relative mb-8">
            <h2
              className="text-5xl md:text-7xl font-black mb-6 transform transition-transform duration-300"
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: `
                  0 0 20px rgba(96, 165, 250, 0.5),
                  0 0 40px rgba(168, 85, 247, 0.3),
                  4px 4px 0px rgba(0, 0, 0, 0.3),
                  8px 8px 0px rgba(0, 0, 0, 0.2)
                `,
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg)`,
              }}
            >
              My{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Projects
              </span>
            </h2>

            {/* 3D Shadow Effect for heading */}
            <div
              className="absolute inset-0 text-5xl md:text-7xl font-black text-purple-900/20 transform -z-10"
              style={{
                transform: `translate(6px, 6px) perspective(1000px) rotateX(${mousePosition.y * 0.003}deg) rotateY(${mousePosition.x * 0.003}deg)`,
              }}
            >
              My Projects
            </div>
          </div>

          {/* Description with Glass Effect */}
          <div className="relative">
            <p
              className="text-lg md:text-xl max-w-4xl mx-auto text-white/90 backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 leading-relaxed"
              style={{
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                transform: `translateZ(${mousePosition.y * 0.02}px)`,
              }}
            >
              I've embarked on numerous projects throughout the years, but these are the ones I hold closest to my
              heart. Many of them are <span className="text-blue-400 font-semibold">open source</span>, so if you come
              across something that piques your interest, feel free to explore the codebase and contribute your ideas!
            </p>

            {/* Decorative elements around description */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-blue-400/30 rounded-tl-lg" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-purple-400/30 rounded-tr-lg" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-green-400/30 rounded-bl-lg" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-pink-400/30 rounded-br-lg" />
          </div>
        </div>

        {/* Projects Grid Section */}
        <div className="relative">
          {/* Section Subtitle */}
          <div className="text-center mb-12">
            <h3
              className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text mb-4"
              style={{
                textShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
              }}
            >
              Featured Work
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </div>

          {/* Enhanced Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="w-full max-w-md transform transition-all duration-700 hover:scale-105"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Enhanced Project Card Container */}
                <div
                  className="relative group"
                  style={{
                    filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))",
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                  {/* Project Card with enhanced styling */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl">
                    <ProjectCard
                      icon={project.icon}
                      title={project.title}
                      description={project.description}
                      liveLink={project.liveLink}
                      githubLink={project.githubLink}
                    />

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border animate-pulse" />
                    </div>
                  </div>

                  {/* Floating number indicator */}
                  <div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                    style={{
                      boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                    }}
                  >
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="text-center mt-20">
            <div
              className="inline-block backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
              style={{
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              <p className="text-lg text-white/80 mb-4">Interested in collaborating or have a project in mind?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="group relative px-6 py-3 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all duration-300 group-hover:from-purple-600 group-hover:to-pink-600 group-hover:shadow-lg group-hover:shadow-purple-500/50" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 py-3 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10">View GitHub</span>
                  <div className="absolute inset-0 border-2 border-white/30 rounded-lg transition-all duration-300 group-hover:border-cyan-400 group-hover:bg-white/10 group-hover:shadow-lg group-hover:shadow-cyan-400/30" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />

      {/* Corner Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-blue-400/20 rounded-tl-2xl" />
      <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-purple-400/20 rounded-tr-2xl" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-green-400/20 rounded-bl-2xl" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-pink-400/20 rounded-br-2xl" />
    </section>
  )
}
