import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { session_id } = req.body

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (session.payment_status === 'paid') {
      return res.status(200).json({ paid: true })
    }

    return res.status(200).json({ paid: false })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}
