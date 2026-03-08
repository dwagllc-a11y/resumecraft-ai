import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { freelancerName, skill, targetIndustry, portfolio, uniqueValue } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1200,
      messages: [{ role: 'user', content: `Generate 5 cold pitch emails for ${freelancerName}, a ${skill} freelancer targeting ${targetIndustry} companies. Portfolio highlights: ${portfolio}. Unique value: ${uniqueValue}. Return JSON with array "pitches", each with subject, body, approach (strategy name). Make each pitch use a different angle: pain point, results-led, referral, compliment, research-led. JSON only.` }]
    })
    const clean = msg.content[0].text.replace(/\`\`\`json|\`\`\`/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
