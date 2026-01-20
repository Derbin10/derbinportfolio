import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'
import { getResumeData, saveResumeData, DBResumeData } from '@/lib/supabase'
import Button from '@/components/ui/Button'

type SectionKey = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'languages'

export default function ResumeEditor() {
  const navigate = useNavigate()
  const { isAuthenticated, loading: authLoading } = useAuthContext()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(new Set(['personal', 'summary']))

  const [resumeData, setResumeData] = useState<Omit<DBResumeData, 'id' | 'updated_at'>>({
    personal_info: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      portfolio: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: [],
  })

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login')
    }
  }, [authLoading, isAuthenticated, navigate])

  useEffect(() => {
    async function loadResume() {
      const data = await getResumeData()
      if (data) {
        const { id, updated_at, ...rest } = data
        setResumeData(rest)
      }
      setLoading(false)
    }
    loadResume()
  }, [])

  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  const handleSave = async () => {
    setSaving(true)
    const result = await saveResumeData(resumeData)
    setSaving(false)
    if (result) {
      alert('Resume saved successfully!')
    } else {
      alert('Failed to save resume. Please try again.')
    }
  }

  const generateId = () => Math.random().toString(36).substring(2, 11)

  // Experience handlers
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: generateId(),
        job_title: '',
        company: '',
        location: '',
        start_date: '',
        end_date: '',
        is_current: false,
        responsibilities: [''],
      }],
    }))
    setExpandedSections(prev => new Set(prev).add('experience'))
  }

  const updateExperience = (index: number, field: string, value: string | boolean | string[]) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const addResponsibility = (expIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === expIndex ? { ...exp, responsibilities: [...exp.responsibilities, ''] } : exp
      ),
    }))
  }

  const updateResponsibility = (expIndex: number, respIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === expIndex ? {
          ...exp,
          responsibilities: exp.responsibilities.map((r, j) => j === respIndex ? value : r)
        } : exp
      ),
    }))
  }

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === expIndex ? {
          ...exp,
          responsibilities: exp.responsibilities.filter((_, j) => j !== respIndex)
        } : exp
      ),
    }))
  }

  // Education handlers
  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: generateId(),
        degree: '',
        field_of_study: '',
        institution: '',
        location: '',
        start_date: '',
        end_date: '',
        gpa: '',
        achievements: [''],
      }],
    }))
    setExpandedSections(prev => new Set(prev).add('education'))
  }

  const updateEducation = (index: number, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }))
  }

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const addAchievement = (eduIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === eduIndex ? { ...edu, achievements: [...edu.achievements, ''] } : edu
      ),
    }))
  }

  const updateAchievement = (eduIndex: number, achIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === eduIndex ? {
          ...edu,
          achievements: edu.achievements.map((a, j) => j === achIndex ? value : a)
        } : edu
      ),
    }))
  }

  const removeAchievement = (eduIndex: number, achIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === eduIndex ? {
          ...edu,
          achievements: edu.achievements.filter((_, j) => j !== achIndex)
        } : edu
      ),
    }))
  }

  // Skills handlers
  const addSkillCategory = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, {
        id: generateId(),
        category: '',
        skills: [''],
      }],
    }))
    setExpandedSections(prev => new Set(prev).add('skills'))
  }

  const updateSkillCategory = (index: number, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      ),
    }))
  }

  const removeSkillCategory = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const addSkillToCategory = (catIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((cat, i) =>
        i === catIndex ? { ...cat, skills: [...cat.skills, ''] } : cat
      ),
    }))
  }

  const updateSkillInCategory = (catIndex: number, skillIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((cat, i) =>
        i === catIndex ? {
          ...cat,
          skills: cat.skills.map((s, j) => j === skillIndex ? value : s)
        } : cat
      ),
    }))
  }

  const removeSkillFromCategory = (catIndex: number, skillIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((cat, i) =>
        i === catIndex ? {
          ...cat,
          skills: cat.skills.filter((_, j) => j !== skillIndex)
        } : cat
      ),
    }))
  }

  // Certifications handlers
  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        id: generateId(),
        name: '',
        issuer: '',
        date: '',
        credential_id: '',
        url: '',
      }],
    }))
    setExpandedSections(prev => new Set(prev).add('certifications'))
  }

  const updateCertification = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      ),
    }))
  }

  const removeCertification = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  // Languages handlers
  const addLanguage = () => {
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, {
        id: generateId(),
        name: '',
        proficiency: 'Intermediate',
      }],
    }))
    setExpandedSections(prev => new Set(prev).add('languages'))
  }

  const updateLanguage = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) =>
        i === index ? { ...lang, [field]: value } : lang
      ),
    }))
  }

  const removeLanguage = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }))
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const SectionHeader = ({
    section,
    icon: Icon,
    title,
    count
  }: {
    section: SectionKey
    icon: React.ElementType
    title: string
    count?: number
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-dark-card rounded-xl border border-dark-border hover:border-accent/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {count !== undefined && (
          <span className="px-2 py-0.5 bg-dark-border text-gray-400 text-sm rounded-full">
            {count}
          </span>
        )}
      </div>
      {expandedSections.has(section) ? (
        <ChevronUp className="w-5 h-5 text-gray-400" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-400" />
      )}
    </button>
  )

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-card border-b border-dark-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-white">Resume Editor</h1>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? 'Saving...' : 'Save Resume'}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Personal Info Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <SectionHeader section="personal" icon={User} title="Personal Information" />
          {expandedSections.has('personal') && (
            <div className="mt-4 p-6 bg-dark-card rounded-xl border border-dark-border space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.personal_info.name}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personal_info: { ...prev.personal_info, name: e.target.value }
                    }))}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={resumeData.personal_info.title}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personal_info: { ...prev.personal_info, title: e.target.value }
                    }))}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                    placeholder="Brand & Marketing Designer"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={resumeData.personal_info.email}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personal_info: { ...prev.personal_info, email: e.target.value }
                    }))}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={resumeData.personal_info.phone}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personal_info: { ...prev.personal_info, phone: e.target.value }
                    }))}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                <input
                  type="text"
                  value={resumeData.personal_info.location}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personal_info: { ...prev.personal_info, location: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                  placeholder="City, Country"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Website</label>
                  <input
                    type="url"
                    value={resumeData.personal_info.website}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personal_info: { ...prev.personal_info, website: e.target.value }
                    }))}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={resumeData.personal_info.linkedin}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personal_info: { ...prev.personal_info, linkedin: e.target.value }
                    }))}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Portfolio</label>
                <input
                  type="url"
                  value={resumeData.personal_info.portfolio}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personal_info: { ...prev.personal_info, portfolio: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                  placeholder="https://behance.net/yourprofile"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Summary Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <SectionHeader section="summary" icon={User} title="Professional Summary" />
          {expandedSections.has('summary') && (
            <div className="mt-4 p-6 bg-dark-card rounded-xl border border-dark-border">
              <textarea
                value={resumeData.summary}
                onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none resize-none"
                placeholder="A brief summary of your professional background, skills, and career objectives..."
              />
            </div>
          )}
        </motion.div>

        {/* Experience Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SectionHeader section="experience" icon={Briefcase} title="Work Experience" count={resumeData.experience.length} />
          {expandedSections.has('experience') && (
            <div className="mt-4 space-y-4">
              {resumeData.experience.map((exp, expIndex) => (
                <div key={exp.id} className="p-6 bg-dark-card rounded-xl border border-dark-border space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-medium">Experience #{expIndex + 1}</h3>
                    <button
                      onClick={() => removeExperience(expIndex)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={exp.job_title}
                        onChange={(e) => updateExperience(expIndex, 'job_title', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="Senior Designer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
                      <input
                        type="text"
                        value={exp.start_date}
                        onChange={(e) => updateExperience(expIndex, 'start_date', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="Jan 2022"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
                      <input
                        type="text"
                        value={exp.end_date}
                        onChange={(e) => updateExperience(expIndex, 'end_date', e.target.value)}
                        disabled={exp.is_current}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none disabled:opacity-50"
                        placeholder="Dec 2023"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-gray-400">
                    <input
                      type="checkbox"
                      checked={exp.is_current}
                      onChange={(e) => updateExperience(expIndex, 'is_current', e.target.checked)}
                      className="w-4 h-4 rounded border-dark-border bg-dark-bg text-accent focus:ring-accent"
                    />
                    Currently working here
                  </label>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Responsibilities</label>
                    <div className="space-y-2">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <div key={respIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={resp}
                            onChange={(e) => updateResponsibility(expIndex, respIndex, e.target.value)}
                            className="flex-1 px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                            placeholder="Describe a key responsibility or achievement..."
                          />
                          <button
                            onClick={() => removeResponsibility(expIndex, respIndex)}
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => addResponsibility(expIndex)}
                      className="mt-2 text-sm text-accent hover:text-accent/80 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Responsibility
                    </button>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addExperience} className="w-full justify-center">
                <Plus className="w-4 h-4 mr-2" /> Add Experience
              </Button>
            </div>
          )}
        </motion.div>

        {/* Education Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <SectionHeader section="education" icon={GraduationCap} title="Education" count={resumeData.education.length} />
          {expandedSections.has('education') && (
            <div className="mt-4 space-y-4">
              {resumeData.education.map((edu, eduIndex) => (
                <div key={edu.id} className="p-6 bg-dark-card rounded-xl border border-dark-border space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-medium">Education #{eduIndex + 1}</h3>
                    <button
                      onClick={() => removeEducation(eduIndex)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(eduIndex, 'degree', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="Bachelor of Arts"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Field of Study</label>
                      <input
                        type="text"
                        value={edu.field_of_study}
                        onChange={(e) => updateEducation(eduIndex, 'field_of_study', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="Graphic Design"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(eduIndex, 'institution', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => updateEducation(eduIndex, 'location', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
                      <input
                        type="text"
                        value={edu.start_date}
                        onChange={(e) => updateEducation(eduIndex, 'start_date', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="2018"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
                      <input
                        type="text"
                        value={edu.end_date}
                        onChange={(e) => updateEducation(eduIndex, 'end_date', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="2022"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">GPA (optional)</label>
                      <input
                        type="text"
                        value={edu.gpa || ''}
                        onChange={(e) => updateEducation(eduIndex, 'gpa', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="3.8/4.0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Achievements (optional)</label>
                    <div className="space-y-2">
                      {edu.achievements.map((ach, achIndex) => (
                        <div key={achIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={ach}
                            onChange={(e) => updateAchievement(eduIndex, achIndex, e.target.value)}
                            className="flex-1 px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                            placeholder="Dean's List, Honors, etc."
                          />
                          <button
                            onClick={() => removeAchievement(eduIndex, achIndex)}
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => addAchievement(eduIndex)}
                      className="mt-2 text-sm text-accent hover:text-accent/80 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Achievement
                    </button>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addEducation} className="w-full justify-center">
                <Plus className="w-4 h-4 mr-2" /> Add Education
              </Button>
            </div>
          )}
        </motion.div>

        {/* Skills Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <SectionHeader section="skills" icon={Award} title="Skills" count={resumeData.skills.length} />
          {expandedSections.has('skills') && (
            <div className="mt-4 space-y-4">
              {resumeData.skills.map((skillCat, catIndex) => (
                <div key={skillCat.id} className="p-6 bg-dark-card rounded-xl border border-dark-border space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 mr-4">
                      <label className="block text-sm font-medium text-gray-400 mb-1">Category Name</label>
                      <input
                        type="text"
                        value={skillCat.category}
                        onChange={(e) => updateSkillCategory(catIndex, 'category', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="Design Tools, Programming, etc."
                      />
                    </div>
                    <button
                      onClick={() => removeSkillCategory(catIndex)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors mt-6"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {skillCat.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center gap-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-1">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => updateSkillInCategory(catIndex, skillIndex, e.target.value)}
                            className="bg-transparent text-white focus:outline-none w-24"
                            placeholder="Skill"
                          />
                          <button
                            onClick={() => removeSkillFromCategory(catIndex, skillIndex)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addSkillToCategory(catIndex)}
                        className="px-3 py-1 border border-dashed border-dark-border rounded-lg text-gray-400 hover:border-accent hover:text-accent transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addSkillCategory} className="w-full justify-center">
                <Plus className="w-4 h-4 mr-2" /> Add Skill Category
              </Button>
            </div>
          )}
        </motion.div>

        {/* Certifications Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <SectionHeader section="certifications" icon={Award} title="Certifications" count={resumeData.certifications.length} />
          {expandedSections.has('certifications') && (
            <div className="mt-4 space-y-4">
              {resumeData.certifications.map((cert, certIndex) => (
                <div key={cert.id} className="p-6 bg-dark-card rounded-xl border border-dark-border space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-medium">Certification #{certIndex + 1}</h3>
                    <button
                      onClick={() => removeCertification(certIndex)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Certification Name</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(certIndex, 'name', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="Adobe Certified Expert"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Issuing Organization</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(certIndex, 'issuer', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="Adobe"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Date Issued</label>
                      <input
                        type="text"
                        value={cert.date}
                        onChange={(e) => updateCertification(certIndex, 'date', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="Jan 2023"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Credential ID (optional)</label>
                      <input
                        type="text"
                        value={cert.credential_id || ''}
                        onChange={(e) => updateCertification(certIndex, 'credential_id', e.target.value)}
                        className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                        placeholder="ABC123XYZ"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Certificate URL (optional)</label>
                    <input
                      type="url"
                      value={cert.url || ''}
                      onChange={(e) => updateCertification(certIndex, 'url', e.target.value)}
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                      placeholder="https://credential.net/..."
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addCertification} className="w-full justify-center">
                <Plus className="w-4 h-4 mr-2" /> Add Certification
              </Button>
            </div>
          )}
        </motion.div>

        {/* Languages Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <SectionHeader section="languages" icon={Languages} title="Languages" count={resumeData.languages.length} />
          {expandedSections.has('languages') && (
            <div className="mt-4 space-y-4">
              {resumeData.languages.map((lang, langIndex) => (
                <div key={lang.id} className="p-4 bg-dark-card rounded-xl border border-dark-border flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={lang.name}
                      onChange={(e) => updateLanguage(langIndex, 'name', e.target.value)}
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                      placeholder="Language name"
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={lang.proficiency}
                      onChange={(e) => updateLanguage(langIndex, 'proficiency', e.target.value)}
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-accent focus:outline-none"
                    >
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Basic">Basic</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeLanguage(langIndex)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <Button variant="outline" onClick={addLanguage} className="w-full justify-center">
                <Plus className="w-4 h-4 mr-2" /> Add Language
              </Button>
            </div>
          )}
        </motion.div>

        {/* Save Button (bottom) */}
        <div className="pt-8 pb-16">
          <Button onClick={handleSave} disabled={saving} className="w-full justify-center py-3">
            {saving ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            {saving ? 'Saving Resume...' : 'Save Resume'}
          </Button>
        </div>
      </main>
    </div>
  )
}
