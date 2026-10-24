export const site = {
  name: 'Derbin Davidraj',
  firstName: 'Derbin',
  role: 'Brand & Marketing Designer',
  specialties: 'Brand Systems · Sales Collateral · Campaign, Event & Motion Design',
  url: 'https://www.derbin.space',
  location: 'Chennai, India',
  locality: 'Chennai',
  status: 'Open to new opportunities · open to relocate',
  email: 'derbin.dr@gmail.com',
  phone: '+91 70100 90509',
  whatsapp: 'https://wa.me/917010090509',
  linkedin: 'https://www.linkedin.com/in/derbin1234/',
  resume: '/assets/DerbinDavidraj_Resume.pdf',
  portrait: '/images/derbin-portrait.jpg',
  description:
    'Derbin Davidraj is a Chennai-based brand & marketing designer with 4+ years building brand systems, pitch decks, annual & ESG reports, LinkedIn campaigns and AI-assisted motion for B2B companies.',
}

/*
 * Copy written with the copywriting + cro skills for two readers: HR screening for a
 * brand/marketing designer, and creative directors judging the work. Every claim comes
 * from the résumé or the project files. Scope is stated exactly: the full brand for
 * Fedrus Global; VIBY's visual system around an existing logo; project work for the rest.
 */
export const hero = {
  eyebrow: 'Brand & Marketing Designer · Chennai',
  headline: 'I design brand systems, reports and campaigns for B2B companies.',
  sub: '4+ years owning design from first concept to print-ready file. Recent work includes the Fedrus Global brand, the TCPL Packaging annual report and Diageo India’s ESG reporting.',
}

export const intro = hero.sub

/** Hard numbers from the résumé, nothing rounded up. */
export const stats = [
  { value: '4+', label: 'Years in brand and marketing design' },
  { value: '2', label: 'Brand systems still in daily use' },
  { value: '3', label: 'Reports for listed companies' },
  { value: '2', label: 'In-house designers trained' },
]

/** Companies Derbin has delivered projects for (not brands he created; see `services` for scope). */
export const clients = [
  'Fedrus Global',
  'TCPL Packaging',
  'Diageo India (USL)',
  'Murugappa Group (TII)',
  'MRF',
  'Ashok Leyland',
  'VIBY International School',
  'ELUNO',
  'Bridge Academy',
]

/** What a hiring team gets. Each card names the proof so the claim can be checked. */
export const services = [
  {
    title: 'Brand identity & guidelines',
    body: 'Logo redesign, colour, typography, brand guidelines and the PowerPoint templates that keep a company on-brand.',
    proof: 'Built the complete Fedrus Global brand, now used company-wide.',
    items: ['Logo redesign', 'Brand guidelines', 'Brand kit', 'PPT masters'],
  },
  {
    title: 'Annual & ESG reports',
    body: 'Long-form reports from first layout to print-ready file, with infographics that make dense data easy to read.',
    proof: 'TCPL Packaging annual report, Diageo India ESG reporting, MRF in progress.',
    items: ['Annual reports', 'ESG & BRSR', 'Infographics'],
  },
  {
    title: 'Visual systems for growing brands',
    body: 'One consistent look across print, interiors, outdoor and social, built around a brand’s existing logo.',
    proof: 'Standardised VIBY International School across books, interiors, banners and marketing.',
    items: ['Design systems', 'Print', 'Interiors & signage'],
  },
  {
    title: 'Campaigns, events & social',
    body: 'Expo posters and brochures, display boards, LinkedIn creatives and short video with AI motion.',
    proof: 'Expo collateral for Murugappa Group (TII); LinkedIn creatives for 3 company pages.',
    items: ['Expo collateral', 'LinkedIn', 'Video & AI motion'],
  },
]

export const process = [
  {
    title: 'Listen',
    body: 'Audience, competitors and the business goal. What should people feel — and what should they do next?',
  },
  {
    title: 'Explore',
    body: 'AI-assisted research and fast concepting to open up several distinct routes, not one safe answer.',
  },
  {
    title: 'Craft',
    body: 'Refine the strongest route by hand — proportion, colour, type and detail until it holds up at every size.',
  },
  {
    title: 'Systemise',
    body: 'Templates, guidelines and automation so the brand stays consistent long after hand-off.',
  },
]

export interface Role {
  title: string
  org: string
  place?: string
  start: string
  end: string
  duration?: string
  note?: string
  points: string[]
  /** Engagements that ran inside this role (freelance clients that overlapped other jobs) */
  children?: Role[]
}

export const experience: Role[] = [
  {
    title: 'Brand & Marketing Designer',
    org: 'Fedrus Global',
    place: 'Chennai',
    start: '02/2026',
    end: 'Present',
    points: [
      'Sole designer for Fedrus Global and its two divisions, Fedrus Automotive Solutions and Fedrus Talent Solutions.',
      'Designed the complete Fedrus brand from scratch — logo redesign, guidelines, typography, letterhead and brand kit, now used company-wide.',
      'Built PowerPoint master templates for both divisions and rebuilt the corporate profile deck.',
      'Design creatives for 3 company LinkedIn pages; automated the content workflow with Claude.',
      'Expo posters for Murugappa Group (TII) and display boards for an Ashok Leyland benchmarking project.',
      'Annual and ESG reports end to end: TCPL Packaging’s 38th Integrated Annual Report, Diageo India (USL) ESG Reporting Index FY25-26, and the MRF Sustainability Report (in progress).',
    ],
  },
  {
    title: 'Graphic Designer',
    org: 'Vibrant Education',
    place: 'Chennai',
    start: '09/2023',
    end: '01/2026',
    duration: '2.4 years',
    points: [
      'Standardised VIBY International School’s look around its existing logo: one design system across books, interiors, franchise branding, banners and marketing.',
      'Designed the Viby Kids mascot, plus the textbooks and their wrappers.',
      'Designed the franchise pitch deck and the website UI.',
      'Owned video end to end — script, shoot, edit and publish.',
      'Trained 2 designers; my templates are still used unchanged across franchise and marketing work.',
    ],
  },
  {
    title: 'Freelance Graphic Designer',
    org: 'Self-employed',
    place: 'Nagercoil',
    start: '02/2022',
    end: '01/2024',
    duration: '2 years',
    note: 'Freelance ran alongside my studio and in-house roles, so these dates overlap.',
    points: [
      'Built a base of 5 repeat clients and handled their full design needs: a medical store (logo, branding, print collateral, medical book), two doctors (clinic branding), a mattress company (logo, collateral) and an interior design firm (banners, outdoor vinyl, name boards, menu cards).',
      'Promotional posters for a local hotel.',
    ],
    children: [
      {
        title: 'Graphic Designer (Part-time)',
        org: 'Raja Studio',
        place: 'Nagercoil',
        start: '08/2022',
        end: '01/2023',
        duration: '6 months',
        points: ['Albums, invitations and print branding.', 'Kept visual consistency across client deliverables on tight timelines.'],
      },
      {
        title: 'Graphic Designer & Video Editor',
        org: 'Pongal Vadai',
        start: '06/2023',
        end: '09/2023',
        duration: '3 months',
        points: ['YouTube thumbnails, social creatives and short-form video edits.'],
      },
    ],
  },
]

export const education = [
  { title: 'B.E. Computer Science', school: 'Anna University', period: '2019 — 2023' },
  { title: 'GenAI Architect Program', school: 'SocialEagle.AI', period: '2025' },
]

export const tools = {
  Design: ['Photoshop', 'Illustrator', 'InDesign', 'PowerPoint', 'Canva', 'Freepik AI'],
  'Video & motion': ['CapCut', 'Google Flow', 'AI motion graphics'],
  'GenAI & automation': ['Claude', 'Claude Code', 'ChatGPT', 'n8n'],
}

/** Tools for the magnetic dock — neutral monograms, not vendor logos. */
export const toolDock = [
  { name: 'Illustrator', short: 'Ai' },
  { name: 'Photoshop', short: 'Ps' },
  { name: 'InDesign', short: 'Id' },
  { name: 'PowerPoint', short: 'Pp' },
  { name: 'Canva', short: 'Cv' },
  { name: 'Freepik AI', short: 'Fp' },
  { name: 'CapCut', short: 'Cc' },
  { name: 'Google Flow', short: 'Gf' },
  { name: 'Claude', short: 'Cl' },
  { name: 'Claude Code', short: '>_' },
  { name: 'ChatGPT', short: 'Gp' },
  { name: 'n8n', short: 'n8' },
]

export const disciplines = [
  'Brand systems',
  'Pitch decks',
  'Annual & ESG reports',
  'LinkedIn creatives',
  'Event collateral',
  'Mascot design',
  'AI motion',
]
