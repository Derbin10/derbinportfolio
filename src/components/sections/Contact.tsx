import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, Linkedin, FileText, ArrowRight, MapPin } from 'lucide-react'
import { personalInfo } from '@/data/content'
import { trackResumeDownload } from '@/lib/supabase'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleResumeDownload = () => {
    trackResumeDownload()
  }

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'bg-blue-500',
    },
    {
      icon: Phone,
      label: 'Phone / WhatsApp',
      value: `+91 ${personalInfo.phone}`,
      href: `https://wa.me/${personalInfo.whatsapp}`,
      color: 'bg-green-500',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: 'https://www.linkedin.com/in/derbin1234/',
      color: 'bg-blue-600',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'View on Map',
      href: personalInfo.mapUrl,
      color: 'bg-red-500',
    },
  ]

  return (
    <section id="contact" className="py-24 lg:py-32 bg-dark-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref}>
          {/* Main CTA Block */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 lg:p-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Background decoration */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-12">
                <motion.span
                  className="inline-block text-accent font-medium mb-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  Let's Work Together
                </motion.span>
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  Got a project in mind?
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-400 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  I'm open to new opportunities in marketing, education, SaaS, or content-heavy environments. Let's talk.
                </motion.p>
              </div>

              {/* Contact Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {contactLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.label === 'LinkedIn' || link.label === 'Location' ? '_blank' : undefined}
                    rel={link.label === 'LinkedIn' || link.label === 'Location' ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ x: 5, borderColor: 'rgba(99, 102, 241, 0.3)' }}
                  >
                    <motion.div
                      className={`p-3 ${link.color} rounded-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <link.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">{link.label}</p>
                      <p className="font-medium text-white">{link.value}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </div>

              {/* Resume CTA */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 }}
              >
                <motion.a
                  href="/assets/DerbinDavidraj_Resume.pdf"
                  download
                  onClick={handleResumeDownload}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-5 h-5" />
                  Download Resume
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            className="mt-12 p-6 bg-dark-card rounded-2xl border border-dark-border"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            whileHover={{ borderColor: 'rgba(99, 102, 241, 0.2)' }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-accent font-bold text-lg">"</span>
              </motion.div>
              <div>
                <p className="text-gray-400 italic mb-3">
                  "Derbin delivers consistent, on-brand work with quick turnarounds. He takes ownership of projects and requires minimal direction. A reliable team member for design-heavy workloads."
                </p>
                <p className="text-sm text-gray-500">
                  — Team feedback from previous role
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
