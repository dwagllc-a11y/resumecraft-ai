import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are an expert resume writer and career coach. Generate a polished, ATS-optimized resume in clean HTML format.

Rules:
- Return ONLY valid HTML (no markdown, no backticks, no preamble, no explanation)
- Use inline styles only
- Professional, clean, modern single-column layout
- Font: Georgia for body, Arial for headings
- Colors: #1a2744 for headings, #333 for body
- Include all provided sections: Summary, Experience, Education, Skills
- Bullet points must be achievement-focused with metrics where possible
- ATS-friendly: no tables, no columns, no images
- Wrap in a <div> with max-width:750px, margin:0 auto, padding:40px, font-size:14px, line-height:1.6, font-family:Georgia,serif`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { formData } = req.body

  if (!formData) return res.status(400).json({ error: 'Missing form data' })

  const prompt = `Build a professional resume for:

NAME: ${formData.name}
EMAIL: ${formData.email} | PHONE: ${formData.phone} | LOCATION: ${formData.location}${formData.linkedin ? ` | LINKEDIN: ${formData.linkedin}` : ''}
TARGET ROLE: ${formData.jobTitle}

PROFESSIONAL SUMMARY:
${formData.summary}

WORK EXPERIENCE:
${formData.experience.map((e, i) => `${i + 1}. ${e.role} at ${e.company} (${e.dates})\n   Achievements: ${e.bullets}`).join('\n\n')}

EDUCATION:
${formData.education}

SKILLS:
${formData.skills}

${formData.certifications ? `CERTIFICATIONS:\n${formData.certifications}` : ''}

Generate the complete resume as clean HTML with inline styles only.`

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })

    const html = message.content[0].text
    res.status(200).json({ html })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to generate resume' })
  }
}
