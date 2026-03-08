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

  const verticals = [
    {
      href: '/careers',
      color: '#c8b98a',
      bg: 'rgba(200,185,138,0.06)',
      border: 'rgba(200,185,138,0.25)',
      emoji: '💼',
      brand: 'CAREERCRAFT AI',
      title: 'Job Seekers',
      desc: 'Resume builder, LinkedIn optimizer, interview coach, salary negotiation & more.',
      tools: ['AI Resume Builder', 'LinkedIn Optimizer', 'Interview Coach', 'Salary Negotiation', '+6 more'],
      count: '10 tools',
      from: 'From $16.99',
    },
    {
      href: '/students',
      color: '#818cf8',
      bg: 'rgba(129,140,248,0.06)',
      border: 'rgba(129,140,248,0.25)',
      emoji: '🎓',
      brand: 'STUDENTCRAFT AI',
      title: 'Students',
      desc: 'Personal statements, scholarship essays, internship cover letters & career plans.',
      tools: ['Personal Statement', 'Scholarship Essay', 'Internship Cover Letter', 'LinkedIn for Students', 'Study & Career Plan'],
      count: '5 tools',
      from: 'From $16.99',
    },
    {
      href: '/freelance',
      color: '#f97316',
      bg: 'rgba(249,115,22,0.06)',
      border: 'rgba(249,115,22,0.25)',
      emoji: '🔥',
      brand: 'FREELANCECRAFT AI',
      title: 'Freelancers',
      desc: 'Win clients with proposals, contracts, rate scripts, and cold pitches that convert.',
      tools: ['Project Proposal', 'Client Emails', 'Rate Negotiation', 'Contract Template', 'Cold Pitch Generator'],
      count: '5 tools',
      from: 'From $8.99',
    },
    {
      href: '/founders',
      color: '#a78bfa',
      bg: 'rgba(167,139,250,0.06)',
      border: 'rgba(167,139,250,0.25)',
      emoji: '🚀',
      brand: 'FOUNDERCRAFT AI',
      title: 'Founders',
      desc: 'Pitch decks, investor emails, YC essays, one-pagers and outreach scripts.',
      tools: ['Pitch Deck Outline', 'Investor Cold Emails', 'YC Application Essays', 'Startup One-Pager', 'Cold Outreach Scripts'],
      count: '5 tools',
      from: 'From $16.99',
    },
  ]

  return (
    <>
      <Head>
        <title>CareerCraft AI — AI Tools for Job Seekers, Students, Freelancers & Founders</title>
        <meta name="description" content="25 AI-powered tools across 4 verticals. Resume builder, LinkedIn optimizer, pitch decks, freelance proposals and more." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>

        <nav style={{ padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ fontSize: '18px', fontWeight: '800' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[['Jobs', '/careers', '#c8b98a'], ['Students', '/students', '#818cf8'], ['Freelance', '/freelance', '#f97316'], ['Founders', '/founders', '#a78bfa']].map(([l, h, c]) => (
              <Link key={h} href={h} style={{ color: c, textDecoration: 'none', fontSize: '12px', fontWeight: '600', padding: '6px 12px', border: `1px solid ${c}44`, borderRadius: '6px' }}>{l}</Link>
            ))}
          </div>
        </nav>

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '64px 20px 48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(200,185,138,0.08)', border: '1px solid rgba(200,185,138,0.2)', borderRadius: '20px', padding: '5px 16px', fontSize: '11px', color: '#c8b98a', letterSpacing: '0.12em', fontWeight: '700', marginBottom: '24px' }}>25 AI-POWERED TOOLS · 4 VERTICALS</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 54px)', fontWeight: '800', lineHeight: '1.08', letterSpacing: '-0.04em', marginBottom: '16px' }}>
            The AI Toolkit for<br />
            <span style={{ color: '#c8b98a' }}>Every Career Stage</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#8a8070', maxWidth: '480px', margin: '0 auto 48px', lineHeight: '1.7' }}>
            Whether you're a student, job seeker, freelancer, or founder — we have AI tools built for your exact situation.
          </p>

          {/* Vertical cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', textAlign: 'left', marginBottom: '32px' }}>
            {verticals.map(v => (
              <div key={v.href} style={{ background: v.bg, border: `1px solid ${v.border}`, borderRadius: '20px', padding: '28px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ fontSize: '32px' }}>{v.emoji}</div>
                  <div style={{ fontSize: '10px', color: v.color, fontWeight: '700', background: `${v.color}18`, border: `1px solid ${v.color}33`, borderRadius: '6px', padding: '3px 10px' }}>{v.count}</div>
                </div>
                <div style={{ fontSize: '10px', color: v.color, fontWeight: '700', letterSpacing: '0.1em', marginBottom: '4px' }}>{v.brand}</div>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#f0ece0', marginBottom: '8px' }}>For {v.title}</h2>
                <p style={{ fontSize: '13px', color: '#8a8070', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>{v.desc}</p>
                <div style={{ marginBottom: '18px' }}>
                  {v.tools.map(t => <div key={t} style={{ fontSize: '12px', color: '#6a6055', marginBottom: '3px' }}>{'✓ ' + t}</div>)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '13px', color: v.color, fontWeight: '600' }}>{v.from}</div>
                  <Link href={v.href} style={{ background: v.color, color: '#0d0f1a', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '13px' }}>Explore Tools →</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle */}
          <div style={{ background: 'linear-gradient(135deg, rgba(200,185,138,0.12), rgba(200,185,138,0.04))', border: '1px solid rgba(200,185,138,0.35)', borderRadius: '16px', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '11px', color: '#c8b98a', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '6px' }}>BEST VALUE — JOB SEEKER BUNDLE</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#f0ece0', marginBottom: '4px' }}>All 10 CareerCraft Tools</div>
              <div style={{ fontSize: '13px', color: '#8a8070' }}>Resume + LinkedIn + Interview + Salary + Cover Letter + JD Analyzer + more</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: '#6a6050', textDecoration: 'line-through' }}>$122.90</div>
                <div style={{ fontSize: '34px', fontWeight: '900', color: '#c8b98a', lineHeight: 1 }}>$79.99</div>
                <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: '700' }}>SAVE $43</div>
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
          {[['25', 'AI Tools'], ['4', 'Verticals'], ['Claude AI', 'Powered By']].map(([stat, label]) => (
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
