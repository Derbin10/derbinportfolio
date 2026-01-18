import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create client if credentials are provided
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export const isSupabaseConfigured = !!supabase

// Types for database tables
export interface DBProject {
  id: string
  title: string
  slug: string
  category: string
  thumbnail_url: string | null
  video_url: string | null
  pdf_url: string | null
  description: string | null
  case_study: {
    problem: string
    process: string[]
    solution: string
    results: string[]
    images: string[]
  } | null
  is_featured: boolean
  order_index: number | null
  created_at: string
}

export interface DBContact {
  id: string
  name: string
  email: string
  message: string | null
  created_at: string
}

// Helper functions
export async function getProjects(): Promise<DBProject[]> {
  if (!supabase) {
    console.warn('Supabase not configured - using static data')
    return []
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data || []
}

export async function getProjectBySlug(slug: string): Promise<DBProject | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return data
}

export async function getFeaturedProjects(): Promise<DBProject[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }

  return data || []
}

export async function submitContactForm(
  name: string,
  email: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    // Fallback: just log to console when Supabase not configured
    console.log('Contact form submission (Supabase not configured):', { name, email, message })
    return { success: true }
  }

  const { error } = await supabase.from('contacts').insert([
    {
      name,
      email,
      message,
    },
  ])

  if (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

// Admin functions (require authentication)
export async function createProject(
  project: Omit<DBProject, 'id' | 'created_at'>
): Promise<DBProject | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    return null
  }

  return data
}

export async function updateProject(
  id: string,
  updates: Partial<Omit<DBProject, 'id' | 'created_at'>>
): Promise<DBProject | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating project:', error)
    return null
  }

  return data
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!supabase) return false

  const { error } = await supabase.from('projects').delete().eq('id', id)

  if (error) {
    console.error('Error deleting project:', error)
    return false
  }

  return true
}

// Storage helpers
export async function uploadImage(
  file: File,
  bucket: string = 'project-images'
): Promise<string | null> {
  if (!supabase) return null

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

  const { error } = await supabase.storage.from(bucket).upload(fileName, file)

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)
  return data.publicUrl
}

export async function deleteImage(
  url: string,
  bucket: string = 'project-images'
): Promise<boolean> {
  if (!supabase) return false

  const fileName = url.split('/').pop()
  if (!fileName) return false

  const { error } = await supabase.storage.from(bucket).remove([fileName])

  if (error) {
    console.error('Error deleting image:', error)
    return false
  }

  return true
}

// Generic file upload - supports any file type
export async function uploadFile(
  file: File,
  bucket: string
): Promise<string | null> {
  if (!supabase) return null

  const fileExt = file.name.split('.').pop()?.toLowerCase() || ''
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

  const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    console.error('Error uploading file:', error)
    return null
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)
  return data.publicUrl
}

// Delete any file from storage
export async function deleteFile(
  url: string,
  bucket: string
): Promise<boolean> {
  if (!supabase) return false

  const fileName = url.split('/').pop()
  if (!fileName) return false

  const { error } = await supabase.storage.from(bucket).remove([fileName])

  if (error) {
    console.error('Error deleting file:', error)
    return false
  }

  return true
}

// Upload video file
export async function uploadVideo(file: File): Promise<string | null> {
  return uploadFile(file, 'project-videos')
}

// Delete video file
export async function deleteVideo(url: string): Promise<boolean> {
  return deleteFile(url, 'project-videos')
}

// Upload PDF/document file
export async function uploadDocument(file: File): Promise<string | null> {
  return uploadFile(file, 'project-documents')
}

// Delete document file
export async function deleteDocument(url: string): Promise<boolean> {
  return deleteFile(url, 'project-documents')
}

// Analytics types
export interface DBAnalytics {
  id: string
  event_type: 'resume_download' | 'project_view'
  project_id?: string
  created_at: string
}

// Track resume download
export async function trackResumeDownload(): Promise<boolean> {
  if (!supabase) {
    // Store in localStorage as fallback
    const downloads = JSON.parse(localStorage.getItem('resume_downloads') || '[]')
    downloads.push({ timestamp: new Date().toISOString() })
    localStorage.setItem('resume_downloads', JSON.stringify(downloads))
    return true
  }

  const { error } = await supabase.from('analytics').insert([
    { event_type: 'resume_download' },
  ])

  if (error) {
    console.error('Error tracking resume download:', error)
    return false
  }

  return true
}

// Track project view
export async function trackProjectView(projectId: string): Promise<boolean> {
  if (!supabase) {
    const views = JSON.parse(localStorage.getItem('project_views') || '[]')
    views.push({ project_id: projectId, timestamp: new Date().toISOString() })
    localStorage.setItem('project_views', JSON.stringify(views))
    return true
  }

  const { error } = await supabase.from('analytics').insert([
    { event_type: 'project_view', project_id: projectId },
  ])

  if (error) {
    console.error('Error tracking project view:', error)
    return false
  }

  return true
}

// Get analytics stats
export async function getAnalyticsStats(): Promise<{
  resumeDownloads: number
  projectViews: number
}> {
  if (!supabase) {
    // Get from localStorage
    const downloads = JSON.parse(localStorage.getItem('resume_downloads') || '[]')
    const views = JSON.parse(localStorage.getItem('project_views') || '[]')
    return {
      resumeDownloads: downloads.length,
      projectViews: views.length,
    }
  }

  const { data: downloadData } = await supabase
    .from('analytics')
    .select('id')
    .eq('event_type', 'resume_download')

  const { data: viewData } = await supabase
    .from('analytics')
    .select('id')
    .eq('event_type', 'project_view')

  return {
    resumeDownloads: downloadData?.length || 0,
    projectViews: viewData?.length || 0,
  }
}

// Upload resume
export async function uploadResume(file: File): Promise<string | null> {
  if (!supabase) return null

  const fileName = `DerbinDavidraj_Resume.pdf`

  // Delete old resume if exists
  await supabase.storage.from('resumes').remove([fileName])

  const { error } = await supabase.storage.from('resumes').upload(fileName, file, {
    upsert: true,
  })

  if (error) {
    console.error('Error uploading resume:', error)
    return null
  }

  const { data } = supabase.storage.from('resumes').getPublicUrl(fileName)
  return data.publicUrl
}
