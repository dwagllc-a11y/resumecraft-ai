import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, major, year, targetCareer, currentGPA, strengths, weaknesses, timeline } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1500,
      messages: [{ role: 'user', content: `Create a study and career plan for ${name}, ${year} in ${major}, targeting ${targetCareer}. GPA: ${currentGPA}. Strengths: ${strengths}. Weaknesses: ${weaknesses}. Timeline: ${timeline}. Return JSON with: semesterGoals (array), skillsToLearn (array), certifications (array), internshipStrategy (string), networkingTargets (array), weeklySchedule (object with study/career hours), milestones (array with date and goal). JSON only.` }]
    })
    const clean = msg.content[0].text.replace(/\`\`\`json|\`\`\`/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
