import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { role, company, industry, background, goals } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 2000,
      messages: [{ role: 'user', content: `Create a detailed 30/60/90 day plan for ${role} at ${company} (${industry}). Candidate background: ${background}. Their goals: ${goals}. Return JSON with: day30 (object with theme, goals array, actions array, successMetrics array), day60 (same), day90 (same), quickWins (array of 5 things to do in week 1), questionsToAsk (array of 5 smart questions for the hiring manager), redFlags (array of 3 things to watch out for). Respond ONLY with valid JSON.` }]
    })
    const clean = msg.content[0].text.replace(/```json|```/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
