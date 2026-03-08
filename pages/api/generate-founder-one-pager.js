import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { startupName, tagline, problem, solution, market, traction, businessModel, team, ask } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1000,
      messages: [{ role: 'user', content: `Write a crisp investor one-pager for ${startupName}. Tagline: ${tagline}. Problem: ${problem}. Solution: ${solution}. Market: ${market}. Traction: ${traction}. Business model: ${businessModel}. Team: ${team}. Ask: ${ask}. Format as a structured one-pager with clear sections. Every sentence must earn its place. Lead with the most impressive thing.` }]
    })
    res.status(200).json({ output: msg.content[0].text })
  } catch (err) { res.status(500).json({ error: err.message }) }
}
