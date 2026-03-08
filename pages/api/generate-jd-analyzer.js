import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { jobDescription, currentResume, targetRole } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1500,
      messages: [{ role: 'user', content: `Analyze this job description and provide a JSON response with these fields: matchScore (0-100), keySkillsRequired (array), missingFromResume (array), resumeTweaks (array of specific bullet changes), keywordsToAdd (array), interviewTopics (array of likely interview topics), redFlags (array of concerns), coverLetterAngle (string - best angle to take). Job Description: ${jobDescription}. Current Resume Summary: ${currentResume || 'Not provided'}. Respond ONLY with valid JSON, no markdown.` }]
    })
    const clean = msg.content[0].text.replace(/```json|```/g, '').trim()
    res.status(200).json(JSON.parse(clean))
  } catch (err) { res.status(500).json({ error: err.message }) }
}
