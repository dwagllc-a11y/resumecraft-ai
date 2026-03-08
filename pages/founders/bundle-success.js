import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function BundleSuccess() {
  const router = useRouter()
  const [verified, setVerified] = useState(false)

  useState(() => {
    const { session_id, paid } = router.query
    if (session_id && paid === 'true') {
      fetch('/api/verify-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id }) })
        .then(r => r.json()).then(d => { if (d.paid) setVerified(true) })
    }
  }, [router.query])

  return (
    <>
      <Head><title>Founder Bundle — All 5 Tools — CareerCraft AI</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" /></Head>
      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>
        <nav style={{ padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/founders" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← FounderCraft AI</Link>
        </nav>
        <div style={{ maxWidth: '580px', margin: '0 auto', padding: '64px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <div style={{ fontSize: '11px', color: '#a78bfa', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>BUNDLE UNLOCKED</div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '8px' }}>You have access to all 5 tools</h1>
            <p style={{ color: '#8a8070', fontSize: '14px' }}>Click any tool below to get started. Access never expires.</p>
          </div>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '32px' }}>
            <a href="/founders/pitch-deck" style={{ display: "flex", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", textDecoration: "none", color: "#f0ece0", gap: "12px" }}><span style={{ fontSize: "20px" }}>📊</span><span style={{ flex: 1, fontWeight: "600", fontSize: "14px" }}>Pitch Deck Outline Generator</span><span style={{ color: "#a78bfa", fontWeight: "700", fontSize: "13px" }}>Open →</span></a>
              <a href="/founders/investor-email" style={{ display: "flex", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", textDecoration: "none", color: "#f0ece0", gap: "12px" }}><span style={{ fontSize: "20px" }}>📩</span><span style={{ flex: 1, fontWeight: "600", fontSize: "14px" }}>Investor Cold Email Generator</span><span style={{ color: "#a78bfa", fontWeight: "700", fontSize: "13px" }}>Open →</span></a>
              <a href="/founders/yc-essay" style={{ display: "flex", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", textDecoration: "none", color: "#f0ece0", gap: "12px" }}><span style={{ fontSize: "20px" }}>🚀</span><span style={{ flex: 1, fontWeight: "600", fontSize: "14px" }}>YC Application Essay Writer</span><span style={{ color: "#a78bfa", fontWeight: "700", fontSize: "13px" }}>Open →</span></a>
              <a href="/founders/one-pager" style={{ display: "flex", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", textDecoration: "none", color: "#f0ece0", gap: "12px" }}><span style={{ fontSize: "20px" }}>📝</span><span style={{ flex: 1, fontWeight: "600", fontSize: "14px" }}>Startup One-Pager Generator</span><span style={{ color: "#a78bfa", fontWeight: "700", fontSize: "13px" }}>Open →</span></a>
              <a href="/founders/cold-outreach" style={{ display: "flex", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", textDecoration: "none", color: "#f0ece0", gap: "12px" }}><span style={{ fontSize: "20px" }}>🤝</span><span style={{ flex: 1, fontWeight: "600", fontSize: "14px" }}>Founder Cold Outreach Scripts</span><span style={{ color: "#a78bfa", fontWeight: "700", fontSize: "13px" }}>Open →</span></a>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← Explore all CareerCraft AI tools</Link>
          </div>
        </div>
      </div>
    </>
  )
}
