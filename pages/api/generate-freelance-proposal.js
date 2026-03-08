import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { freelancerName, skill, clientName, projectDesc, budget, timeline, uniqueValue } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1000,
      messages: [{ role: 'user', content: `Write a winning freelance proposal from ${freelancerName} (${skill}) to ${clientName} for: ${projectDesc}. Budget: ${budget}. Timeline: ${timeline}. Unique value: ${uniqueValue}. Structure: hook, understanding of their problem, proposed approach, deliverables, timeline, price, CTA. Make it feel personal not templated.` }]
    })
    res.status(200).json({ output: msg.content[0].text })
  } catch (err) { res.status(500).json({ error: err.message }) }
}
