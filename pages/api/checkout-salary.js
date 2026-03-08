import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'NegotiateAI — Salary Negotiation Script Package',
            description: 'Personalized scripts, market analysis, objection handlers, BATNA strategy & beyond-salary perks guide.',
          },
          unit_amount: 1699, // $16.99
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${appUrl}/salary?session_id={CHECKOUT_SESSION_ID}&paid=true`,
      cancel_url: `${appUrl}/salary?cancelled=true`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
