import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const S = { page: { minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }, nav: { padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }, wrap: { maxWidth: '700px', margin: '0 auto', padding: '48px 20px' }, label: { display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', color: '#8a8070', marginBottom: '8px' }, input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#f0ece0', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }, btn: { background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit', width: '100%' } }

export default function ReferenceLetter() {
  const router = useRouter()
  const [form, setForm] = useState({ refereeName: '', refereeTitle: '', candidateName: '', relationship: '', duration: '', strengths: '', achievements: '', targetRole: '' })
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
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
      const res = await fetch('/api/checkout-reference-letter', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || 'Checkout failed')
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  const handleGenerate = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/generate-reference-letter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.letter) setResult(data.letter)
      else setError(data.error || 'Generation failed')
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <>
      <Head><title>Reference Letter Writer — CareerCraft AI</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" /></Head>
      <div style={S.page}>
        <nav style={S.nav}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← All Tools</Link>
        </nav>
        <div style={S.wrap}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', color: '#a78bfa', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>REFERENCE LETTER WRITER</div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '8px' }}>Professional Reference Letter</h1>
            <p style={{ color: '#8a8070', fontSize: '15px' }}>A glowing, credible reference letter in seconds. $5.99 one-time.</p>
          </div>

          <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
            {[["Referee's Full Name", 'refereeName'], ["Referee's Title / Role", 'refereeTitle'], ["Candidate's Full Name", 'candidateName'], ['Relationship (e.g. "direct manager", "colleague")', 'relationship'], ['How Long They Worked Together', 'duration'], ['Target Role Candidate is Applying For', 'targetRole']].map(([label, key]) => (
              <div key={key}><label style={S.label}>{label}</label><input style={S.input} value={form[key]} onChange={set(key)} placeholder={label} /></div>
            ))}
            <div><label style={S.label}>Key Strengths (comma separated)</label><input style={S.input} value={form.strengths} onChange={set('strengths')} placeholder="e.g. leadership, analytical thinking, communication..." /></div>
            <div><label style={S.label}>Notable Achievements</label><textarea style={{ ...S.input, height: '80px', resize: 'vertical' }} value={form.achievements} onChange={set('achievements')} placeholder="e.g. Led a team that increased revenue by 40%..." /></div>
          </div>

          {!paid ? (
            <div style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#a78bfa', marginBottom: '4px' }}>$5.99</div>
              <div style={{ fontSize: '13px', color: '#8a8070', marginBottom: '16px' }}>One-time · Instant · Ready to send</div>
              <button style={S.btn} onClick={handlePay} disabled={loading}>{loading ? 'Redirecting...' : '✦ Pay & Generate Reference Letter'}</button>
              {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>{error}</div>}
            </div>
          ) : !result ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#22c55e', marginBottom: '16px', fontWeight: '700' }}>✓ Payment confirmed!</div>
              <button style={S.btn} onClick={handleGenerate} disabled={loading}>{loading ? 'Writing letter...' : '✦ Generate Reference Letter'}</button>
              {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>{error}</div>}
            </div>
          ) : (
            <div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '28px', marginBottom: '16px', whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '14px' }}>{result}</div>
              <button onClick={() => navigator.clipboard.writeText(result)} style={{ ...S.btn, background: 'rgba(255,255,255,0.08)', color: '#f0ece0', marginBottom: '10px' }}>Copy to Clipboard</button>
              <button onClick={() => setResult('')} style={{ ...S.btn, background: 'transparent', color: '#8a8070', border: '1px solid rgba(255,255,255,0.1)' }}>Generate Another</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
