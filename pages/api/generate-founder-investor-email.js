import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { founderName, startupName, problem, traction, ask, targetInvestorType } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1200,
      messages: [{ role: 'user', content: `Generate 5 cold investor emails for ${founderName}, founder of ${startupName}. Problem solved: ${problem}. Traction: ${traction}. Funding ask: ${ask}. Target investor type: ${targetInvestorType}. Return JSON with array "emails", each with subject, body, approach (strategy name e.g. "Traction-led", "Warm intro ask", "Contrarian thesis"). Each email max 150 words. JSON only.` }]
    })
    const clean = msg.content[0].text.replace(/\`\`\`json|\`\`\`/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
