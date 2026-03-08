import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { formData: f } = req.body
  if (!f) return res.status(400).json({ error: 'Missing form data' })

  const num = parseInt(f.numQuestions) || 8

  const prompt = `Generate exactly ${num} interview questions for a ${f.role} position${f.company ? ` at ${f.company}` : ''}.

Focus: ${f.focus} questions
Candidate experience: ${f.experience || 'not specified'}
${f.jobDesc ? `Job description:\n${f.jobDesc.slice(0, 1000)}` : ''}

Rules:
- Return ONLY a JSON array of ${num} question strings
- No numbering, no preamble, no explanation
- Questions should be realistic, specific, and appropriately challenging
- Mix difficulty levels
- For Behavioral: use STAR-method prompts ("Tell me about a time...")
- For Technical: role-specific technical scenarios
- For Leadership: team and influence questions
- For Situational: hypothetical workplace scenarios
- For Culture Fit: values and working style questions

Return format: ["question 1", "question 2", ...]`

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].text.replace(/```json|```/g, '').trim()
    const questions = JSON.parse(text)
    res.status(200).json({ questions })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to generate questions' })
  }
}
