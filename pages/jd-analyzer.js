import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const S = { page: { minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }, nav: { padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }, wrap: { maxWidth: '700px', margin: '0 auto', padding: '48px 20px' }, label: { display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', color: '#8a8070', marginBottom: '8px' }, input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#f0ece0', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }, btn: { background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit', width: '100%' } }


function UpsellBar({ current }) {
  const upsells = {
    builder: [
      { emoji: '✉️', title: 'Cover Letter', desc: 'Tailored to your target role', price: '$9.99', href: '/cover-letter', color: '#c8b98a' },
      { emoji: '🔍', title: 'JD Analyzer', desc: 'Match score + keyword gaps', price: '$8.99', href: '/jd-analyzer', color: '#60a5fa' },
      { emoji: '🎯', title: 'Interview Coach', desc: 'Practice Q&A with scoring', price: '$16.99', href: '/interview', color: '#22c55e' },
    ],
    linkedin: [
      { emoji: '📄', title: 'AI Resume', desc: 'ATS-optimized resume next', price: '$12.99', href: '/builder', color: '#c8b98a' },
      { emoji: '✉️', title: 'Cover Letter', desc: 'Complete your application', price: '$9.99', href: '/cover-letter', color: '#f97316' },
      { emoji: '💰', title: 'Salary Scripts', desc: 'Negotiate your offer', price: '$12.99', href: '/salary', color: '#f0d080' },
    ],
    'cover-letter': [
      { emoji: '📄', title: 'AI Resume', desc: 'Complete the package', price: '$12.99', href: '/builder', color: '#c8b98a' },
      { emoji: '🔍', title: 'JD Analyzer', desc: 'Maximize your match score', price: '$8.99', href: '/jd-analyzer', color: '#60a5fa' },
      { emoji: '🎯', title: 'Interview Coach', desc: 'Prep for the callback', price: '$16.99', href: '/interview', color: '#22c55e' },
    ],
    interview: [
      { emoji: '💰', title: 'Salary Scripts', desc: 'Negotiate the offer', price: '$12.99', href: '/salary', color: '#f0d080' },
      { emoji: '📅', title: '30/60/90 Plan', desc: 'Impress on day one', price: '$12.99', href: '/90-day-plan', color: '#34d399' },
      { emoji: '✉️', title: 'Cover Letter', desc: 'For your next application', price: '$9.99', href: '/cover-letter', color: '#c8b98a' },
    ],
    salary: [
      { emoji: '🎯', title: 'Interview Coach', desc: 'Nail the interview first', price: '$16.99', href: '/interview', color: '#22c55e' },
      { emoji: '📅', title: '30/60/90 Plan', desc: 'Ace your first 90 days', price: '$12.99', href: '/90-day-plan', color: '#34d399' },
      { emoji: '📄', title: 'AI Resume', desc: 'Keep your resume fresh', price: '$12.99', href: '/builder', color: '#c8b98a' },
    ],
    'jd-analyzer': [
      { emoji: '📄', title: 'AI Resume', desc: 'Apply your keyword fixes', price: '$12.99', href: '/builder', color: '#c8b98a' },
      { emoji: '✉️', title: 'Cover Letter', desc: 'Tailored to this JD', price: '$9.99', href: '/cover-letter', color: '#f97316' },
      { emoji: '🎯', title: 'Interview Coach', desc: 'Prep for the interview', price: '$16.99', href: '/interview', color: '#22c55e' },
    ],
    default: [
      { emoji: '📄', title: 'AI Resume', desc: 'ATS-optimized resume', price: '$12.99', href: '/builder', color: '#c8b98a' },
      { emoji: '✉️', title: 'Cover Letter', desc: 'Tailored cover letter', price: '$9.99', href: '/cover-letter', color: '#f97316' },
      { emoji: '🎯', title: 'Interview Coach', desc: 'Practice Q&A with AI', price: '$16.99', href: '/interview', color: '#22c55e' },
    ]
  }
  const items = upsells[current] || upsells.default
  return (
    <div style={{ marginTop: '32px', padding: '24px', background: 'rgba(200,185,138,0.06)', border: '1px solid rgba(200,185,138,0.2)', borderRadius: '14px' }}>
      <div style={{ fontSize: '11px', color: '#c8b98a', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '14px' }}>COMPLETE YOUR TOOLKIT</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        {items.map(item => (
          <a key={item.href} href={item.href} style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.04)', border: `1px solid ${item.color}33`, borderRadius: '10px', padding: '16px', display: 'block' }}>
            <div style={{ fontSize: '22px', marginBottom: '6px' }}>{item.emoji}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: item.color, marginBottom: '2px' }}>{item.title}</div>
            <div style={{ fontSize: '11px', color: '#6a6055', marginBottom: '10px' }}>{item.desc}</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: item.color }}>{item.price}</div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default function JDAnalyzer() {
  const router = useRouter()
  const [form, setForm] = useState({ jobDescription: '', currentResume: '', targetRole: '' })
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
      const res = await fetch('/api/checkout-jd-analyzer', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || 'Checkout failed')
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  const handleGenerate = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/generate-jd-analyzer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.matchScore !== undefined) setResult(data)
      else setError(data.error || 'Analysis failed')
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const Tag = ({ text, color }) => <span style={{ background: `${color}22`, border: `1px solid ${color}44`, borderRadius: '6px', padding: '3px 10px', fontSize: '12px', color, marginRight: '6px', marginBottom: '6px', display: 'inline-block' }}>{text}</span>

  return (
    <>
      <Head><title>JD Analyzer — CareerCraft AI</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" /></Head>
      <div style={S.page}>
        <nav style={S.nav}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← All Tools</Link>
        </nav>
        <div style={S.wrap}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>JD ANALYZER</div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '8px' }}>Job Description Analyzer</h1>
            <p style={{ color: '#8a8070', fontSize: '15px' }}>Paste any JD and get a tailored action plan to land the role. $8.99 one-time.</p>
          </div>

          <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
            <div><label style={S.label}>Job Description (paste the full JD)</label><textarea style={{ ...S.input, height: '160px', resize: 'vertical' }} value={form.jobDescription} onChange={set('jobDescription')} placeholder="Paste the full job description here..." /></div>
            <div><label style={S.label}>Your Resume Summary (optional — for gap analysis)</label><textarea style={{ ...S.input, height: '100px', resize: 'vertical' }} value={form.currentResume} onChange={set('currentResume')} placeholder="Brief summary of your background and key skills..." /></div>
          </div>

          {!paid ? (
            <div style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#60a5fa', marginBottom: '4px' }}>$8.99</div>
              <div style={{ fontSize: '13px', color: '#8a8070', marginBottom: '16px' }}>Match score · Resume tweaks · Interview topics · Keywords</div>
              <button style={S.btn} onClick={handlePay} disabled={loading}>{loading ? 'Redirecting...' : '✦ Pay & Analyze JD'}</button>
              {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>{error}</div>}
            </div>
          ) : !result ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#22c55e', marginBottom: '16px', fontWeight: '700' }}>✓ Payment confirmed!</div>
              <button style={S.btn} onClick={handleGenerate} disabled={loading}>{loading ? 'Analyzing...' : '✦ Analyze Job Description'}</button>
              {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>{error}</div>}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.25)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: '#60a5fa', fontWeight: '700', marginBottom: '4px' }}>MATCH SCORE</div>
                <div style={{ fontSize: '56px', fontWeight: '900', color: result.matchScore >= 70 ? '#22c55e' : result.matchScore >= 50 ? '#f0d080' : '#ef4444' }}>{result.matchScore}%</div>
              </div>
              {[['Required Skills', result.keySkillsRequired, '#60a5fa'], ['Missing From Your Resume', result.missingFromResume, '#ef4444'], ['Keywords to Add', result.keywordsToAdd, '#22c55e'], ['Interview Topics to Prep', result.interviewTopics, '#f0d080']].map(([title, items, color]) => items?.length > 0 && (
                <div key={title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color, letterSpacing: '0.08em', marginBottom: '12px' }}>{title.toUpperCase()}</div>
                  <div>{items.map(i => <Tag key={i} text={i} color={color} />)}</div>
                </div>
              ))}
              {result.resumeTweaks?.length > 0 && (
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#c8b98a', letterSpacing: '0.08em', marginBottom: '12px' }}>RESUME TWEAKS</div>
                  {result.resumeTweaks.map((t, i) => <div key={i} style={{ fontSize: '13px', color: '#a09070', marginBottom: '8px', paddingLeft: '12px', borderLeft: '2px solid rgba(200,185,138,0.3)' }}>{t}</div>)}
                </div>
              )}
              {result.coverLetterAngle && (
                <div style={{ background: 'rgba(200,185,138,0.06)', border: '1px solid rgba(200,185,138,0.2)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#c8b98a', letterSpacing: '0.08em', marginBottom: '8px' }}>COVER LETTER ANGLE</div>
                  <div style={{ fontSize: '14px', color: '#f0ece0' }}>{result.coverLetterAngle}</div>
                </div>
              )}
              <button onClick={() => setResult(null)} style={{ ...S.btn, background: 'transparent', color: '#8a8070', border: '1px solid rgba(255,255,255,0.1)' }}>Analyze Another JD</button>
            
                  <UpsellBar current="jd-analyzer" />
                </div>
          )}
        </div>
      </div>
    </>
  )
}
