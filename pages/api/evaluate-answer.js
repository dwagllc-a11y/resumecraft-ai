import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM = `You are an expert interview coach at a top-tier consulting or tech firm. You evaluate candidate interview answers rigorously but fairly.

Return ONLY valid JSON with NO markdown, NO backticks:
{
  "score": <integer 1-10>,
  "feedback": "<2-3 sentences of specific, actionable feedback on what was strong and what could be improved>",
  "ideal": "<2-3 sentences describing the ideal answer framework or key elements a great answer would include>"
}

Scoring guide:
9-10: Exceptional — specific, structured (STAR if behavioral), quantified impact, memorable
7-8: Strong — clear and relevant, mostly well-structured, minor gaps
5-6: Adequate — answers the question but lacks specifics, structure, or impact
3-4: Weak — vague, off-topic, or missing key elements
1-2: Very poor — does not address the question or extremely brief

Be honest. Do not inflate scores. Candidates need real feedback to improve.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { question, answer, role, focus } = req.body
  if (!question || !answer) return res.status(400).json({ error: 'Missing data' })

  const prompt = `Role: ${role || 'professional'}
Question type: ${focus || 'Behavioral'}
Interview question: ${question}
Candidate answer: ${answer}

Evaluate this answer.`

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 500,
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].text.replace(/```json|```/g, '').trim()
    const result = JSON.parse(text)
    res.status(200).json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to evaluate answer' })
  }
}
