import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const { formData } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'InterviewOS — AI Interview Coaching Session',
            description: `${formData?.numQuestions || 8} tailored questions, scored answers, detailed feedback & ideal answer frameworks.`,
          },
          unit_amount: 1299, // $12.99
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${appUrl}/interview?session_id={CHECKOUT_SESSION_ID}&paid=true`,
      cancel_url: `${appUrl}/interview?cancelled=true`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
