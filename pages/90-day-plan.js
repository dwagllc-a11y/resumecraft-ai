import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const S = { page: { minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }, nav: { padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }, wrap: { maxWidth: '700px', margin: '0 auto', padding: '48px 20px' }, label: { display: 'block', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', color: '#8a8070', marginBottom: '8px' }, input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px', color: '#f0ece0', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }, btn: { background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#020f02', border: 'none', borderRadius: '10px', padding: '14px 32px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit', width: '100%' } }

export default function NinetyDayPlan() {
  const router = useRouter()
  const [form, setForm] = useState({ role: '', company: '', industry: '', background: '', goals: '' })
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
      const res = await fetch('/api/checkout-90-day-plan', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || 'Checkout failed')
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  const handleGenerate = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/generate-90-day-plan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.day30) setResult(data)
      else setError(data.error || 'Generation failed')
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const colors = ['#60a5fa', '#22c55e', '#c8b98a']

  return (
    <>
      <Head><title>30/60/90 Day Plan — CareerCraft AI</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" /></Head>
      <div style={S.page}>
        <nav style={S.nav}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← All Tools</Link>
        </nav>
        <div style={S.wrap}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>30/60/90 DAY PLAN GENERATOR</div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '8px' }}>Impress From Day One</h1>
            <p style={{ color: '#8a8070', fontSize: '15px' }}>A detailed action plan that shows hiring managers you mean business. $9.99 one-time.</p>
          </div>

          <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
            {[['Target Role', 'role'], ['Company Name', 'company'], ['Industry', 'industry']].map(([label, key]) => (
              <div key={key}><label style={S.label}>{label}</label><input style={S.input} value={form[key]} onChange={set(key)} placeholder={label} /></div>
            ))}
            <div><label style={S.label}>Your Background</label><textarea style={{ ...S.input, height: '80px', resize: 'vertical' }} value={form.background} onChange={set('background')} placeholder="Brief summary of relevant experience..." /></div>
            <div><label style={S.label}>Your Goals in This Role</label><textarea style={{ ...S.input, height: '70px', resize: 'vertical' }} value={form.goals} onChange={set('goals')} placeholder="e.g. Build relationships, ship first feature, understand the codebase..." /></div>
          </div>

          {!paid ? (
            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#22c55e', marginBottom: '4px' }}>$9.99</div>
              <div style={{ fontSize: '13px', color: '#8a8070', marginBottom: '16px' }}>Full 90-day roadmap · Quick wins · Smart questions to ask</div>
              <button style={S.btn} onClick={handlePay} disabled={loading}>{loading ? 'Redirecting...' : '✦ Pay & Generate Plan'}</button>
              {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>{error}</div>}
            </div>
          ) : !result ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#22c55e', marginBottom: '16px', fontWeight: '700' }}>✓ Payment confirmed!</div>
              <button style={S.btn} onClick={handleGenerate} disabled={loading}>{loading ? 'Building your plan...' : '✦ Generate 30/60/90 Day Plan'}</button>
              {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '10px' }}>{error}</div>}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {[['30 Days', result.day30, colors[0]], ['60 Days', result.day60, colors[1]], ['90 Days', result.day90, colors[2]]].map(([label, phase, color]) => phase && (
                <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}33`, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ background: color, color: '#0d0f1a', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', fontWeight: '800' }}>{label}</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color }}>{phase.theme}</div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '10px', color, fontWeight: '700', letterSpacing: '0.08em', marginBottom: '6px' }}>GOALS</div>
                    {phase.goals?.map((g, i) => <div key={i} style={{ fontSize: '13px', color: '#a09070', marginBottom: '4px' }}>{'→ ' + g}</div>)}
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color, fontWeight: '700', letterSpacing: '0.08em', marginBottom: '6px' }}>ACTIONS</div>
                    {phase.actions?.map((a, i) => <div key={i} style={{ fontSize: '13px', color: '#a09070', marginBottom: '4px' }}>{'✓ ' + a}</div>)}
                  </div>
                </div>
              ))}
              {result.quickWins?.length > 0 && (
                <div style={{ background: 'rgba(200,185,138,0.06)', border: '1px solid rgba(200,185,138,0.2)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '11px', color: '#c8b98a', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '10px' }}>WEEK 1 QUICK WINS</div>
                  {result.quickWins.map((w, i) => <div key={i} style={{ fontSize: '13px', color: '#a09070', marginBottom: '6px' }}>{'⚡ ' + w}</div>)}
                </div>
              )}
              {result.questionsToAsk?.length > 0 && (
                <div style={{ background: 'rgba(96,165,250,0.05)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '10px' }}>SMART QUESTIONS TO ASK THE HIRING MANAGER</div>
                  {result.questionsToAsk.map((q, i) => <div key={i} style={{ fontSize: '13px', color: '#a09070', marginBottom: '6px' }}>{'? ' + q}</div>)}
                </div>
              )}
              <button onClick={() => setResult(null)} style={{ ...S.btn, background: 'transparent', color: '#8a8070', border: '1px solid rgba(255,255,255,0.1)' }}>Generate Another Plan</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
