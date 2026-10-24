export interface Project {
  id: string
  title: string
  slug: string
  category: string
  thumbnail: string
  description: string
  tags: string[]
  isFeatured: boolean
  caseStudy?: CaseStudy
  createdAt: string
}

export interface CaseStudy {
  problem: string
  process: string[]
  solution: string
  results: string[]
  images: string[]
}

export interface Experience {
  id: string
  title: string
  company: string
  location?: string
  duration: string
  startDate: string
  endDate: string
  description: string[]
  type: 'full-time' | 'part-time' | 'internship'
}

export interface Skill {
  id: string
  name: string
  icon: string
  category: 'design' | 'tools' | 'other'
  proficiency: number
}

export interface ContactForm {
  name: string
  email: string
  message: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
}

// Resume Types
export interface ResumeData {
  id?: string
  personal_info: PersonalInfo
  summary: string
  experience: ResumeExperience[]
  education: Education[]
  skills: ResumeSkill[]
  certifications: Certification[]
  languages: Language[]
  updated_at?: string
}

export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  portfolio: string
}

export interface ResumeExperience {
  id: string
  job_title: string
  company: string
  location: string
  start_date: string
  end_date: string
  is_current: boolean
  responsibilities: string[]
}

export interface Education {
  id: string
  degree: string
  field_of_study: string
  institution: string
  location: string
  start_date: string
  end_date: string
  gpa?: string
  achievements: string[]
}

export interface ResumeSkill {
  id: string
  category: string
  skills: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  credential_id?: string
  url?: string
}

export interface Language {
  id: string
  name: string
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic'
}
