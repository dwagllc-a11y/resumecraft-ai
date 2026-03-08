const BASE = 'https://careercraft.careers'

const pages = [
  '', '/careers', '/students', '/freelance', '/founders',
  '/builder', '/linkedin', '/interview', '/salary', '/cover-letter',
  '/jd-analyzer', '/reference-letter', '/cold-email', '/90-day-plan', '/career-change',
  '/students/personal-statement', '/students/scholarship-essay',
  '/students/internship-cover-letter', '/students/linkedin-student', '/students/study-plan',
  '/freelance/proposal', '/freelance/client-email', '/freelance/rate-negotiation',
  '/freelance/contract-template', '/freelance/cold-pitch',
  '/founders/pitch-deck', '/founders/investor-email', '/founders/yc-essay',
  '/founders/one-pager', '/founders/cold-outreach',
  '/resume/nurse', '/resume/software-engineer', '/resume/mba',
  '/resume/teacher', '/resume/marketing', '/resume/sales', '/resume/executive',
  '/resume/entry-level', '/resume/remote', '/resume/career-change-resume',
  '/resume/product-manager', '/resume/data-scientist',
  '/resume/finance', '/resume/designer', '/resume/healthcare',
  '/blog', '/reviews', '/free-resume-checklist',
  '/blog/how-to-write-a-resume-2024', '/blog/salary-negotiation-scripts',
  '/blog/how-to-get-a-job-with-no-experience', '/blog/best-cover-letter-tips',
  '/blog/how-to-optimize-linkedin-profile', '/blog/how-to-prepare-for-job-interview',
  '/blog/how-to-write-cold-email-recruiter', '/blog/ats-resume-tips',
  '/blog/how-to-change-careers', '/blog/freelance-proposal-tips',
]

function generateSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${BASE}${p}</loc>
    <changefreq>${p === '' ? 'daily' : p.includes('/blog') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${p === '' ? '1.0' : p.includes('/blog') ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`
}

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.status(200).send(generateSitemap())
}
