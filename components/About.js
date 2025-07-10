"use client"
import { useState, useRef, useEffect } from "react"
// import enactus from '../public/images/enactus.webp'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub } from "react-icons/fa"
import { SiMongodb, SiNextdotjs, SiFlutter, SiDjango, SiTailwindcss, SiPython, SiTypescript } from "react-icons/si"

// 3D Skill Icon Component
function SkillIcon({
  Icon,
  color,
  title,
  delay = 0,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const iconRef = useRef(null)

  return (
    <div
      ref={iconRef}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* 3D Icon Container */}
      <div
        className={`relative transform transition-all duration-500 ease-out ${
          isHovered ? "scale-125 -translate-y-4" : "scale-100"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered
            ? "scale(1.25) translateY(-16px) rotateX(15deg) rotateY(15deg)"
            : "scale(1) translateY(0px) rotateX(0deg) rotateY(0deg)",
        }}
      >
        {/* Main Icon */}
        <div
          className={`text-6xl transition-all duration-500 relative z-10 ${color}`}
          style={{
            filter: isHovered
              ? `drop-shadow(0 10px 20px ${color.includes("orange") ? "#ea580c" : color.includes("blue") ? "#2563eb" : color.includes("yellow") ? "#eab308" : color.includes("cyan") ? "#0891b2" : color.includes("green") ? "#16a34a" : color.includes("red") ? "#dc2626" : "#6366f1"}40)`
              : "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
            textShadow: isHovered ? `0 0 20px currentColor, 0 0 40px currentColor` : "0 0 10px currentColor",
          }}
        >
          <Icon />
        </div>

        {/* 3D Shadow/Depth Effect */}
        <div
          className={`absolute inset-0 text-6xl transition-all duration-500 -z-10 ${color} opacity-30`}
          style={{
            transform: isHovered ? "translate(8px, 8px) translateZ(-20px)" : "translate(4px, 4px) translateZ(-10px)",
          }}
        >
          <Icon />
        </div>

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isHovered ? "opacity-100 scale-150" : "opacity-0 scale-100"
          }`}
          style={{
            background: `radial-gradient(circle, ${color.includes("orange") ? "#ea580c" : color.includes("blue") ? "#2563eb" : color.includes("yellow") ? "#eab308" : color.includes("cyan") ? "#0891b2" : color.includes("green") ? "#16a34a" : color.includes("red") ? "#dc2626" : "#6366f1"}20 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Floating Label */}
      <div
        className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <div className="bg-gray-900/90 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-lg border border-gray-700/50">
          {title}
        </div>
      </div>
    </div>
  )
}

// 3D Experience Card Component
function ExperienceCard({
  logo,
  title,
  company,
  duration,
  description,
  hoverColor,
  delay = 0,
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* 3D Card Container */}
      <div
        className={`relative transform transition-all duration-700 ease-out ${
          isHovered ? "scale-105 -translate-y-2" : "scale-100"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered
            ? "scale(1.05) translateY(-8px) rotateX(5deg)"
            : "scale(1) translateY(0px) rotateX(0deg)",
        }}
      >
        {/* Main Card */}
        <div
          className={`relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border transition-all duration-700 ${
            isHovered ? `border-${hoverColor}/50 shadow-2xl` : "border-gray-700/30 shadow-xl"
          }`}
          style={{
            boxShadow: isHovered
              ? `0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px ${hoverColor === "blue" ? "#3b82f6" : "#eab308"}30, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
              : "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* 3D Logo */}
            <div className="relative">
              <div
                className={`w-20 h-20 rounded-xl overflow-hidden transition-all duration-500 ${
                  isHovered ? "scale-110 rotate-3" : "scale-100"
                }`}
                style={{
                  boxShadow: isHovered
                    ? `0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${hoverColor === "blue" ? "#3b82f6" : "#eab308"}40`
                    : "0 8px 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                <img
                  src={logo || "/placeholder.svg"}
                  alt={`${company} Logo`}
                  className="w-full h-full object-contain p-2 bg-white/10 backdrop-blur-sm"
                />
              </div>

              {/* Logo Glow Effect */}
              <div
                className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                  isHovered ? "opacity-100 scale-125" : "opacity-0 scale-100"
                }`}
                style={{
                  background: `radial-gradient(circle, ${hoverColor === "blue" ? "#3b82f6" : "#eab308"}20 0%, transparent 70%)`,
                  filter: "blur(15px)",
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-2xl font-bold text-white mb-2 transition-colors duration-300">{title}</h4>
              <h5
                className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                  isHovered ? (hoverColor === "blue" ? "text-blue-400" : "text-yellow-400") : "text-gray-300"
                }`}
              >
                {company}
              </h5>
              <p className="text-gray-400 text-sm mb-3">{duration}</p>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>
          </div>
        </div>

        {/* 3D Depth Shadow */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-2xl -z-10 transition-all duration-700"
          style={{
            transform: isHovered ? "translate(8px, 8px) translateZ(-20px)" : "translate(4px, 4px) translateZ(-10px)",
          }}
        />
      </div>
    </div>
  )
}

// Floating Background Elements
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Larger floating orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
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
    </div>
  )
}

function About() {
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

  const skills = [
    { Icon: FaHtml5, color: "text-orange-500", title: "HTML5" },
    { Icon: FaCss3Alt, color: "text-blue-500", title: "CSS3" },
    { Icon: FaJs, color: "text-yellow-400", title: "JavaScript" },
    { Icon: SiTypescript, color: "text-blue-400", title: "TypeScript" },
    { Icon: FaReact, color: "text-cyan-400", title: "React" },
    { Icon: SiNextdotjs, color: "text-white", title: "Next.js" },
    { Icon: FaNodeJs, color: "text-green-600", title: "Node.js" },
    { Icon: SiDjango, color: "text-green-700", title: "Django" },
    { Icon: SiMongodb, color: "text-green-500", title: "MongoDB" },
    { Icon: SiFlutter, color: "text-blue-400", title: "Flutter" },
    { Icon: SiPython, color: "text-yellow-300", title: "Python" },
    { Icon: SiTailwindcss, color: "text-sky-400", title: "Tailwind CSS" },
    { Icon: FaGitAlt, color: "text-red-500", title: "Git" },
    { Icon: FaGithub, color: "text-white", title: "GitHub" },
  ]

  return (
    <section
      className="relative min-h-screen px-6 py-24 text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${50 + mousePosition.x * 0.01}% ${50 + mousePosition.y * 0.01}%, 
          rgba(139, 92, 246, 0.15) 0%, 
          rgba(59, 130, 246, 0.1) 35%, 
          rgba(16, 185, 129, 0.05) 100%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
        `,
      }}
    >
      {/* Floating Background Elements */}
      <FloatingElements />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 3D Heading */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text mb-6 transform transition-transform duration-300"
            style={{
              textShadow: `
                0 0 20px rgba(139, 92, 246, 0.5),
                0 0 40px rgba(139, 92, 246, 0.3),
                4px 4px 0px rgba(0, 0, 0, 0.3),
                8px 8px 0px rgba(0, 0, 0, 0.2)
              `,
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg)`,
            }}
          >
            About Me
          </h2>

          {/* 3D Shadow Effect for heading */}
          <div
            className="absolute inset-0 text-5xl md:text-7xl font-black text-purple-900/20 transform -z-10"
            style={{
              transform: `translate(6px, 6px) perspective(1000px) rotateX(${mousePosition.y * 0.003}deg) rotateY(${mousePosition.x * 0.003}deg)`,
            }}
          >
            About Me
          </div>
        </div>

        {/* About Paragraph with Glass Effect */}
        <div className="text-center mb-20">
          <p
            className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90 backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 leading-relaxed"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              transform: `translateZ(${mousePosition.y * 0.02}px)`,
            }}
          >
            I'm a passionate full-stack / flutter developer with experience in building dynamic, responsive, and scalable
            applications across web and mobile platforms. I love working with modern technologies and enjoy solving
            real-world problems through code.
          </p>
        </div>

        {/* 3D Skills Section */}
        <div className="mb-24">
          <h3
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text"
            style={{
              textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
          >
            Skills & Technologies
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-12 justify-items-center">
            {skills.map((skill, index) => (
              <SkillIcon
                key={skill.title}
                Icon={skill.Icon}
                color={skill.color}
                title={skill.title}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        {/* 3D Experience Section */}
        <div>
          <h3
            className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text"
            style={{
              textShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
            }}
          >
            Professional Experience
          </h3>

          <div className="space-y-12 max-w-5xl mx-auto">
            <ExperienceCard
              logo="/images/cheaorange.png"
              title="Technical Secretary"
              company="ChEA, IIT Bombay"
              duration="April 2025 – Present"
              description="Leading digital transformation and technical initiatives for the Chemical Engineering Association. Built and deployed apps and automated platforms to streamline department events and student engagement."
              hoverColor="blue"
              delay={0}
            />

            <ExperienceCard
              logo="/images/enactus.webp"
              title="Web Associate"
              company="Enactus, IIT Bombay"
              duration="May 2025 - Present"
              description="Contributed to the design and development of socially impactful web projects. Focused on clean UI/UX and full-stack solutions for Enactus' social entrepreneurship ventures."
              hoverColor="yellow"
              delay={200}
            />
          </div>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
    </section>
  )
}

export default About
