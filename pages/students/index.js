import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'

const tools = [
  { emoji: '🎓', title: 'Personal Statement Writer', desc: 'Stand-out college application essays that admissions officers remember.', price: '$16.99', href: '/students/personal-statement', color: '#818cf8' },
  { emoji: '🏆', title: 'Scholarship Essay Generator', desc: 'Winning essays tailored to each scholarship prompt.', price: '$16.99', href: '/students/scholarship-essay', color: '#f59e0b' },
  { emoji: '📋', title: 'Internship Cover Letter', desc: 'Land your first internship with a punchy, confident cover letter.', price: '$16.99', href: '/students/internship-cover-letter', color: '#34d399' },
  { emoji: '💼', title: 'Student LinkedIn Optimizer', desc: 'Build a recruiter-ready LinkedIn profile before you graduate.', price: '$16.99', href: '/students/linkedin-student', color: '#60a5fa' },
  { emoji: '📅', title: 'Study & Career Plan', desc: 'A personalized roadmap from freshman year to dream job.', price: '$16.99', href: '/students/study-plan', color: '#f472b6' },
]

export default function Students() {

  const [bundleLoading, setBundleLoading] = useState(false)
  const [bundleError, setBundleError] = useState('')
  const handleBundle = async () => {
    setBundleLoading(true); setBundleError('')
    try {
      const res = await fetch('/api/checkout-bundle-student', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setBundleError(data.error || 'Could not start checkout.')
    } catch { setBundleError('Something went wrong.') }
    setBundleLoading(false)
  }

  return (
    <>
      <Head><title>StudentCraft AI — College & Career Tools</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" /></Head>
      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>
        <nav style={{ padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← All Verticals</Link>
        </nav>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 20px 48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.3)', borderRadius: '20px', padding: '5px 16px', fontSize: '11px', color: '#818cf8', letterSpacing: '0.12em', fontWeight: '700', marginBottom: '24px' }}>STUDENTCRAFT AI</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.04em', marginBottom: '16px' }}>
            Get Into Your Dream School<br /><span style={{ color: '#818cf8' }}>& Land Your First Job</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#8a8070', maxWidth: '460px', margin: '0 auto 44px', lineHeight: '1.7' }}>
            AI tools built for students — from application essays to landing your first internship.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', textAlign: 'left', marginBottom: '32px' }}>
            {tools.map(t => (
              <div key={t.href} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.color}33`, borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{t.emoji}</div>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: t.color, marginBottom: '8px' }}>{t.title}</h2>
                <p style={{ fontSize: '13px', color: '#8a8070', lineHeight: '1.6', flex: 1, marginBottom: '16px' }}>{t.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: t.color }}>{t.price}</div>
                  <Link href={t.href} style={{ background: t.color, color: '#0d0f1a', padding: '8px 16px', borderRadius: '7px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>Get Started</Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(135deg, rgba(129,140,248,0.12), rgba(129,140,248,0.04))', border: `1px solid #818cf855`, borderRadius: '16px', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#818cf8', fontWeight: '800', letterSpacing: '0.1em', marginBottom: '4px' }}>STUDENTCRAFT BUNDLE</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#f0ece0', marginBottom: '2px' }}>All 5 Student Tools</div>
              <div style={{ fontSize: '12px', color: '#6a6055' }}>Save $7.96 vs buying individually</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#4a4040', textDecoration: 'line-through' }}>$37.95</div>
                <div style={{ fontSize: '28px', fontWeight: '900', color: '#818cf8', lineHeight: 1 }}>$29.99</div>
              </div>
              <div>
                <button onClick={handleBundle} disabled={bundleLoading} style={{ background: '#818cf8', color: '#0d0f1a', border: 'none', borderRadius: '10px', padding: '12px 22px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit', display: 'block', marginBottom: '4px' }}>{bundleLoading ? 'Redirecting...' : 'Get Bundle'}</button>
                {bundleError && <div style={{ fontSize: '11px', color: '#ef4444' }}>{bundleError}</div>}
              </div>
            </div>
          </div>
          <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← See all CareerCraft AI tools</Link>
        </div>
      </div>
    </>
  )
}
