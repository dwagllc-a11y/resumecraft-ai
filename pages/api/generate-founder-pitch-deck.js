import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { startupName, problem, solution, market, traction, businessModel, team, ask } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 2000,
      messages: [{ role: 'user', content: `Create a pitch deck outline for ${startupName}. Problem: ${problem}. Solution: ${solution}. Market: ${market}. Traction: ${traction}. Business model: ${businessModel}. Team: ${team}. Ask: ${ask}. Return JSON with slides array, each having: slideNumber, title, keyMessage (1 sentence), bulletPoints (array), speakerNotes (2-3 sentences), designTip (string). Include: Title, Problem, Solution, Market Size, Product, Traction, Business Model, Go-to-Market, Team, Financials, Ask slides. JSON only.` }]
    })
    const clean = msg.content[0].text.replace(/\`\`\`json|\`\`\`/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
