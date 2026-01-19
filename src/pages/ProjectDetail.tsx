import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getProjectBySlug, DBProject } from '@/lib/supabase'
import Button from '@/components/ui/Button'
import PDFViewer from '@/components/ui/PDFViewer'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<DBProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPDF, setShowPDF] = useState(false)

  // Go back to projects section without refresh
  const goBackToProjects = () => {
    navigate('/')
    setTimeout(() => {
      const projectsSection = document.querySelector('#projects')
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  useEffect(() => {
    async function fetchProject() {
      if (slug) {
        setLoading(true)
        const data = await getProjectBySlug(slug)
        setProject(data)
        setLoading(false)
        // Auto-open PDF viewer if project has PDF
        if (data?.pdf_url) {
          setShowPDF(true)
        }
      }
    }
    fetchProject()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // If project has PDF, show PDF viewer (Behance-style full page view)
  if (project.pdf_url) {
    return (
      <PDFViewer
        isOpen={true}
        onClose={goBackToProjects}
        pdfUrl={project.pdf_url}
        title={project.title}
      />
    )
  }

  // If project has video (no PDF), show video player full width
  if (project.video_url) {
    return (
      <motion.main
        className="min-h-screen bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Link
                to="/#projects"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-white font-display font-bold text-xl">
                  {project.title}
                </h1>
                <p className="text-white/50 text-sm">{project.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full screen video */}
        <div className="min-h-screen flex items-center justify-center pt-20 pb-8 px-4">
          <div className="w-full max-w-6xl">
            <video
              src={project.video_url}
              controls
              autoPlay
              className="w-full rounded-2xl shadow-2xl"
              poster={project.thumbnail_url || undefined}
            >
              Your browser does not support the video tag.
            </video>

            {/* Description below video */}
            {project.description && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white/70 max-w-2xl mx-auto">
                  {project.description}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.main>
    )
  }

  // Fallback: Show case study or just description (no media)
  return (
    <motion.main
      className="min-h-screen pt-24 pb-16 bg-light-bg dark:bg-dark-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
            {project.category}
          </span>
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {project.description}
            </p>
          )}
        </motion.div>

        {/* Case Study Section */}
        {project.case_study && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            {/* Problem */}
            {project.case_study.problem && (
              <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  The Problem
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.case_study.problem}
                </p>
              </div>
            )}

            {/* Process */}
            {project.case_study.process && project.case_study.process.length > 0 && (
              <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  The Process
                </h3>
                <ul className="space-y-3">
                  {project.case_study.process.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                      <span className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Solution */}
            {project.case_study.solution && (
              <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  The Solution
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.case_study.solution}
                </p>
              </div>
            )}

            {/* Results */}
            {project.case_study.results && project.case_study.results.length > 0 && (
              <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  The Results
                </h3>
                <ul className="space-y-2">
                  {project.case_study.results.map((result, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Case Study Images */}
            {project.case_study.images && project.case_study.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.case_study.images.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="rounded-2xl shadow-lg w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* No content message */}
        {!project.case_study && !project.description && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">
              Project details coming soon.
            </p>
          </div>
        )}
      </div>
    </motion.main>
  )
}
