import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'usd', product_data: { name: 'Pitch Deck Outline Generator', description: 'AI-structured investor pitch deck.' }, unit_amount: 2599 }, quantity: 1 }],
      mode: 'payment',
      success_url: `${appUrl}/founders/pitch-deck?session_id={CHECKOUT_SESSION_ID}&paid=true`,
      cancel_url: `${appUrl}/founders/pitch-deck`,
    })
    res.status(200).json({ url: session.url })
  } catch (err) { res.status(500).json({ error: err.message }) }
}
