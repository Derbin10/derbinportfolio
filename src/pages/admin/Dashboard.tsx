import { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  FolderOpen,
  LogOut,
  Plus,
  Eye,
  TrendingUp,
  Download,
  FileText,
  Upload,
} from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'
import { useProjects } from '@/hooks/useSupabase'
import { getAnalyticsStats, uploadResume } from '@/lib/supabase'
import Button from '@/components/ui/Button'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, isAuthenticated, loading: authLoading, signOut } = useAuthContext()
  const { projects, loading: projectsLoading } = useProjects()
  const [analytics, setAnalytics] = useState({ resumeDownloads: 0, projectViews: 0 })
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login')
    }
  }, [authLoading, isAuthenticated, navigate])

  useEffect(() => {
    async function loadAnalytics() {
      const stats = await getAnalyticsStats()
      setAnalytics(stats)
    }
    loadAnalytics()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const url = await uploadResume(file)
    setUploading(false)

    if (url) {
      alert('Resume uploaded successfully!')
    } else {
      alert('Failed to upload resume. Make sure Supabase is configured.')
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const stats = [
    {
      label: 'Resume Downloads',
      value: analytics.resumeDownloads,
      icon: Download,
      color: 'bg-green-500/10 text-green-400',
    },
    {
      label: 'Project Views',
      value: analytics.projectViews,
      icon: Eye,
      color: 'bg-blue-500/10 text-blue-400',
    },
    {
      label: 'Total Projects',
      value: projects.length,
      icon: FolderOpen,
      color: 'bg-purple-500/10 text-purple-400',
    },
    {
      label: 'Featured',
      value: projects.filter((p) => p.is_featured).length,
      icon: TrendingUp,
      color: 'bg-yellow-500/10 text-yellow-400',
    },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-display font-bold text-accent">
              DD
            </Link>
            <span className="text-gray-600">|</span>
            <h1 className="text-lg font-semibold text-white">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-6 bg-dark-card rounded-2xl border border-dark-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-display font-bold text-white">
                    {projectsLoading ? '-' : stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/admin/projects">
            <Button variant="primary" className="w-full justify-center">
              <FolderOpen className="w-5 h-5 mr-2" />
              Manage Projects
            </Button>
          </Link>
          <Link to="/admin/projects?new=true">
            <Button variant="outline" className="w-full justify-center">
              <Plus className="w-5 h-5 mr-2" />
              Add New Project
            </Button>
          </Link>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleResumeUpload}
              accept=".pdf"
              className="hidden"
            />
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="w-5 h-5 mr-2" />
              {uploading ? 'Uploading...' : 'Update Resume'}
            </Button>
          </div>
          <Link to="/" target="_blank">
            <Button variant="ghost" className="w-full justify-center">
              <Eye className="w-5 h-5 mr-2" />
              View Site
            </Button>
          </Link>
        </div>

        {/* Recent Projects */}
        <motion.div
          className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-6 border-b border-dark-border">
            <h2 className="text-xl font-display font-semibold text-white">
              Recent Projects
            </h2>
          </div>
          <div className="divide-y divide-dark-border">
            {projectsLoading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : projects.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No projects yet.{' '}
                <Link to="/admin/projects?new=true" className="text-accent hover:underline">
                  Add your first project
                </Link>
              </div>
            ) : (
              projects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="p-4 flex items-center justify-between hover:bg-dark-border/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {project.thumbnail_url && (
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-medium text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500">{project.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.is_featured && (
                      <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">
                        Featured
                      </span>
                    )}
                    <Link
                      to={`/admin/projects?edit=${project.id}`}
                      className="text-accent hover:underline text-sm"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
          {projects.length > 5 && (
            <div className="p-4 border-t border-dark-border">
              <Link
                to="/admin/projects"
                className="text-accent hover:underline text-sm font-medium"
              >
                View all {projects.length} projects
              </Link>
            </div>
          )}
        </motion.div>

        {/* Resume Info */}
        <motion.div
          className="mt-8 p-6 bg-dark-card rounded-2xl border border-dark-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-xl">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Resume Management</h3>
                <p className="text-sm text-gray-400">
                  Upload a new resume or check download stats
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{analytics.resumeDownloads}</p>
              <p className="text-sm text-gray-400">Total Downloads</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
