import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { startupName, problem, solution, traction, team, whyYou, market } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1500,
      messages: [{ role: 'user', content: `Write YC application essay answers for ${startupName}. Problem: ${problem}. Solution: ${solution}. Traction: ${traction}. Team: ${team}. Why this team: ${whyYou}. Market: ${market}. Return JSON with answers to these YC questions: describeYourCompany (60 words max), problem (120 words max), solution (120 words max), traction (120 words max), whyYou (120 words max), marketSize (60 words max). Be specific, use numbers, sound like a founder not a marketer. JSON only.` }]
    })
    const clean = msg.content[0].text.replace(/\`\`\`json|\`\`\`/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
