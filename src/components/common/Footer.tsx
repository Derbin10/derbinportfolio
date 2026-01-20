import { motion } from 'framer-motion'
import { Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react'
import { personalInfo } from '@/data/content'
import { trackResumeDownload, getResumeUrl } from '@/lib/supabase'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const resumeUrl = getResumeUrl()

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-2">Derbin Davidraj</h3>
            <p className="text-gray-400 mb-4">
              Brand & Marketing Designer<br />
              <span className="text-accent">(GenAI-enabled)</span>
            </p>
            <p className="text-sm text-gray-500">
              Creating clear, consistent visuals for brands and campaigns.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Selected Projects', href: '#projects' },
                { name: 'About Me', href: '#about' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {personalInfo.email}
              </a>
              <a
                href={`https://wa.me/${personalInfo.whatsapp}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 {personalInfo.phone}
              </a>
              <a
                href="https://www.linkedin.com/in/derbin1234/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} Derbin Davidraj. All rights reserved.
          </p>
          <motion.a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackResumeDownload()}
            className="text-sm text-accent hover:text-accent-light transition-colors flex items-center gap-2"
            whileHover={{ x: 3 }}
          >
            Download Resume
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
