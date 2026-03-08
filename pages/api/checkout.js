import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { formData } = req.body
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const priceCents = parseInt(process.env.RESUME_PRICE_CENTS || '1699')

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'ResuméCraft AI — Professional Resume',
            description: 'AI-generated, ATS-optimized resume. Instant download.',
          },
          unit_amount: priceCents,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${appUrl}/builder?session_id={CHECKOUT_SESSION_ID}&paid=true`,
      cancel_url: `${appUrl}/builder?cancelled=true`,
      metadata: {
        formData: JSON.stringify(formData).slice(0, 500), // Stripe metadata limit
      },
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
