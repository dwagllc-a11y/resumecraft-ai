import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function BundleSuccess() {
  const router = useRouter()
  const [verified, setVerified] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const { session_id } = router.query
    if (!session_id) { setChecking(false); return }
    fetch('/api/verify-payment', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id }),
    }).then(r => r.json()).then(d => { if (d.paid) setVerified(true); setChecking(false) }).catch(() => setChecking(false))
  }, [router.query])

  const tools = [
    { emoji: '📄', name: 'AI Resume Builder', href: '/builder', color: '#c8b98a', btnBg: 'linear-gradient(135deg, #c8b98a, #a8965a)', btnColor: '#1a1208' },
    { emoji: '💼', name: 'LinkedIn Optimizer', href: '/linkedin', color: '#60a5fa', btnBg: 'linear-gradient(135deg, #0a66c2, #0856a8)', btnColor: '#fff' },
    { emoji: '🎯', name: 'AI Interview Coach', href: '/interview', color: '#22c55e', btnBg: 'linear-gradient(135deg, #22c55e, #16a34a)', btnColor: '#020f02' },
    { emoji: '💰', name: 'Salary Negotiation', href: '/salary', color: '#f0d080', btnBg: 'linear-gradient(135deg, #c9a84c, #a8843a)', btnColor: '#0b1437' },
    { emoji: '✉️', name: 'Cover Letter Generator', href: '/cover-letter', color: '#c8b98a', btnBg: 'linear-gradient(135deg, #c8b98a, #a8965a)', btnColor: '#1a1208' },
    { emoji: '🔍', name: 'JD Analyzer', href: '/jd-analyzer', color: '#60a5fa', btnBg: 'linear-gradient(135deg, #60a5fa, #3b82f6)', btnColor: '#fff' },
    { emoji: '📝', name: 'Reference Letter Writer', href: '/reference-letter', color: '#a78bfa', btnBg: 'linear-gradient(135deg, #a78bfa, #7c3aed)', btnColor: '#fff' },
    { emoji: '📧', name: 'Cold Email Generator', href: '/cold-email', color: '#f97316', btnBg: 'linear-gradient(135deg, #f97316, #ea580c)', btnColor: '#fff' },
    { emoji: '📅', name: '30/60/90 Day Plan', href: '/90-day-plan', color: '#22c55e', btnBg: 'linear-gradient(135deg, #22c55e, #16a34a)', btnColor: '#020f02' },
    { emoji: '🔄', name: 'Career Change Roadmap', href: '/career-change', color: '#e879f9', btnBg: 'linear-gradient(135deg, #e879f9, #a21caf)', btnColor: '#fff' },
  ]

  if (checking) return (
    <div style={{ minHeight: '100vh', background: '#0d0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>
      <div style={{ textAlign: 'center', fontSize: '16px', color: '#8a8070' }}>Verifying your payment...</div>
    </div>
  )

  return (
    <>
      <Head>
        <title>All 10 Tools Unlocked — CareerCraft AI</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>
        <nav style={{ padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}>
            <span style={{ color: '#c8b98a' }}>Career</span>Craft AI
          </Link>
        </nav>

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
          {verified ? (
            <>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
              <div style={{ display: 'inline-block', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '20px', padding: '6px 18px', fontSize: '11px', color: '#22c55e', letterSpacing: '0.12em', fontWeight: '700', marginBottom: '20px' }}>
                PAYMENT CONFIRMED — ALL 10 TOOLS UNLOCKED
              </div>
              <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '12px' }}>
                Your Complete Bundle is <span style={{ color: '#c8b98a' }}>Live!</span>
              </h1>
              <p style={{ fontSize: '15px', color: '#8a8070', marginBottom: '40px' }}>
                All 10 CareerCraft AI tools are ready. Click any to get started.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', textAlign: 'left', marginBottom: '32px' }}>
                {tools.map(t => (
                  <div key={t.href} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '20px' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{t.emoji}</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: t.color, marginBottom: '12px' }}>{t.name}</div>
                    <Link
                      href={`${t.href}?bundle_session=${router.query.session_id}&paid=true`}
                      style={{ background: t.btnBg, color: t.btnColor, padding: '8px 16px', borderRadius: '7px', textDecoration: 'none', fontWeight: '700', fontSize: '12px', display: 'inline-block' }}
                    >
                      Launch →
                    </Link>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(200,185,138,0.08)', border: '1px solid rgba(200,185,138,0.2)', borderRadius: '12px', padding: '16px 24px', fontSize: '13px', color: '#8a8070' }}>
                💡 <strong style={{ color: '#c8b98a' }}>Tip:</strong> Bookmark this page — each tool link above pre-authenticates your bundle access.
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px' }}>Payment Not Found</h1>
              <p style={{ color: '#8a8070', marginBottom: '24px' }}>We couldn't verify your payment. If you did pay, please try refreshing or contact support.</p>
              <Link href="/" style={{ background: 'linear-gradient(135deg, #c8b98a, #a8965a)', color: '#1a1208', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700' }}>
                Back to Home
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}
