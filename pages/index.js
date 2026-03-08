import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [bundleLoading, setBundleLoading] = useState(false)
  const [bundleError, setBundleError] = useState('')

  const handleBundle = async () => {
    setBundleLoading(true); setBundleError('')
    try {
      const res = await fetch('/api/checkout-bundle', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setBundleError(data.error || 'Could not start checkout.')
    } catch { setBundleError('Something went wrong.') }
    setBundleLoading(false)
  }

  const products = [
    { emoji: '📄', brand: 'RESUMECRAFT AI', title: 'AI Resume Builder', desc: 'ATS-optimized resume in 2 minutes.', price: '$9.99', href: '/builder', brandColor: '#c8b98a', btnBg: 'linear-gradient(135deg, #c8b98a, #a8965a)', btnColor: '#1a1208', cardBorder: 'rgba(200,185,138,0.25)', cardBg: 'rgba(255,255,255,0.04)' },
    { emoji: '💼', brand: 'PROFILEPULSE AI', title: 'LinkedIn Optimizer', desc: 'Full profile score, rewritten headline & keywords.', price: '$7.99', href: '/linkedin', brandColor: '#60a5fa', btnBg: 'linear-gradient(135deg, #0a66c2, #0856a8)', btnColor: '#fff', cardBorder: 'rgba(10,102,194,0.3)', cardBg: 'rgba(10,102,194,0.08)' },
    { emoji: '🎯', brand: 'INTERVIEWOS', title: 'AI Interview Coach', desc: 'Practice with AI, get scored & feedback.', price: '$12.99', href: '/interview', brandColor: '#22c55e', btnBg: 'linear-gradient(135deg, #22c55e, #16a34a)', btnColor: '#020f02', cardBorder: 'rgba(34,197,94,0.2)', cardBg: 'rgba(34,197,94,0.05)' },
    { emoji: '💰', brand: 'NEGOTIATEAI', title: 'Salary Negotiation Scripts', desc: 'Word-for-word scripts & BATNA strategy.', price: '$9.99', href: '/salary', brandColor: '#f0d080', btnBg: 'linear-gradient(135deg, #c9a84c, #a8843a)', btnColor: '#0b1437', cardBorder: 'rgba(201,168,76,0.25)', cardBg: 'rgba(201,168,76,0.06)' },
    { emoji: '✉️', brand: 'COVER LETTER AI', title: 'Cover Letter Generator', desc: 'Tailored, compelling cover letters in seconds.', price: '$7.99', href: '/cover-letter', brandColor: '#c8b98a', btnBg: 'linear-gradient(135deg, #c8b98a, #a8965a)', btnColor: '#1a1208', cardBorder: 'rgba(200,185,138,0.25)', cardBg: 'rgba(255,255,255,0.04)' },
    { emoji: '🔍', brand: 'JD ANALYZER', title: 'Job Description Analyzer', desc: 'Match score, resume tweaks & interview topics.', price: '$6.99', href: '/jd-analyzer', brandColor: '#60a5fa', btnBg: 'linear-gradient(135deg, #60a5fa, #3b82f6)', btnColor: '#fff', cardBorder: 'rgba(96,165,250,0.25)', cardBg: 'rgba(96,165,250,0.05)' },
    { emoji: '📝', brand: 'REFERENCE AI', title: 'Reference Letter Writer', desc: 'Professional glowing reference letters.', price: '$5.99', href: '/reference-letter', brandColor: '#a78bfa', btnBg: 'linear-gradient(135deg, #a78bfa, #7c3aed)', btnColor: '#fff', cardBorder: 'rgba(167,139,250,0.25)', cardBg: 'rgba(167,139,250,0.05)' },
    { emoji: '📧', brand: 'OUTREACH AI', title: 'Cold Email Generator', desc: '5 personalized emails to reach hiring managers.', price: '$7.99', href: '/cold-email', brandColor: '#f97316', btnBg: 'linear-gradient(135deg, #f97316, #ea580c)', btnColor: '#fff', cardBorder: 'rgba(249,115,22,0.25)', cardBg: 'rgba(249,115,22,0.05)' },
    { emoji: '📅', brand: '30/60/90 AI', title: '30/60/90 Day Plan', desc: 'Impress hiring managers with a detailed action plan.', price: '$9.99', href: '/90-day-plan', brandColor: '#22c55e', btnBg: 'linear-gradient(135deg, #22c55e, #16a34a)', btnColor: '#020f02', cardBorder: 'rgba(34,197,94,0.2)', cardBg: 'rgba(34,197,94,0.05)' },
    { emoji: '🔄', brand: 'PIVOT AI', title: 'Career Change Roadmap', desc: 'Full plan to successfully switch industries.', price: '$14.99', href: '/career-change', brandColor: '#e879f9', btnBg: 'linear-gradient(135deg, #e879f9, #a21caf)', btnColor: '#fff', cardBorder: 'rgba(232,121,249,0.25)', cardBg: 'rgba(232,121,249,0.05)' },
  ]

  return (
    <>
      <Head>
        <title>CareerCraft AI - 10 AI-Powered Career Tools</title>
        <meta name="description" content="10 AI-powered career tools. Resume builder, LinkedIn optimizer, interview coach, salary negotiation, cover letters and more." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>
        <nav style={{ padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ fontSize: '18px', fontWeight: '800' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</div>
          <div style={{ fontSize: '13px', color: '#8a8070' }}>10 AI Career Tools</div>
        </nav>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 20px 48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(200,185,138,0.08)', border: '1px solid rgba(200,185,138,0.2)', borderRadius: '20px', padding: '5px 16px', fontSize: '11px', color: '#c8b98a', letterSpacing: '0.12em', fontWeight: '700', marginBottom: '24px' }}>10 AI-POWERED CAREER TOOLS</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.04em', marginBottom: '16px' }}>
            Land Your Dream Job<br /><span style={{ color: '#c8b98a' }}>Faster Than Everyone Else</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#8a8070', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto 44px' }}>
            Every AI tool you need from application to offer letter — all in one place.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', textAlign: 'left', marginBottom: '28px' }}>
            {products.map((p) => (
              <div key={p.href} style={{ background: p.cardBg, border: `1px solid ${p.cardBorder}`, borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{p.emoji}</div>
                <div style={{ fontSize: '10px', color: p.brandColor, fontWeight: '700', letterSpacing: '0.1em', marginBottom: '4px' }}>{p.brand}</div>
                <h2 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '6px', color: '#f0ece0' }}>{p.title}</h2>
                <p style={{ fontSize: '12px', color: '#8a8070', lineHeight: '1.5', marginBottom: '14px', flex: 1 }}>{p.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: p.brandColor }}>{p.price}</div>
                  <Link href={p.href} style={{ background: p.btnBg, color: p.btnColor, padding: '8px 14px', borderRadius: '7px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>Get Started</Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(135deg, rgba(200,185,138,0.12), rgba(200,185,138,0.06))', border: '1px solid rgba(200,185,138,0.35)', borderRadius: '16px', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: '#c8b98a', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '6px' }}>BEST VALUE</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#f0ece0', marginBottom: '4px' }}>Complete Bundle — All 10 Tools</div>
              <div style={{ fontSize: '13px', color: '#8a8070' }}>Resume + LinkedIn + Interview + Salary + Cover Letter + JD Analyzer + Reference Letter + Cold Email + 90-Day Plan + Career Roadmap</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: '#6a6050', textDecoration: 'line-through' }}>$83.93</div>
                <div style={{ fontSize: '34px', fontWeight: '900', color: '#c8b98a', lineHeight: 1 }}>$59.99</div>
                <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: '700' }}>SAVE $24</div>
              </div>
              <div>
                <button onClick={handleBundle} disabled={bundleLoading} style={{ background: 'linear-gradient(135deg, #c8b98a, #a8965a)', color: '#1a1208', border: 'none', borderRadius: '10px', padding: '13px 28px', fontSize: '14px', fontWeight: '800', cursor: bundleLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: bundleLoading ? 0.7 : 1, display: 'block', marginBottom: '6px' }}>
                  {bundleLoading ? 'Redirecting...' : 'Get Bundle Deal'}
                </button>
                <div style={{ fontSize: '11px', color: '#4a4535', textAlign: 'center' }}>Powered by Stripe</div>
                {bundleError && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px' }}>{bundleError}</div>}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', padding: '32px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap' }}>
          {[['10', 'Career Tools'], ['3,200+', 'Professionals Helped'], ['Claude AI', 'Powered By']].map(([stat, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#c8b98a' }}>{stat}</div>
              <div style={{ fontSize: '11px', color: '#4a4535', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', padding: '18px', color: '#2a2520', fontSize: '11px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {new Date().getFullYear()} CareerCraft AI
        </div>
      </div>
    </>
  )
}
