"use client"
import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text3D, OrbitControls, Float, Environment, Cloud } from "@react-three/drei"
import * as THREE from "three"

// 3D Floating Cube Game Component
function FloatingCube({ position }) {
  const meshRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        scale={clicked ? 1.5 : hovered ? 1.2 : 1}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={clicked ? "#ff6b6b" : hovered ? "#4ecdc4" : "#45b7d1"}
          emissive={hovered ? "#222" : "#000"}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

// 3D Text Component
function Hero3DText() {
  const textRef = useRef(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={textRef}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.8}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-2, 0, 0]}
      >
        RAHUL
        <meshStandardMaterial
          color="#ffffff"
          emissive="#4f46e5"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </Text3D>
    </group>
  )
}

// Interactive Clouds Component
function InteractiveClouds({ mousePosition }) {
  const cloudsRef = useRef(null)

  useFrame(() => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = mousePosition.x * 0.0005
      cloudsRef.current.rotation.x = mousePosition.y * 0.0003
    }
  })

  return (
    <group ref={cloudsRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Cloud
          key={i}
          position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20]}
          speed={0.2}
          opacity={0.3}
          color="#87ceeb"
          segments={20}
        />
      ))}
    </group>
  )
}

// Particle System
function ParticleField() {
  const pointsRef = useRef(null)
  const particleCount = 1000

  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50
  }

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
      pointsRef.current.rotation.x += 0.0005
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#64ffda" transparent opacity={0.6} />
    </points>
  )
}

// Main Hero Component
function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [gameScore, setGameScore] = useState(0)
  const heroRef = useRef(null)

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
      ref={heroRef}
      className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${50 + mousePosition.x * 0.01}% ${50 + mousePosition.y * 0.01}%,
          rgba(139, 92, 246, 0.3) 0%,
          rgba(59, 130, 246, 0.2) 35%,
          rgba(16, 185, 129, 0.1) 100%)`,
      }}
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />

          <Environment preset="night" />
          <InteractiveClouds mousePosition={mousePosition} />
          <ParticleField />

          <FloatingCube position={[-4, 2, -2]} />
          <FloatingCube position={[4, -1, -3]} />
          <FloatingCube position={[0, 3, -4]} />

          <Hero3DText />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-4xl mx-auto">
        <div className="relative mb-8">
          <h1
            className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text mb-4 transform transition-transform duration-300"
            style={{
              textShadow: `
                0 0 20px rgba(139, 92, 246, 0.5),
                0 0 40px rgba(139, 92, 246, 0.3),
                0 0 60px rgba(139, 92, 246, 0.2),
                4px 4px 0px rgba(0, 0, 0, 0.3),
                8px 8px 0px rgba(0, 0, 0, 0.2)
              `,
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`,
            }}
          >
            Hi, I'm Rahul 👋
          </h1>
          <div
            className="absolute inset-0 text-6xl md:text-8xl font-black text-purple-900/20 transform -z-10"
            style={{
              transform: `translate(6px, 6px) perspective(1000px) rotateX(${mousePosition.y * 0.008}deg) rotateY(${mousePosition.x * 0.008}deg)`,
            }}
          >
            Hi, I'm Rahul 👋
          </div>
        </div>

        <div className="relative mb-8">
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              transform: `translateZ(${mousePosition.y * 0.05}px)`,
            }}
          >
            I'm a full-stack / Flutter developer crafting beautiful and performant web & mobile apps.
            <br />
            <span className="text-cyan-400 font-semibold">
               
            </span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="/projects"
            className="group relative px-8 py-4 text-lg font-bold text-white transition-all duration-300 transform hover:scale-105"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg)`,
            }}
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transition-all duration-300 group-hover:from-purple-600 group-hover:to-pink-600 group-hover:shadow-lg group-hover:shadow-purple-500/50 group-hover:-translate-y-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-800 rounded-xl transform translate-y-2 -z-10 group-hover:translate-y-3 transition-transform duration-300" />
          </a>

          <a
            href="/about"
            className="group relative px-8 py-4 text-lg font-bold text-white transition-all duration-300 transform hover:scale-105"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * -0.005}deg)`,
            }}
          >
            <span className="relative z-10">About Me</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent border-2 border-white/50 rounded-xl transition-all duration-300 group-hover:border-cyan-400 group-hover:bg-white/10 group-hover:shadow-lg group-hover:shadow-cyan-400/30 group-hover:-translate-y-1" />
            <div className="absolute inset-0 border-2 border-white/20 rounded-xl transform translate-y-2 -z-10 group-hover:translate-y-3 transition-transform duration-300" />
          </a>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-cyan-300 animate-bounce">
            🎮 Move your mouse to control the environment • 
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
    </section>
  )
}

export default Hero
