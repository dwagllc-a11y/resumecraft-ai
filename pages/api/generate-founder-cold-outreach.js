import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { founderName, startupName, targetType, purpose, background } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1200,
      messages: [{ role: 'user', content: `Generate 5 cold outreach scripts for ${founderName}, founder of ${startupName}, targeting ${targetType} for: ${purpose}. Founder background: ${background}. Return JSON with array "scripts", each with: platform (email/LinkedIn/Twitter), subject (if email), body, approach. Cover: direct ask, mutual connection, compliment+ask, thought leadership, give-first approaches. Keep each under 100 words. JSON only.` }]
    })
    const clean = msg.content[0].text.replace(/\`\`\`json|\`\`\`/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
