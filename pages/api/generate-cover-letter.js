import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, role, company, experience, whyCompany, tone } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1000,
      messages: [{ role: 'user', content: `Write a compelling cover letter for ${name} applying for ${role} at ${company}. Their experience: ${experience}. Why they want this company: ${whyCompany}. Tone: ${tone || 'professional'}. Format as a proper letter with date, greeting, 3 strong paragraphs, and closing. Make it specific, not generic.` }]
    })
    res.status(200).json({ letter: msg.content[0].text })
  } catch (err) { res.status(500).json({ error: err.message }) }
}
