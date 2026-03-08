import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { currentRole, targetRole, currentIndustry, targetIndustry, experience, timeline, concerns } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 2000,
      messages: [{ role: 'user', content: `Create a career change roadmap for someone moving from ${currentRole} in ${currentIndustry} to ${targetRole} in ${targetIndustry}. Experience: ${experience}. Timeline: ${timeline}. Concerns: ${concerns}. Return JSON with: viabilityScore (0-100), transferableSkills (array), skillGaps (array), roadmap (array of phases, each with phase name, duration, actions array), certifications (array of recommended certs with name and why), networkingTargets (array), salaryExpectation (object with current, target, timeline), pitchStatement (string - how to explain the career change), topEmployers (array of 5 target companies). Respond ONLY with valid JSON.` }]
    })
    const clean = msg.content[0].text.replace(/```json|```/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
