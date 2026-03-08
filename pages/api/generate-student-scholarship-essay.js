import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, scholarshipName, prompt, background, financialNeed, goals, wordLimit } = req.body
  try {
    const msg = await client.messages.create({
      model: 'claude-opus-4-20250514', max_tokens: 1000,
      messages: [{ role: 'user', content: `Write a winning scholarship essay for ${name} applying for the ${scholarshipName} scholarship. Prompt: "${prompt}". Background: ${background}. Financial need context: ${financialNeed}. Future goals: ${goals}. Word limit: ${wordLimit || '500'} words. Be heartfelt, specific, and show genuine need and ambition.` }]
    })
    res.status(200).json({ output: msg.content[0].text })
  } catch (err) { res.status(500).json({ error: err.message }) }
}
