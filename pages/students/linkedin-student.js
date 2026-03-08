import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const FIELDS = ['name', 'school', 'major', 'year', 'skills', 'goals', 'experience']
const S = { page: { minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }, nav: { padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }, wrap: { maxWidth: '700px', margin: '0 auto', padding: '48px 20px' }, label: { display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', color: '#8a8070', marginBottom: '8px' }, input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#f0ece0', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }, btn: { background: '#60a5fa', color: '#0d0f1a', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit', width: '100%' } }

export default function Page() {
  const router = useRouter()
  const [form, setForm] = useState({})
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

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
      const res = await fetch('/api/checkout-student-linkedin-student', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || 'Checkout failed')
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  const handleGenerate = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/generate-student-linkedin-student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.error) setError(data.error)
      else setResult(data)
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const resultText = result ? (result.output || JSON.stringify(result, null, 2)) : ''
  const fmtLabel = (f) => f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())

  return (
    <>
      <Head><title>Student LinkedIn Optimizer — CareerCraft AI</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" /></Head>
      <div style={S.page}>
        <nav style={S.nav}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/students" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← StudentCraft AI</Link>
        </nav>
        <div style={S.wrap}>
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>STUDENTCRAFT AI</div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '8px' }}>Student LinkedIn Optimizer</h1>
            <p style={{ color: '#8a8070', fontSize: '15px' }}>Get recruiter-ready before you graduate. $16.99 one-time.</p>
          </div>
          <div style={{ display: 'grid', gap: '14px', marginBottom: '24px' }}>
            {FIELDS.map(f => (
              <div key={f}><label style={S.label}>{fmtLabel(f)}</label>
              <input style={S.input} value={form[f] || ''} onChange={set(f)} placeholder={fmtLabel(f).toLowerCase()} /></div>
            ))}
          </div>
          {!paid ? (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#60a5fa', marginBottom: '4px' }}>$16.99</div>
              <div style={{ fontSize: '13px', color: '#8a8070', marginBottom: '16px' }}>One-time payment · Instant result</div>
              <button style={S.btn} onClick={handlePay} disabled={loading}>{loading ? 'Redirecting...' : '✦ Pay & Generate'}</button>
              {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>{error}</div>}
            </div>
          ) : !result ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#22c55e', marginBottom: '16px', fontWeight: '700' }}>✓ Payment confirmed!</div>
              <button style={S.btn} onClick={handleGenerate} disabled={loading}>{loading ? 'Generating...' : '✦ Generate Now'}</button>
              {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>{error}</div>}
            </div>
          ) : (
            <div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '28px', marginBottom: '16px', whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '14px' }}>{resultText}</div>
              <button onClick={() => navigator.clipboard.writeText(resultText)} style={{ ...S.btn, background: 'rgba(255,255,255,0.08)', color: '#f0ece0', marginBottom: '10px' }}>Copy to Clipboard</button>
              <button onClick={() => setResult(null)} style={{ ...S.btn, background: 'transparent', color: '#8a8070', border: '1px solid rgba(255,255,255,0.1)' }}>Generate Another</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
