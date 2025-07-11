"use client"
import { useState, useEffect } from "react"

import { FiSend, FiUser, FiMail, FiMessageSquare, FiCheck, FiX, FiLoader } from "react-icons/fi"

// Floating Background Elements
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30 animate-pulse"
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
            background: `radial-gradient(circle, ${["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"][Math.floor(Math.random() * 5)]} 0%, transparent 70%)`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Contact-themed floating elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`contact-${i}`}
          className="absolute text-xs opacity-10 text-green-400 font-mono animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          {["@", "✉", "📧", "💬"][Math.floor(Math.random() * 4)]}
        </div>
      ))}
    </div>
  )
}

// 3D Input Field Component
function InputField({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  isTextarea = false,
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative group">
      {/* Label */}
      <label
        className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
          isFocused ? "text-green-400" : error ? "text-red-400" : "text-gray-300"
        }`}
      >
        {label}
      </label>

      {/* Input Container */}
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* Icon */}
        <div
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
            isFocused ? "text-green-400 scale-110" : error ? "text-red-400" : "text-gray-400"
          }`}
          style={{
            zIndex: 10,
            top: isTextarea ? "20px" : "50%",
          }}
        >
          <Icon className="text-lg" />
        </div>

        {/* Input/Textarea */}
        {isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={5}
            className={`w-full pl-12 pr-4 py-4 rounded-xl border backdrop-blur-xl transition-all duration-500 resize-none ${
              isFocused
                ? "border-green-400/60 bg-green-400/5 shadow-lg shadow-green-400/20"
                : error
                  ? "border-red-400/60 bg-red-400/5 shadow-lg shadow-red-400/20"
                  : isHovered
                    ? "border-blue-400/40 bg-white/5"
                    : "border-gray-600/30 bg-gray-900/50"
            } text-white placeholder-gray-400 focus:outline-none`}
            style={{
              background: isFocused
                ? "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)"
                : error
                  ? "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(15, 15, 35, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%)",
              boxShadow: isFocused
                ? "0 10px 30px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                : error
                  ? "0 10px 30px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              transform: isFocused ? "translateY(-2px)" : "translateY(0px)",
            }}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full pl-12 pr-4 py-4 rounded-xl border backdrop-blur-xl transition-all duration-500 ${
              isFocused
                ? "border-green-400/60 bg-green-400/5 shadow-lg shadow-green-400/20"
                : error
                  ? "border-red-400/60 bg-red-400/5 shadow-lg shadow-red-400/20"
                  : isHovered
                    ? "border-blue-400/40 bg-white/5"
                    : "border-gray-600/30 bg-gray-900/50"
            } text-white placeholder-gray-400 focus:outline-none`}
            style={{
              background: isFocused
                ? "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)"
                : error
                  ? "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(15, 15, 35, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%)",
              boxShadow: isFocused
                ? "0 10px 30px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                : error
                  ? "0 10px 30px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              transform: isFocused ? "translateY(-2px)" : "translateY(0px)",
            }}
          />
        )}

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none ${
            isFocused ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: isFocused
              ? "radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)",
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-400 text-sm animate-pulse">
          <FiX className="text-xs" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

// Success/Error Message Component
function StatusMessage({ type, message }) {
  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl animate-pulse ${
        type === "success"
          ? "border-green-400/60 bg-green-400/10 text-green-300"
          : "border-red-400/60 bg-red-400/10 text-red-300"
      }`}
      style={{
        boxShadow:
          type === "success"
            ? "0 10px 30px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 10px 30px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      {type === "success" ? <FiCheck className="text-xl animate-bounce" /> : <FiX className="text-xl animate-bounce" />}
      <span className="font-medium">{message}</span>
    </div>
  )
}

export default function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [isHovered, setIsHovered] = useState(false)

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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("https://django-contact-backend.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. I'll get back to you soon!",
        })
        setFormData({ fullName: "", email: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Sorry, there was an error sending your message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className="relative min-h-screen px-6 py-24 text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${50 + mousePosition.x * 0.01}% ${50 + mousePosition.y * 0.01}%, 
          rgba(16, 185, 129, 0.15) 0%, 
          rgba(59, 130, 246, 0.1) 35%, 
          rgba(139, 92, 246, 0.05) 100%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
        `,
      }}
    >
      {/* Floating Background Elements */}
      <FloatingElements />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* 3D Heading */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text mb-6 transform transition-transform duration-300"
            style={{
              textShadow: `
                0 0 20px rgba(16, 185, 129, 0.5),
                0 0 40px rgba(16, 185, 129, 0.3),
                4px 4px 0px rgba(0, 0, 0, 0.3),
                8px 8px 0px rgba(0, 0, 0, 0.2)
              `,
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.005}deg) rotateY(${mousePosition.x * 0.005}deg)`,
            }}
          >
            Get In Touch
          </h2>

          {/* 3D Shadow Effect for heading */}
          <div
            className="absolute inset-0 text-5xl md:text-7xl font-black text-green-900/20 transform -z-10"
            style={{
              transform: `translate(6px, 6px) perspective(1000px) rotateX(${mousePosition.y * 0.003}deg) rotateY(${mousePosition.x * 0.003}deg)`,
            }}
          >
            Get In Touch
          </div>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 backdrop-blur-sm bg-white/5 rounded-3xl p-6 border border-white/10 leading-relaxed"
            style={{
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              transform: `translateZ(${mousePosition.y * 0.02}px)`,
            }}
          >
            Have a project in mind or just want to chat? I'd love to hear from you! Drop me a message and let's create
            something amazing together.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Container */}
            <div
              className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10"
              style={{
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Full Name Field */}
              <div className="mb-8">
                <InputField
                  label="Full Name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  icon={FiUser}
                  error={errors.fullName}
                />
              </div>

              {/* Email Field */}
              <div className="mb-8">
                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  icon={FiMail}
                  error={errors.email}
                />
              </div>

              {/* Message Field */}
              <div className="mb-8">
                <InputField
                  label="Message"
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or just say hello!"
                  icon={FiMessageSquare}
                  error={errors.message}
                  isTextarea={true}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group relative px-12 py-4 text-lg font-bold text-white transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 0.003}deg) rotateY(${mousePosition.x * 0.003}deg) ${isHovered ? "scale(1.05)" : "scale(1)"}`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <FiLoader className="text-xl animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <FiSend className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
                        Send Message
                      </>
                    )}
                  </span>

                  {/* Button Background */}
                  <div
                    className="absolute inset-0 rounded-xl transition-all duration-500"
                    style={{
                      background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
                      boxShadow: isHovered
                        ? "0 20px 40px rgba(16, 185, 129, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)"
                        : "0 10px 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      transform: "translateZ(-5px)",
                    }}
                  />

                  {/* Button Glow Effect */}
                  <div
                    className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                      isHovered ? "opacity-100 scale-110" : "opacity-0 scale-100"
                    }`}
                    style={{
                      background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
                      filter: "blur(15px)",
                      transform: "translateZ(-10px)",
                    }}
                  />

                  {/* Button Depth Shadow */}
                  <div
                    className="absolute inset-0 rounded-xl transition-all duration-500"
                    style={{
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.6) 0%, rgba(59, 130, 246, 0.6) 100%)",
                      transform: isHovered
                        ? "translate(6px, 6px) translateZ(-15px)"
                        : "translate(4px, 4px) translateZ(-10px)",
                      filter: "blur(8px)",
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Status Message */}
            {submitStatus && (
              <div className="mt-6">
                <StatusMessage type={submitStatus.type} message={submitStatus.message} />
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" />

      {/* Corner Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-green-400/20 rounded-tl-2xl" />
      <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-blue-400/20 rounded-tr-2xl" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-purple-400/20 rounded-bl-2xl" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-pink-400/20 rounded-br-2xl" />
    </section>
  )
}
