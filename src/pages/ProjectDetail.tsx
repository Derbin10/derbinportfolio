import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Play } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getProjectBySlug, DBProject } from '@/lib/supabase'
import Button from '@/components/ui/Button'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<DBProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    async function fetchProject() {
      if (slug) {
        setLoading(true)
        const data = await getProjectBySlug(slug)
        setProject(data)
        setLoading(false)
      }
    }
    fetchProject()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  return (
    <>
      <motion.main
        className="pt-24 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Thumbnail */}
          {project.thumbnail_url && (
            <motion.div
              className="mb-12 rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <img
                src={project.thumbnail_url}
                alt={project.title}
                className="w-full h-auto"
              />
            </motion.div>
          )}

          {/* Video Section */}
          {project.video_url && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Play className="w-6 h-6 text-accent" />
                Project Video
              </h2>
              <div className="rounded-2xl overflow-hidden shadow-xl bg-black">
                <video
                  src={project.video_url}
                  controls
                  className="w-full h-auto"
                  poster={project.thumbnail_url || undefined}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          )}

          {/* PDF Section */}
          {project.pdf_url && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-accent" />
                Project Document
              </h2>
              <div className="bg-white dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {project.title} - Document
                      </p>
                      <p className="text-sm text-gray-500">PDF / Document</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost">View</Button>
                    </a>
                    <a href={project.pdf_url} download>
                      <Button variant="primary">Download</Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Case Study Section */}
          {project.case_study && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-8">
                Case Study
              </h2>

              {/* Problem */}
              {project.case_study.problem && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    The Problem
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {project.case_study.problem}
                  </p>
                </div>
              )}

              {/* Process */}
              {project.case_study.process && project.case_study.process.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    The Process
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                    {project.case_study.process.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Solution */}
              {project.case_study.solution && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    The Solution
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {project.case_study.solution}
                  </p>
                </div>
              )}

              {/* Results */}
              {project.case_study.results && project.case_study.results.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    The Results
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                    {project.case_study.results.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Case Study Images */}
              {project.case_study.images && project.case_study.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.case_study.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="rounded-xl shadow-lg"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.main>
    </>
  )
}
