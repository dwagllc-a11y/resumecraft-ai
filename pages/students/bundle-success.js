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
      <Head><title>Student Bundle — All 5 Tools — CareerCraft AI</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" /></Head>
      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>
        <nav style={{ padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/students" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← StudentCraft AI</Link>
        </nav>
        <div style={{ maxWidth: '580px', margin: '0 auto', padding: '64px 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <div style={{ fontSize: '11px', color: '#818cf8', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>BUNDLE UNLOCKED</div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '8px' }}>You have access to all 5 tools</h1>
            <p style={{ color: '#8a8070', fontSize: '14px' }}>Click any tool below to get started. Access never expires.</p>
          </div>
          <div style={{ display: 'grid', gap: '10px', marginBottom: '32px' }}>
            <a href="/students/personal-statement" style={{ display: "flex", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", textDecoration: "none", color: "#f0ece0", gap: "12px" }}><span style={{ fontSize: "20px" }}>🎓</span><span style={{ flex: 1, fontWeight: "600", fontSize: "14px" }}>Personal Statement Writer</span><span style={{ color: "#818cf8", fontWeight: "700", fontSize: "13px" }}>Open →</span></a>
              <a href="/students/scholarship-essay" style={{ display: "flex", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", textDecoration: "none", color: "#f0ece0", gap: "12px" }}><span style={{ fontSize: "20px" }}>🏆</span><span style={{ flex: 1, fontWeight: "600", fontSize: "14px" }}>Scholarship Essay Generator</span><span style={{ color: "#818cf8", fontWeight: "700", fontSize: "13px" }}>Open →</span></a>
              <a href="/students/internship-cover-letter" style={{ display: "flex", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", textDecoration: "none", color: "#f0ece0", gap: "12px" }}><span style={{ fontSize: "20px" }}>📋</span><span style={{ flex: 1, fontWeight: "600", fontSize: "14px" }}>Internship Cover Letter</span><span style={{ color: "#818cf8", fontWeight: "700", fontSize: "13px" }}>Open →</span></a>
              <a href="/students/linkedin-student" style={{ display: "flex", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", textDecoration: "none", color: "#f0ece0", gap: "12px" }}><span style={{ fontSize: "20px" }}>💼</span><span style={{ flex: 1, fontWeight: "600", fontSize: "14px" }}>Student LinkedIn Optimizer</span><span style={{ color: "#818cf8", fontWeight: "700", fontSize: "13px" }}>Open →</span></a>
              <a href="/students/study-plan" style={{ display: "flex", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", textDecoration: "none", color: "#f0ece0", gap: "12px" }}><span style={{ fontSize: "20px" }}>📅</span><span style={{ flex: 1, fontWeight: "600", fontSize: "14px" }}>Study & Career Plan</span><span style={{ color: "#818cf8", fontWeight: "700", fontSize: "13px" }}>Open →</span></a>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← Explore all CareerCraft AI tools</Link>
          </div>
        </div>
      </div>
    </>
  )
}
