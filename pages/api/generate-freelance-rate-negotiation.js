import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { freelancerName, skill, currentRate, targetRate, yearsExp, situation } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1200,
      messages: [{ role: 'user', content: `Create rate negotiation scripts for ${freelancerName}, a ${skill} freelancer with ${yearsExp} years experience. Current rate: ${currentRate}. Target rate: ${targetRate}. Situation: ${situation}. Return JSON with: marketContext (string), scripts (array of 4 scripts each with scenario and script), objections (array of 3 with objection and response), emailTemplate (string), tipsToJustifyRate (array). JSON only.` }]
    })
    const clean = msg.content[0].text.replace(/\`\`\`json|\`\`\`/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
