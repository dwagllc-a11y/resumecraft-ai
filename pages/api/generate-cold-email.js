import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { senderName, senderBackground, targetRole, targetCompany, hiringManagerName, uniqueValue } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1500,
      messages: [{ role: 'user', content: `Generate a JSON response with 5 cold outreach emails for ${senderName} targeting ${targetRole} at ${targetCompany}. Hiring manager: ${hiringManagerName || 'unknown'}. Sender background: ${senderBackground}. Unique value: ${uniqueValue}. Return JSON with array "emails", each having: subject (string), body (string), approach (string - name the strategy e.g. "Mutual connection", "Compliment + ask"). Make each email distinct in approach. Respond ONLY with valid JSON.` }]
    })
    const clean = msg.content[0].text.replace(/```json|```/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
