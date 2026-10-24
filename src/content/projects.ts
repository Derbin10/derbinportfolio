import type { Project, ProjectImage } from '@/lib/types'

/**
 * Curated case studies, built from the PDFs and covers in Supabase storage.
 * Slugs match the Supabase `projects` rows. These curated fields win over the
 * row; Supabase-only projects are added automatically (see lib/projects.ts).
 */

const slide = (dir: string, n: number, alt: string, caption?: string): ProjectImage => ({
  src: `/work/${dir}/page-${String(n).padStart(2, '0')}.jpg`,
  alt,
  caption,
  layout: 'full',
  width: 1843,
  height: 1036,
})

const book = (dir: string, count: number, width: number, height: number) => ({
  pages: Array.from({ length: count }, (_, i) => `/work/${dir}/book/p${String(i + 1).padStart(2, '0')}.jpg`),
  width,
  height,
})

const poster = (file: string, alt: string, width: number, height: number, caption?: string): ProjectImage => ({
  src: `/work/tii-expo/${file}.jpg`,
  alt,
  caption,
  layout: 'half',
  width,
  height,
})

export const localProjects: Project[] = [
  // ── Reports (Fedrus Global client work) — shown as flip books ─────────────
  {
    slug: 'tcpl-integrated-annual-report-2025-26',
    title: 'TCPL Packaging — 38th Integrated Annual Report 2025-26',
    client: 'TCPL Packaging Ltd',
    year: '2026',
    category: 'Annual & ESG reports',
    summary: 'A 308-page integrated annual report designed end to end, from the narrative chapters to BRSR, financials and the GRI index.',
    role: ['Report design & layout, at Fedrus Global'],
    deliverables: ['308-page report', 'Infographics & charts', 'BRSR & GRI sections', 'Print-ready files'],
    tags: ['Annual report', 'Editorial', 'Infographics'],
    cover: { src: '/work/tcpl-annual-report/book/p01.jpg', alt: 'Cover of the TCPL Packaging 38th Annual Report 2025-26', width: 796, height: 983 },
    overview:
      'I designed TCPL’s integrated report from concept to print-ready file. The capitals chapters use one colour per capital so a reader always knows where they are, and the client singled out the infographics and design in their feedback.',
    flipbook: book('tcpl-annual-report', 38, 796, 983),
    gallery: [],
    featured: true,
    order: 1,
  },
  {
    slug: 'diageo-india-climate-strategy-action-report-2026',
    title: 'Diageo India — Climate Strategy & Action Report 2026',
    client: 'Diageo India (United Spirits Ltd)',
    year: '2026',
    category: 'Annual & ESG reports',
    summary: 'A 49-page climate report with a cinematic opener for each chapter and data pages built to be scanned.',
    role: ['Report design & layout, at Fedrus Global'],
    deliverables: ['49-page report', 'Chapter openers', 'Data visualisation', 'Print-ready files'],
    tags: ['Sustainability report', 'Editorial', 'Data design'],
    cover: { src: '/work/diageo-climate-report/book/p01.jpg', alt: 'Cover of the Diageo India Climate Strategy and Action Report 2026', width: 734, height: 950 },
    overview:
      'Six chapters, from climate governance to risk management and performance. Each opens on a full-bleed image with a colour that carries through its data pages.',
    flipbook: book('diageo-climate-report', 30, 734, 950),
    gallery: [],
    featured: true,
    order: 2,
  },
  {
    slug: 'diageo-india-esg-reporting-index-fy25-26',
    title: 'Diageo India (USL) — ESG Reporting Index FY25-26',
    client: 'Diageo India (United Spirits Ltd)',
    year: '2026',
    category: 'Annual & ESG reports',
    summary: 'A 90-page ESG index covering GRI and SASB disclosures, with colour-coded sections for economic, environment and social data.',
    role: ['Report design & layout, at Fedrus Global'],
    deliverables: ['90-page index', 'GRI & SASB tables', 'Section system'],
    tags: ['ESG', 'GRI', 'Data design'],
    cover: { src: '/work/diageo-esg-report/book/p01.jpg', alt: 'Cover of the United Spirits Ltd Diageo India ESG reporting index', width: 654, height: 926 },
    overview:
      'Most of this report is tables. A colour per section (economic, environment, social), clear table hierarchy and photographic section openers keep 90 pages of disclosures easy to navigate.',
    flipbook: book('diageo-esg-report', 30, 654, 926),
    gallery: [],
    featured: true,
    order: 3,
  },
  {
    slug: 'tube-products-of-india-expo-collateral',
    title: 'Tube Products of India — expo posters & brochure',
    client: 'Tube Products of India (Murugappa Group)',
    year: '2026',
    category: 'Expo & print',
    summary: 'Six expo posters and an A4 brochure that explain a tube manufacturer’s products, plants and sustainability work at a glance.',
    role: ['Poster & brochure design, at Fedrus Global'],
    deliverables: ['6 expo posters', 'A4 brochure', 'Infographics & maps'],
    tags: ['Expo', 'Print', 'Infographics'],
    cover: { src: '/work/tii-expo/precision-in-motion.jpg', alt: 'Precision in Motion poster showing 16 tube applications in a car', width: 2000, height: 1482 },
    overview:
      'Technical content for a trade-show audience: where TPI’s tubes go in a car or a backhoe, how flat steel becomes a precision tube, and where the plants and customers are. Each poster leads with one picture and one number.',
    gallery: [
      { src: '/work/tii-expo/precision-in-motion.jpg', alt: 'Precision in Motion: 16 precision tube applications in a 4-wheeler', layout: 'full', width: 2000, height: 1482 },
      poster('hydraulic-cylinders', 'Key tube applications in hydraulic cylinders, shown on a JCB backhoe', 2000, 1500),
      poster('manufacturing-locations', 'Map of manufacturing locations in India with plant capacities', 2000, 1482),
      poster('flat-steel-to-tubes', 'From flat steel to precision tubes: nine production stages', 1150, 2000),
      poster('global-presence', 'TPI global customer presence across 20+ countries', 1150, 2000),
      { src: '/work/tii-expo/decarbonization.jpg', alt: 'Decarbonization pillars infographic with impacts and outcomes', layout: 'full', width: 2000, height: 1852 },
      { src: '/work/tii-expo/brochure-1.jpg', alt: 'A4 brochure spread: decarbonization, TII overview and global presence', caption: 'A4 brochure', layout: 'full', width: 2000, height: 1414 },
      { src: '/work/tii-expo/brochure-2.jpg', alt: 'A4 brochure spread: product applications', layout: 'full', width: 2000, height: 1414 },
    ],
    featured: true,
    order: 4,
  },

  // ── Education & retail work ─────────────────────────────────────────────
  {
    slug: 'mascot-identity-design-viby-international-school',
    title: 'VIBY — a mascot family for a growing school brand',
    client: 'VIBY International School',
    year: '2024',
    category: 'Mascot & Identity',
    summary:
      'Five characters built from the letter “O” that gave a preschool franchise something parents remember and children love.',
    role: ['Graphic Designer, Vibrant Education', 'Mascot & brand system'],
    deliverables: ['Mascot family', 'Expression set', 'Admission kit', 'Wall & interior graphics', 'Campaign posters'],
    tags: ['Mascot', 'Character', 'Branding', 'Education'],
    accent: '#e3262b',
    cover: {
      src: '/work/viby/cover.jpg',
      alt: 'VIBY International School mascots — a teal and a red round character — either side of the colourful VIBY wordmark',
      width: 1843,
      height: 1036,
    },
    overview:
      'VIBY International School was opening new franchise branches but had nothing a child would point at or a parent would remember. I designed a family of mascots that grew straight out of the existing logo, then put them to work across admissions, interiors and launch campaigns.',
    challenge: [
      'No memorable brand identity beyond the logo',
      'Low emotional connection with parents',
      'Weak recall on social media and on-site',
    ],
    goals: ['Build trust with parents', 'Create a child-friendly identity', 'Support franchise scalability'],
    process: [
      { title: 'Competitor research', body: 'Audited how preschool brands like Kidzee, EuroKids and Kangaroo Kids use characters — and where they all looked the same.' },
      { title: 'AI-assisted exploration', body: 'Used ChatGPT to widen the research and stress-test ideas, then sketched three distinct mascot routes.' },
      { title: 'The breakthrough', body: 'The “O” of the logo becomes the body, logo colours become the palette, a child’s face and an always-smiling mouth give it warmth.' },
      { title: 'A family, not a mascot', body: 'One character became five with gender, personality and emotion — the introvert, the always-active one, the funny guy — so every child finds one that feels like them.' },
    ],
    outcome: ['Improved parent perception', 'Better admission conversions', 'Positive franchise feedback'],
    takeaway: 'I design brand identities that emotionally influence decisions — not just look good.',
    gallery: [
      { src: '/work/viby/construction.jpg', alt: 'Mascot construction from the logo’s O, colour, eyes and smile', caption: 'Construction — the logo’s “O”, its colour, and a child’s face.', layout: 'full', width: 1843, height: 990 },
      { src: '/work/viby/final-mascot.jpg', alt: 'Final mascot family with personalities: introvert, always active and funny guy', caption: 'One character becomes a family with personalities.', layout: 'full', width: 1843, height: 990 },
      { src: '/work/viby/poster.jpg', alt: 'VIBY Mascot key visual with the mascot family on a hill', caption: 'Launch key visual.', layout: 'half', width: 2917, height: 2917 },
      { src: '/work/viby/models.jpg', alt: 'Door sticker and mascot pose library', caption: 'Pose library and a classroom door sticker.', layout: 'half', width: 1843, height: 990 },
      { src: '/work/viby/admission-form.jpg', alt: 'VIBY admission form cover and inside pages featuring the mascots', caption: 'Admission kit — the first thing a parent holds.', layout: 'full', width: 1843, height: 1036 },
      { src: '/work/viby/application.jpg', alt: 'Mascot on a school bus, coming-soon banner, interior wall and welcome poster', caption: 'Banners, interiors and welcome posters.', layout: 'full', width: 1843, height: 990 },
      { src: '/work/viby/outcome.jpg', alt: 'Outer wall designs and the VIBY theme wall', caption: 'Outer walls and the theme wall at the franchise.', layout: 'full', width: 1843, height: 990 },
    ],
    pdfUrl: '/assets/projects/Mascot_Identity_for_VIBY.pdf',
    featured: true,
    order: 5,
  },
  {
    slug: 'kindergarten-school-book-wrapper-redesign',
    title: 'Thirty book wrappers that kindergarteners actually want to open',
    client: 'VIBY International School',
    year: '',
    category: 'Print & Illustration',
    summary:
      'A full redesign of a monthly kindergarten curriculum — dull, text-heavy covers turned into illustrated mini-stories that other schools went on to adopt.',
    role: ['Lead Graphic & Brand Designer', 'Illustration direction'],
    deliverables: ['30 book wrappers', 'Play Group, LKG & UKG series', 'Character art system'],
    tags: ['Print', 'Illustration', 'Education', 'Packaging'],
    cover: { src: '/work/book-wrapper/cover.jpg', alt: 'School Book Wrapper Redesign title over a dreamy sky with open books flying past a castle', width: 1024, height: 1024 },
    overview:
      'VIBY’s original wrappers used dull colours, tiny cartoon images and text-heavy layouts that failed to catch a child’s eye. With the academic director’s approval, I rebuilt the whole series so every cover reads as a little story rather than administrative packaging.',
    challenge: [
      'Lazy colour palettes and tiny, generic cartoons',
      'Text-heavy layouts that didn’t reflect the school’s progressive approach',
      'No excitement around reading — essential in early-childhood learning',
    ],
    goals: ['Grab young learners’ attention', 'Support each month’s learning objective', 'Look like a product worth selling to other schools'],
    process: [
      { title: 'Research & discovery', body: 'Studied how children perceive visuals, early-learning book design principles and colour psychology.' },
      { title: 'Curriculum alignment', body: 'Worked with the academic director so every wrapper supports that month’s learning objective.' },
      { title: 'Visual exploration', body: 'Iterated characters and compositions, replacing dull palettes with bright, playful, high-contrast colour — inspired by Studio Ghibli’s warmth.' },
      { title: 'System & roll-out', body: 'Built a consistent art system and applied it across the full 30-book series while keeping each cover distinct.' },
    ],
    outcome: ['30 books redesigned', 'Adopted by multiple other schools', 'Expanded my role across academic and marketing design'],
    gallery: [
      slide('book-wrapper', 1, 'Case study title slide with four redesigned book covers and a stack of colourful books'),
      slide('book-wrapper', 4, 'All ten LKG wrappers: All about Me, My Family, Plants, Animal Kingdom and more', 'The LKG series — one story per month.'),
      slide('book-wrapper', 5, 'All ten Play Group wrappers on a bright blue and yellow system', 'The Play Group series.'),
      slide('book-wrapper', 6, 'All ten UKG wrappers built on a star-shaped frame', 'The UKG series.'),
    ],
    featured: true,
    order: 6,
  },
  {
    slug: 'pamphlet-design',
    title: 'ELUNO — a tri-fold that sells eyewear as identity',
    client: 'ELUNO, Mantri Mall',
    year: '2026',
    category: 'Retail Print',
    summary:
      'A premium tri-fold pamphlet for a new eyewear store launch: “Frames are not accessories. They are identity.”',
    role: ['Brand & print design'],
    deliverables: ['A4 roll-fold pamphlet', 'Launch offer concept', 'Print-ready files'],
    tags: ['Print', 'Retail', 'Launch'],
    cover: { src: '/work/eluno-pamphlet/cover.jpg', alt: 'ELUNO tri-fold pamphlet mockups folded on a grey surface', width: 2000, height: 1500 },
    overview:
      'ELUNO opened a store at Mantri Mall and needed one piece of print to pull mall visitors in, introduce the collection and push the launch offer — for a premium 18+ audience who see eyewear as self-expression.',
    challenge: ['Stand out in a high-traffic mall', 'Explain the collection and services in one fold-out', 'Feel premium, not promotional'],
    goals: ['Drive store visits', 'Position ELUNO as the premium eyewear destination in the mall'],
    process: [
      { title: 'Brand pillars', body: 'Identity (“be the one”), premium (clean, minimal, generous white space) and face-first — eyewear as the defining feature.' },
      { title: 'Palette & type', body: 'Black for sophistication, white for clarity and orange as the strategic accent for calls to action. Campton for a consistent premium voice.' },
      { title: 'Information architecture', body: 'Outside spread invites (“Visit us”); inside spread informs — the collection by material, lens technology, the free eye check-up and the offer.' },
      { title: '“Age Reverse” offer', body: 'Your age, reversed, becomes your discount — 29 years old gets 92% off a first frame. A mechanic people remember and share, instead of a forgettable percentage off.' },
    ],
    outcome: ['Print-ready for offset on premium matte stock', 'Clear path from first glance to store visit'],
    gallery: [
      slide('eluno-pamphlet', 8, 'ELUNO outside spread: Designed for uniqueness, Visit us, Frame your identity'),
      slide('eluno-pamphlet', 9, 'ELUNO inside spread: philosophy, the collection, eye check-up and launch offer'),
      slide('eluno-pamphlet', 7, 'Folded and open pamphlet mockups', 'Folded and open — built for display stands and hand distribution.'),
      slide('eluno-pamphlet', 3, 'Design approach slide with identity, premium and face-first pillars'),
    ],
    featured: false,
    order: 7,
  },
  {
    slug: 'youtube-thumbnail-redesign-content-first-visual-strategy-case-study',
    title: 'A thumbnail redesign the creator shared himself',
    client: 'Self-initiated',
    year: '',
    category: 'Thumbnail Design',
    summary:
      'A content-first redesign of a MicroSaaS masterclass thumbnail — publicly acknowledged by the original creator.',
    role: ['Brand & Marketing Designer'],
    deliverables: ['Thumbnail redesign', 'Design rationale'],
    tags: ['YouTube', 'Thumbnail', 'Social'],
    cover: { src: '/work/youtube-thumbnail/cover.jpg', alt: 'Before and after of the MicroSaaS Marketing Masterclass thumbnail', width: 1024, height: 1024 },
    overview:
      'I watched the full video first, then redesigned its thumbnail to signal expertise and substance to entrepreneurs in under two seconds. A learning project, shared openly with full credit to the creator.',
    process: [
      { title: 'Content before design', body: 'A podcast-style talk about MicroSaaS marketing — the value is expert insight, so the thumbnail had to signal authority, not sensationalism.' },
      { title: 'Human expression first', body: 'Authentic faces build trust and capture attention immediately.' },
      { title: 'Mobile-first contrast', body: 'Bold separation so it still reads at feed size on a phone.' },
      { title: 'Minimal type, two-second hierarchy', body: 'Every word earns its place; the eye lands on the most important element first.' },
    ],
    outcome: ['Publicly acknowledged by the creator', 'Validated by real audience response'],
    gallery: [
      slide('youtube-thumbnail', 1, 'Before and after thumbnails on a red studio desk'),
      slide('youtube-thumbnail', 2, 'LinkedIn post where the creator thanked Derbin for the redesign', 'The creator’s public response.'),
      slide('youtube-thumbnail', 6, 'Final MicroSaaS Marketing Masterclass thumbnail'),
      slide('youtube-thumbnail', 5, 'Other thumbnail designs', 'More thumbnails.'),
      slide('youtube-thumbnail', 7, 'Is AI replacing thumbnail designers thumbnail'),
    ],
    featured: false,
    order: 8,
  },
  {
    slug: 'viby-voice-parent-engagement-visual-communication-series',
    title: 'VIBY Voice — a daily conversation with parents',
    client: 'VIBY International School',
    year: '',
    category: 'Social Campaign',
    summary:
      'An always-on visual series of morning wishes, parenting messages and festive posts that kept a school present in parents’ day.',
    role: ['Concept, design & illustration'],
    deliverables: ['Series identity', 'Daily social creatives', 'Festive & special-day posts'],
    tags: ['Social', 'Campaign', 'Education'],
    cover: { src: '/work/viby-voice/cover.jpg', alt: 'VIBY Voice Parents Engagement Program title with social icons', width: 1024, height: 1024 },
    overview:
      'A communication system, not one-off posts: daily wishes, value-based messages and special-day creatives for parents, franchise partners and enquiry audiences — warm illustration, clear messages and the mascots for instant recall.',
    outcome: ['Daily visibility across digital touchpoints', 'Consistent brand voice beyond academics'],
    gallery: [
      slide('viby-voice', 2, 'Grid of VIBY Voice posts: Book smarts vs street smarts, Father’s Day, Play to win'),
      slide('viby-voice', 4, 'Empower your children and Meaning of communication posts'),
      slide('viby-voice', 5, 'No child is unable to learn and Never give up posts'),
      slide('viby-voice', 6, 'Habit of saving and Biggest gift posts'),
      slide('viby-voice', 3, 'Christmas and Hitler at Home posts'),
    ],
    featured: false,
    order: 9,
  },
  {
    slug: 'diploma-in-photography-course-promotion-poster',
    title: 'Diploma in Photography — a cinematic course poster',
    client: 'Bridge Academy',
    year: '',
    category: 'Poster',
    summary:
      'A cinematic promotional poster that makes a six-month photography diploma feel aspirational while keeping every detail easy to find.',
    role: ['Poster design'],
    deliverables: ['Promotional poster', 'Social adaptations'],
    tags: ['Poster', 'Social', 'Education'],
    cover: { src: '/work/photography-poster/cover.jpg', alt: 'Course Promotion Poster title over pink Instagram phone mockups', width: 2000, height: 1500 },
    overview:
      'Aspirational imagery up front, then a clear hierarchy for the facts people need: duration, schedule, mode, timings and twelve specialisations from macro to aerial.',
    gallery: [
      { src: '/work/photography-poster/page-01.jpg', alt: 'Diploma in Photography poster with a photographer holding a camera rig', layout: 'half', width: 952, height: 1190 },
      { src: '/work/photography-poster/cover.jpg', alt: 'The poster shown on Instagram in phone mockups', layout: 'half', width: 2000, height: 1500 },
    ],
    featured: false,
    order: 10,
  },
]
