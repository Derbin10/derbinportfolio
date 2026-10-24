import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Layers, Zap, UserCheck } from 'lucide-react'

const specializations = [
  'Brand identity & visual systems',
  'Marketing creatives & campaign design',
  'Layout-heavy work: brochures, guides, presentations, reports',
  'Educational and parent-focused communication design',
]

const strengths = [
  { icon: Target, title: 'Clarity', desc: 'I design with purpose and communication in mind.' },
  { icon: Layers, title: 'Consistency', desc: 'I maintain brand alignment across every touchpoint.' },
  { icon: Zap, title: 'Speed', desc: 'I execute quickly without compromising quality.' },
  { icon: UserCheck, title: 'Ownership', desc: 'I handle projects end-to-end with minimal supervision.' },
]

const tools = [
  'Adobe Illustrator', 'Adobe Photoshop', 'PowerPoint', 'CapCut',
  'MS Word', 'Canva', 'Prompt Engineering'
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 lg:py-32 bg-dark-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="space-y-12">

          {/* Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              About Me
            </motion.span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6">
              Hi, I'm <span className="text-accent">Derbin</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A Brand & Marketing Designer with 3+ years of experience turning ideas into clear, consistent, and meaningful visual communication.
            </p>
          </motion.div>

          {/* Specializations */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold text-white mb-4 text-center">I specialize in:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {specializations.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-dark-bg/50 rounded-xl border border-dark-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(99, 102, 241, 0.3)' }}
                >
                  <motion.span
                    className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Workflow Note */}
          <motion.div
            className="max-w-3xl mx-auto p-6 bg-accent/5 border border-accent/20 rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 }}
            whileHover={{ borderColor: 'rgba(99, 102, 241, 0.4)' }}
          >
            <p className="text-gray-400 text-center">
              <strong className="text-white">My workflow</strong> combines strong fundamentals with AI-assisted research and ideation. I use AI to understand topics quickly and explore directions — but the design thinking and final decisions always come from me.
            </p>
          </motion.div>

          {/* Strengths Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strengths.map((item, i) => (
              <motion.div
                key={item.title}
                className="p-6 bg-dark-bg rounded-2xl border border-dark-border text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.3)' }}
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <item.icon className="w-6 h-6 text-accent" />
                </motion.div>
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Tools */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <h3 className="font-semibold text-white mb-4">Tools I work with:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  className="px-4 py-2 bg-dark-border rounded-lg text-sm text-gray-300 border border-dark-border"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + i * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
