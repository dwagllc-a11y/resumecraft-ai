import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, school, major, year, skills, goals, experience } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 800,
      messages: [{ role: 'user', content: `Optimize a LinkedIn profile for ${name}, a ${year} student studying ${major} at ${school}. Skills: ${skills}. Career goals: ${goals}. Experience: ${experience}. Return JSON with: headline (string), about (string, 3 paragraphs), skills (top 10 array), tips (3 action items). JSON only, no markdown.` }]
    })
    const clean = msg.content[0].text.replace(/\`\`\`json|\`\`\`/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
