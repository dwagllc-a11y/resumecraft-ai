import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, targetSchool, major, background, achievements, whyMajor, personalStory } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1200,
      messages: [{ role: 'user', content: `Write a compelling college personal statement for ${name} applying to ${targetSchool} for ${major}. Background: ${background}. Key achievements: ${achievements}. Why this major: ${whyMajor}. Personal story/hook: ${personalStory}. Make it vivid, personal, specific — not generic. ~650 words. Show don't tell.` }]
    })
    res.status(200).json({ output: msg.content[0].text })
  } catch (err) { res.status(500).json({ error: err.message }) }
}
