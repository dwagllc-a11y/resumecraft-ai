import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a world-class LinkedIn profile optimizer and personal branding expert. Analyze the user's LinkedIn profile and return a detailed optimization report as a JSON object.

Return ONLY valid JSON with NO markdown, NO backticks, NO preamble. The JSON must have exactly these keys:

{
  "scores": {
    "Headline": <0-100>,
    "About Section": <0-100>,
    "Experience": <0-100>,
    "Skills": <0-100>,
    "Keyword Optimization": <0-100>,
    "Profile Completeness": <0-100>
  },
  "headline": "<rewritten headline, max 220 chars, keyword-rich, value-driven>",
  "headlineReason": "<1-2 sentences explaining why this headline is better>",
  "about": "<full rewritten About section, 3-5 paragraphs, first-person, storytelling, ends with CTA, ~300 words>",
  "aboutTips": "<2-3 practical tips for the About section>",
  "keywords": ["keyword1", "keyword2", ...up to 12 missing keywords they should add],
  "keywordTip": "<one sentence on where/how to add these keywords>",
  "actions": [
    { "title": "<short action title>", "detail": "<1-2 sentence explanation of what to do and why>" },
    ... (5-7 actions total, ordered by impact)
  ],
  "strategy": "<paragraph on connection strategy, posting cadence, engagement tips tailored to their goals>"
}

Be specific, actionable, and personalized to their target role and industry. Use real LinkedIn best practices.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { formData: f } = req.body
  if (!f) return res.status(400).json({ error: 'Missing form data' })

  const prompt = `Optimize this LinkedIn profile:

NAME: ${f.name}
CURRENT HEADLINE: ${f.currentHeadline || 'Not provided'}
CURRENT ABOUT: ${f.currentAbout || 'Not provided'}
EXPERIENCE: ${f.experience || 'Not provided'}
SKILLS: ${f.skills || 'Not provided'}
EDUCATION: ${f.education || 'Not provided'}
TARGET ROLE: ${f.targetRole || 'Not specified'}
TARGET INDUSTRY: ${f.targetIndustry || 'Not specified'}
PRIMARY GOAL: ${f.goals || 'Not specified'}

Generate the full optimization report as JSON.`

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })

    const report = message.content[0].text
    res.status(200).json({ report })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to generate report' })
  }
}
