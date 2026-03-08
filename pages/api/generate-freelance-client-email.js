import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { freelancerName, skill, situation } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1200,
      messages: [{ role: 'user', content: `Generate 5 professional client email templates for ${freelancerName}, a ${skill} freelancer. Situation context: ${situation}. Create emails for: 1) Following up on a proposal, 2) Requesting feedback/approval, 3) Handling a scope creep situation, 4) Asking for a testimonial, 5) Raising your rates. Return JSON with array "emails", each with subject, body, situation fields. JSON only.` }]
    })
    const clean = msg.content[0].text.replace(/\`\`\`json|\`\`\`/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
