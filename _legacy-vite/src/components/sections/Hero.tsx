import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { personalInfo } from '@/data/content'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [imageIndex, setImageIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    if (!nameRef.current) return
    gsap.fromTo(
      nameRef.current,
      { y: 80, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  // Flip between profile pictures
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev === 0 ? 1 : 0))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const profileImages = [personalInfo.profilePic, personalInfo.profilePic2]

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/40 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 pt-24"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="text-center lg:text-left">
            {/* Name - Main Header */}
            <motion.h1
              ref={nameRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-4 leading-none"
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-accent bg-clip-text text-transparent">
                {personalInfo.name.split(' ')[0]}
              </span>
              <br />
              <span className="text-accent">{personalInfo.name.split(' ')[1]}</span>
            </motion.h1>

            {/* Title & Tagline */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xl md:text-2xl text-gray-300 font-medium">
                {personalInfo.title}
              </p>
              <p className="text-lg text-accent/80">({personalInfo.tagline})</p>
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-accent/10 border border-accent/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' }}
            >
              <motion.span
                className="w-2 h-2 bg-accent rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-accent">3+ Years Experience</span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Designing clear, consistent, and high-impact visuals for brands, campaigns, and content-heavy projects.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.a
                href="#projects"
                className="group px-6 py-3 bg-accent text-white rounded-lg font-semibold shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                View Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-accent hover:text-accent transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-4 h-4" />
                Contact
              </motion.a>
            </motion.div>
          </div>

          {/* Right - Profile Image with Flip Effect */}
          <motion.div
            className="relative mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
          >
            <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] mx-auto perspective-1000">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 via-accent/20 to-accent/30 rounded-3xl blur-2xl animate-pulse" />

              {/* Image Container with Flip */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-dark-card border border-dark-border">
                {profileImages.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt={`${personalInfo.name} ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{
                      opacity: imageIndex === idx ? 1 : 0,
                      rotateY: imageIndex === idx ? 0 : -90,
                    }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                ))}
              </div>

              {/* Open to Relocate Badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 -right-4 p-4 bg-dark-card/95 backdrop-blur-sm rounded-xl border border-dark-border shadow-xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-2 bg-accent/20 rounded-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MapPin className="w-5 h-5 text-accent" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400">Open to relocate</p>
                    <p className="font-semibold text-white">Bangalore & Chennai</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 bg-accent rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/4 -left-2 w-3 h-3 bg-accent/60 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-accent rounded-full mt-2"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
