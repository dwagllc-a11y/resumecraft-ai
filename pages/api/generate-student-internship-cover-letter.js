import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, school, major, year, company, role, skills, whyCompany } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 800,
      messages: [{ role: 'user', content: `Write an internship cover letter for ${name}, a ${year} studying ${major} at ${school}, applying for ${role} at ${company}. Skills: ${skills}. Why this company: ${whyCompany}. Keep it confident, concise, 3 paragraphs. Students often undersell — make this one punchy.` }]
    })
    res.status(200).json({ output: msg.content[0].text })
  } catch (err) { res.status(500).json({ error: err.message }) }
}
