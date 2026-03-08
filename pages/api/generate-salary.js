import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM = `You are a world-class salary negotiation coach who has helped thousands of professionals negotiate higher compensation. You combine data-driven market analysis with proven psychological negotiation tactics.

Return ONLY valid JSON, no markdown, no backticks, no preamble.

Return this exact structure:
{
  "leverageScore": <1-10 integer based on their situation, experience, competing offers>,
  "strategy": "<one word: Confident / Collaborative / Assertive / Patient>",
  "targetSalary": "<their target or your recommended target with $ sign>",
  "acceptableFloor": "<minimum acceptable with $ sign>",
  "walkAway": "<absolute walk-away point with $ sign>",
  "marketContext": "<2-3 sentences on market rates for this role/industry and how their ask compares. Be specific with numbers where possible.>",
  "scripts": [
    {
      "icon": "🤝",
      "title": "Opening the Negotiation",
      "script": "<word-for-word opening script, 3-5 sentences, enthusiastic but firm>",
      "tip": "<one coaching tip for delivery>"
    },
    {
      "icon": "💪",
      "title": "Making the Counter",
      "script": "<word-for-word counter script using their specific numbers, anchor high>",
      "tip": "<one coaching tip>"
    },
    {
      "icon": "✉️",
      "title": "Follow-Up Email Version",
      "script": "<professional email version of the negotiation, 4-6 sentences>",
      "tip": "<tip on timing/sending>"
    },
    {
      "icon": "🤝",
      "title": "Closing / Acceptance Script",
      "script": "<graceful closing script whether they get what they want or reach a compromise>",
      "tip": "<tip on closing>"
    }
  ],
  "objections": [
    {
      "objection": "That's above our budget / salary band",
      "response": "<confident, specific response using their details>"
    },
    {
      "objection": "We need to check with HR / the team",
      "response": "<response that keeps momentum>"
    },
    {
      "objection": "We can revisit this in 6 months",
      "response": "<response that pushes for now>"
    }
  ],
  "batna": "<2-3 sentences explaining their best alternative and how to use it as leverage without being threatening>",
  "beyondSalary": "<2-3 sentences on what else to negotiate if base salary is stuck>",
  "perks": ["Signing bonus", "Remote work", "Extra PTO", "Equity / RSUs", "Professional development budget", "Title upgrade", "Early performance review"]
}

Make all scripts personal, specific to their role and numbers. Never be generic.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { formData: f } = req.body
  if (!f) return res.status(400).json({ error: 'Missing form data' })

  const situationMap = {
    new_offer: 'negotiating a new job offer',
    raise: 'asking for a raise or promotion',
    counter: 'responding to a counter offer',
    annual: 'preparing for an annual review',
  }

  const prompt = `Generate a salary negotiation package for:

SITUATION: ${situationMap[f.situation] || f.situation}
ROLE: ${f.role || 'Not specified'}
COMPANY: ${f.company || 'Not specified'}
INDUSTRY: ${f.industry || 'Not specified'}
YEARS OF EXPERIENCE: ${f.yearsExp || 'Not specified'}
CURRENT SALARY: ${f.currentSalary || 'Not provided'}
OFFERED / CURRENT COMP: ${f.offeredSalary || 'Not provided'}
TARGET SALARY: ${f.targetSalary || 'Not specified'}
URGENCY: ${f.urgency || 'moderate'}
KEY ACHIEVEMENTS: ${f.achievements || 'Not provided'}
COMPETING OFFERS / ALTERNATIVES: ${f.competing || 'None mentioned'}

Generate a complete, personalized negotiation package as JSON.`

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-20250514',
      max_tokens: 2000,
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    })

    const result = message.content[0].text
    res.status(200).json({ result })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to generate script' })
  }
}
