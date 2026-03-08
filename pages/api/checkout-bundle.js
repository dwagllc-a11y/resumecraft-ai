import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'CareerCraft AI — Complete Bundle',
              description: 'All 4 tools: AI Resume Builder + LinkedIn Optimizer + Interview Coach + Salary Negotiation Scripts',
            },
            unit_amount: 4999, // $49.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/bundle-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/?cancelled=true`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
