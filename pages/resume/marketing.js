import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function NichePage() {
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {}
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>AI Resume Builder for Marketing Professionals — CareerCraft AI</title>
        <meta name="description" content="AI resume builder for marketing professionals. Create a results-driven marketing resume optimized for ATS and hiring managers." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>
        <nav style={{ padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/builder" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← Resume Builder</Link>
        </nav>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 20px 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📈</div>
            <h1 style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.04em', marginBottom: '16px' }}>Land Your Next Marketing Role with a Results-Driven Resume</h1>
            <p style={{ fontSize: '16px', color: '#8a8070', maxWidth: '500px', margin: '0 auto 32px', lineHeight: '1.7' }}>AI-optimized resumes for marketers — built around campaigns, metrics, and growth results.</p>
            <button onClick={handleStart} disabled={loading} style={{ background: 'linear-gradient(135deg, #e879f9, #e879f9bb)', color: '#0d0f1a', border: 'none', borderRadius: '12px', padding: '16px 40px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit' }}>
              {loading ? 'Loading...' : `📈 Build My Resume — $12.99`}
            </button>
            <div style={{ fontSize: '12px', color: '#4a4535', marginTop: '8px' }}>One-time payment · Instant result · No subscription</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid #e879f933`, borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#e879f9', marginBottom: '16px' }}>Built specifically for this role</h2>
            <ul style={{ paddingLeft: '20px', margin: 0, lineHeight: '1.8' }}>
              <li style={{ marginBottom: "8px", color: "#c0b898" }}>{"Structures campaign results, ROAS, CAC, and growth metrics the way hiring managers want"}</li>
              <li style={{ marginBottom: "8px", color: "#c0b898" }}>{"Works for brand, performance, content, product marketing, and CMO roles"}</li>
              <li style={{ marginBottom: "8px", color: "#c0b898" }}>{"Highlights tools: HubSpot, Salesforce, Google Ads, Meta, and more"}</li>
              <li style={{ marginBottom: "8px", color: "#c0b898" }}>{"Tailored for agencies, SaaS companies, and consumer brands"}</li>
            </ul>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '40px', textAlign: 'center' }}>
            {[['2 min', 'To generate'], ['ATS', 'Optimized'], ['$12.99', 'One time']].map(([stat, label]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: '#e879f9' }}>{stat}</div>
                <div style={{ fontSize: '11px', color: '#6a6055', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={handleStart} disabled={loading} style={{ background: 'linear-gradient(135deg, #e879f9, #e879f9bb)', color: '#0d0f1a', border: 'none', borderRadius: '12px', padding: '14px 36px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '12px' }}>
              {loading ? 'Loading...' : 'Get My Resume Now'}
            </button>
            <div style={{ fontSize: '12px', color: '#4a4535' }}>Powered by Claude AI · Secure checkout by Stripe</div>
          </div>
        </div>
      </div>
    </>
  )
}
