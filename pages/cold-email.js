import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const S = { page: { minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }, nav: { padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }, wrap: { maxWidth: '700px', margin: '0 auto', padding: '48px 20px' }, label: { display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', color: '#8a8070', marginBottom: '8px' }, input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#f0ece0', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }, btn: { background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit', width: '100%' } }

export default function ColdEmail() {
  const router = useRouter()
  const [form, setForm] = useState({ senderName: '', senderBackground: '', targetRole: '', targetCompany: '', hiringManagerName: '', uniqueValue: '' })
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [activeEmail, setActiveEmail] = useState(0)

  useState(() => {
    const { session_id, paid: p } = router.query
    if (session_id && p === 'true') {
      fetch('/api/verify-payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id }) })
        .then(r => r.json()).then(d => { if (d.paid) setPaid(true) })
    }
  }, [router.query])

  const handlePay = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/checkout-cold-email', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || 'Checkout failed')
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  const handleGenerate = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/generate-cold-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.emails) setResult(data)
      else setError(data.error || 'Generation failed')
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <>
      <Head><title>Cold Email Generator — CareerCraft AI</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" /></Head>
      <div style={S.page}>
        <nav style={S.nav}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← All Tools</Link>
        </nav>
        <div style={S.wrap}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', color: '#f97316', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>COLD EMAIL GENERATOR</div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '8px' }}>Cold Outreach Emails</h1>
            <p style={{ color: '#8a8070', fontSize: '15px' }}>5 personalized emails to reach hiring managers directly. $7.99 one-time.</p>
          </div>

          <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
            {[['Your Name', 'senderName'], ['Target Role', 'targetRole'], ['Target Company', 'targetCompany'], ['Hiring Manager Name (optional)', 'hiringManagerName']].map(([label, key]) => (
              <div key={key}><label style={S.label}>{label}</label><input style={S.input} value={form[key]} onChange={set(key)} placeholder={label} /></div>
            ))}
            <div><label style={S.label}>Your Background (2-3 sentences)</label><textarea style={{ ...S.input, height: '80px', resize: 'vertical' }} value={form.senderBackground} onChange={set('senderBackground')} placeholder="e.g. 7 years in product management at Series B startups..." /></div>
            <div><label style={S.label}>Your Unique Value / Hook</label><textarea style={{ ...S.input, height: '70px', resize: 'vertical' }} value={form.uniqueValue} onChange={set('uniqueValue')} placeholder="e.g. Built a product used by 500k users, grew it from 0..." /></div>
          </div>

          {!paid ? (
            <div style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#f97316', marginBottom: '4px' }}>$7.99</div>
              <div style={{ fontSize: '13px', color: '#8a8070', marginBottom: '16px' }}>5 emails · 5 different strategies · Copy & send</div>
              <button style={S.btn} onClick={handlePay} disabled={loading}>{loading ? 'Redirecting...' : '✦ Pay & Generate Emails'}</button>
              {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>{error}</div>}
            </div>
          ) : !result ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#22c55e', marginBottom: '16px', fontWeight: '700' }}>✓ Payment confirmed!</div>
              <button style={S.btn} onClick={handleGenerate} disabled={loading}>{loading ? 'Writing emails...' : '✦ Generate 5 Cold Emails'}</button>
              {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>{error}</div>}
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {result.emails.map((e, i) => (
                  <button key={i} onClick={() => setActiveEmail(i)} style={{ background: activeEmail === i ? '#f97316' : 'rgba(255,255,255,0.06)', color: activeEmail === i ? '#fff' : '#8a8070', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>Email {i + 1}</button>
                ))}
              </div>
              {result.emails[activeEmail] && (
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', color: '#f97316', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '8px' }}>STRATEGY: {result.emails[activeEmail].approach}</div>
                  <div style={{ fontSize: '13px', color: '#8a8070', marginBottom: '4px' }}>Subject:</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#f0ece0', marginBottom: '16px' }}>{result.emails[activeEmail].subject}</div>
                  <div style={{ fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{result.emails[activeEmail].body}</div>
                </div>
              )}
              <button onClick={() => navigator.clipboard.writeText(`Subject: ${result.emails[activeEmail].subject}\n\n${result.emails[activeEmail].body}`)} style={{ ...S.btn, background: 'rgba(255,255,255,0.08)', color: '#f0ece0', marginBottom: '10px' }}>Copy Email {activeEmail + 1}</button>
              <button onClick={() => setResult(null)} style={{ ...S.btn, background: 'transparent', color: '#8a8070', border: '1px solid rgba(255,255,255,0.1)' }}>Generate New Emails</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
