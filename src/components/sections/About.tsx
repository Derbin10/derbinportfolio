import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, Layers, Zap, UserCheck, MapPin } from 'lucide-react'
import { personalInfo } from '@/data/content'

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
    <section id="about" className="py-24 lg:py-32 bg-light-card/50 dark:bg-dark-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Image - 2 columns */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-card">
                <img
                  src={personalInfo.profilePic}
                  alt="Derbin Davidraj"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = personalInfo.profilePic2 }}
                />
              </div>
              {/* Location Badge */}
              <motion.div
                className="absolute -bottom-4 left-4 right-4 p-4 bg-white dark:bg-dark-card rounded-xl shadow-lg border border-light-border dark:border-dark-border"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Open to relocate</p>
                    <p className="font-medium text-gray-900 dark:text-white">Bangalore & Chennai</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content - 3 columns */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Header */}
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">About Me</span>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Hi, I'm Derbin
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                A Brand & Marketing Designer with 3+ years of experience turning ideas into clear, consistent, and meaningful visual communication.
              </p>
            </div>

            {/* Specializations */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">I specialize in:</h3>
              <ul className="space-y-2">
                {specializations.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* AI Workflow Note */}
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">My workflow</strong> combines strong fundamentals with AI-assisted research and ideation. I use AI to understand topics quickly and explore directions — but the design thinking and final decisions always come from me.
              </p>
            </div>

            {/* Strengths Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {strengths.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="p-4 bg-white dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tools */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tools I work with:</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-dark-border rounded-lg text-sm text-gray-700 dark:text-gray-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
