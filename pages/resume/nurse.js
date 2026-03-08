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
        <title>AI Resume Builder for Nurses — CareerCraft AI</title>
        <meta name="description" content="AI resume builder for nurses. Create an ATS-optimized nursing resume in minutes. Specialized for RN, NP, LPN, and all healthcare roles." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>
        <nav style={{ padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/builder" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← Resume Builder</Link>
        </nav>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 20px 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🏥</div>
            <h1 style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.04em', marginBottom: '16px' }}>Land Your Dream Nursing Job with an AI-Optimized Resume</h1>
            <p style={{ fontSize: '16px', color: '#8a8070', maxWidth: '500px', margin: '0 auto 32px', lineHeight: '1.7' }}>Built specifically for RNs, NPs, and healthcare professionals. ATS-optimized, clinically worded, ready in minutes.</p>
            <button onClick={handleStart} disabled={loading} style={{ background: 'linear-gradient(135deg, #34d399, #34d399bb)', color: '#0d0f1a', border: 'none', borderRadius: '12px', padding: '16px 40px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit' }}>
              {loading ? 'Loading...' : `🏥 Build My Resume — $12.99`}
            </button>
            <div style={{ fontSize: '12px', color: '#4a4535', marginTop: '8px' }}>One-time payment · Instant result · No subscription</div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid #34d39933`, borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#34d399', marginBottom: '16px' }}>Built specifically for this role</h2>
            <ul style={{ paddingLeft: '20px', margin: 0, lineHeight: '1.8' }}>
              <li style={{ marginBottom: "8px", color: "#c0b898" }}>{"Formats clinical experience, certifications, and specializations correctly"}</li>
              <li style={{ marginBottom: "8px", color: "#c0b898" }}>{"Uses healthcare-specific ATS keywords hiring managers search for"}</li>
              <li style={{ marginBottom: "8px", color: "#c0b898" }}>{"Highlights BLS, ACLS, and specialty certifications prominently"}</li>
              <li style={{ marginBottom: "8px", color: "#c0b898" }}>{"Works for RN, LPN, NP, CNA, and all nursing specialties"}</li>
            </ul>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '40px', textAlign: 'center' }}>
            {[['2 min', 'To generate'], ['ATS', 'Optimized'], ['$12.99', 'One time']].map(([stat, label]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '22px', fontWeight: '900', color: '#34d399' }}>{stat}</div>
                <div style={{ fontSize: '11px', color: '#6a6055', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={handleStart} disabled={loading} style={{ background: 'linear-gradient(135deg, #34d399, #34d399bb)', color: '#0d0f1a', border: 'none', borderRadius: '12px', padding: '14px 36px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '12px' }}>
              {loading ? 'Loading...' : 'Get My Resume Now'}
            </button>
            <div style={{ fontSize: '12px', color: '#4a4535' }}>Powered by Claude AI · Secure checkout by Stripe</div>
          </div>
        </div>
      </div>
    </>
  )
}
