import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { refereeName, refereeTitle, candidateName, relationship, duration, strengths, achievements, targetRole } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1000,
      messages: [{ role: 'user', content: `Write a strong professional reference letter from ${refereeName} (${refereeTitle}) for ${candidateName}. They worked together for ${duration} as ${relationship}. Key strengths: ${strengths}. Notable achievements: ${achievements}. Target role: ${targetRole}. Make it specific, glowing but credible, 3-4 paragraphs. Format as a formal letter.` }]
    })
    res.status(200).json({ letter: msg.content[0].text })
  } catch (err) { res.status(500).json({ error: err.message }) }
}
