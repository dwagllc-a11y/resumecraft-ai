import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { freelancerName, skill, clientName, projectDesc, rate, paymentTerms, revisions } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1500,
      messages: [{ role: 'user', content: `Draft a professional freelance contract between ${freelancerName} (contractor) and ${clientName} (client) for: ${projectDesc}. Rate: ${rate}. Payment terms: ${paymentTerms}. Revisions allowed: ${revisions}. Include: scope of work, deliverables, timeline, payment schedule, revision policy, IP ownership, confidentiality, termination clause, dispute resolution. Make it professional but clear, not overly legal. Note this is a template not legal advice.` }]
    })
    res.status(200).json({ output: msg.content[0].text })
  } catch (err) { res.status(500).json({ error: err.message }) }
}
