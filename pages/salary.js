import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const C = {
  bg: '#f7f8fc',
  navy: '#0b1437',
  navyLight: '#162050',
  gold: '#c9a84c',
  goldLight: '#f0d080',
  goldFaint: 'rgba(201,168,76,0.1)',
  border: '#e2e6f0',
  borderDark: '#c8cfe0',
  text: '#0b1437',
  muted: '#6b7a9e',
  white: '#ffffff',
  green: '#059669',
  greenFaint: 'rgba(5,150,105,0.08)',
  red: '#dc2626',
  surface: '#ffffff',
}

const serif = "'Playfair Display', Georgia, serif"
const sans = "'DM Sans', 'Segoe UI', sans-serif"

const S = {
  page: { minHeight: '100vh', background: C.bg, fontFamily: sans, color: C.text },
  nav: {
    background: C.navy, padding: '0 40px', height: '60px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 2px 20px rgba(11,20,55,0.3)',
  },
  body: { maxWidth: '800px', margin: '0 auto', padding: '44px 20px' },
  card: {
    background: C.white, borderRadius: '14px', padding: '30px',
    marginBottom: '20px', border: `1px solid ${C.border}`,
    boxShadow: '0 2px 16px rgba(11,20,55,0.06)',
  },
  sectionLabel: {
    fontSize: '10px', fontWeight: '800', letterSpacing: '0.14em',
    textTransform: 'uppercase', color: C.gold, marginBottom: '18px',
    display: 'flex', alignItems: 'center', gap: '8px',
  },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: C.navy, marginBottom: '6px' },
  hint: { fontSize: '12px', color: C.muted, marginBottom: '6px' },
  input: {
    width: '100%', padding: '10px 14px', background: C.bg,
    border: `1.5px solid ${C.border}`, borderRadius: '8px',
    fontSize: '14px', color: C.text, outline: 'none',
    boxSizing: 'border-box', fontFamily: sans, transition: 'border-color 0.15s',
  },
  textarea: {
    width: '100%', padding: '10px 14px', background: C.bg,
    border: `1.5px solid ${C.border}`, borderRadius: '8px',
    fontSize: '14px', color: C.text, outline: 'none',
    boxSizing: 'border-box', fontFamily: sans, resize: 'vertical', lineHeight: '1.6',
    transition: 'border-color 0.15s',
  },
  btnPrimary: {
    background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
    color: C.white, border: 'none', borderRadius: '9px',
    padding: '13px 32px', fontSize: '14px', fontWeight: '700',
    cursor: 'pointer', fontFamily: sans, letterSpacing: '0.02em',
    boxShadow: '0 4px 16px rgba(11,20,55,0.25)', transition: 'opacity 0.15s',
  },
  btnGold: {
    background: `linear-gradient(135deg, ${C.gold}, #a8843a)`,
    color: C.navy, border: 'none', borderRadius: '9px',
    padding: '13px 32px', fontSize: '14px', fontWeight: '800',
    cursor: 'pointer', fontFamily: sans, letterSpacing: '0.02em',
    boxShadow: '0 4px 16px rgba(201,168,76,0.35)',
  },
  btnOutline: {
    background: 'transparent', color: C.navy, border: `1.5px solid ${C.borderDark}`,
    borderRadius: '9px', padding: '12px 24px', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer', fontFamily: sans,
  },
  fg: { marginBottom: '18px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' },
}

function Field({ label, hint, children }) {
  return (
    <div style={S.fg}>
      <label style={S.label}>{label}</label>
      {hint && <div style={S.hint}>{hint}</div>}
      {children}
    </div>
  )
}

function ScriptBlock({ title, icon, color = C.navy, content, tip }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div style={{ marginBottom: '20px', border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ background: color, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.1em', color: color === C.gold ? C.navy : C.white, textTransform: 'uppercase' }}>
          {icon} {title}
        </div>
        <button onClick={copy} style={{ background: 'rgba(255,255,255,0.15)', color: color === C.gold ? C.navy : C.white, border: 'none', borderRadius: '5px', padding: '4px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', fontFamily: sans }}>
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <div style={{ padding: '20px', background: C.white }}>
        <div style={{ fontSize: '14px', lineHeight: '1.8', color: C.text, whiteSpace: 'pre-wrap', fontStyle: 'italic', fontFamily: serif }}>
          "{content}"
        </div>
        {tip && (
          <div style={{ marginTop: '14px', background: C.goldFaint, borderLeft: `3px solid ${C.gold}`, padding: '10px 14px', borderRadius: '0 6px 6px 0' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: C.gold, letterSpacing: '0.08em', marginBottom: '4px' }}>COACH TIP</div>
            <div style={{ fontSize: '12px', color: C.muted, lineHeight: '1.6' }}>{tip}</div>
          </div>
        )}
      </div>
    </div>
  )
}

function parseResult(raw) {
  try {
    return JSON.parse(raw.replace(/```json|```/g, '').trim())
  } catch { return null }
}

function Results({ data, form, onRestart }) {
  if (!data) return <div style={{ color: C.red, padding: '20px' }}>Could not parse results. Please try again.</div>

  const gain = data.targetSalary && form.currentSalary
    ? Math.round(((parseInt(data.targetSalary.replace(/\D/g, '')) - parseInt(form.currentSalary.replace(/\D/g, ''))) / parseInt(form.currentSalary.replace(/\D/g, ''))) * 100)
    : null

  return (
    <div>
      {/* Hero */}
      <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`, border: 'none', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ fontSize: '11px', color: C.gold, fontWeight: '800', letterSpacing: '0.12em', marginBottom: '10px' }}>YOUR NEGOTIATION PACKAGE</div>
            <div style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: '900', color: C.white, fontFamily: serif, marginBottom: '6px', lineHeight: 1.1 }}>
              {data.targetSalary || 'Target Identified'}
            </div>
            {gain !== null && !isNaN(gain) && (
              <div style={{ fontSize: '14px', color: C.goldLight }}>
                +{gain}% increase from current salary
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[
              ['Leverage Score', `${data.leverageScore}/10`],
              ['Strategy', data.strategy],
            ].map(([l, v]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '14px 18px', textAlign: 'center', minWidth: '100px' }}>
                <div style={{ fontSize: '10px', color: C.gold, fontWeight: '700', letterSpacing: '0.1em', marginBottom: '6px' }}>{l}</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: C.white }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market context */}
      <div style={S.card}>
        <div style={S.sectionLabel}>📊 Market Analysis & Your Leverage</div>
        <div style={{ fontSize: '14px', color: C.muted, lineHeight: '1.75' }}>{data.marketContext}</div>
      </div>

      {/* Scripts */}
      <div style={{ ...S.sectionLabel, marginBottom: '16px' }}>💬 Your Negotiation Scripts</div>

      {(data.scripts || []).map((s, i) => (
        <ScriptBlock key={i} title={s.title} icon={s.icon} color={i === 0 ? C.navy : i === 1 ? '#1e3a5f' : i === 2 ? '#2d4a1e' : C.navy} content={s.script} tip={s.tip} />
      ))}

      {/* Objection handlers */}
      <div style={S.card}>
        <div style={S.sectionLabel}>🛡️ Handling Pushback</div>
        {(data.objections || []).map((o, i) => (
          <div key={i} style={{ marginBottom: '18px', paddingBottom: '18px', borderBottom: i < data.objections.length - 1 ? `1px solid ${C.border}` : 'none' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: C.red, marginBottom: '8px' }}>
              ❝ {o.objection}
            </div>
            <div style={{ fontSize: '13px', color: C.text, lineHeight: '1.7', fontStyle: 'italic', fontFamily: serif, background: C.greenFaint, padding: '12px 16px', borderRadius: '8px', borderLeft: `3px solid ${C.green}` }}>
              "{o.response}"
            </div>
          </div>
        ))}
      </div>

      {/* BATNA */}
      <div style={{ ...S.card, borderColor: C.gold, background: 'linear-gradient(135deg, #fffdf5, #fff9e8)' }}>
        <div style={S.sectionLabel}>⚡ Your BATNA & Walk-Away Point</div>
        <div style={{ fontSize: '14px', color: C.text, lineHeight: '1.75', marginBottom: '12px' }}>{data.batna}</div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[['Target', data.targetSalary], ['Acceptable', data.acceptableFloor], ['Walk Away', data.walkAway]].map(([label, val]) => (
            <div key={label} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '12px 20px', textAlign: 'center', flex: 1, minWidth: '100px' }}>
              <div style={{ fontSize: '10px', color: C.muted, fontWeight: '700', letterSpacing: '0.08em', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: C.navy }}>{val || '—'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bonus negotiation */}
      <div style={S.card}>
        <div style={S.sectionLabel}>🎁 Beyond Base Salary</div>
        <div style={{ fontSize: '14px', color: C.muted, lineHeight: '1.75', marginBottom: '14px' }}>{data.beyondSalary}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(data.perks || []).map(p => (
            <span key={p} style={{ background: C.goldFaint, color: C.navy, border: `1px solid rgba(201,168,76,0.3)`, borderRadius: '20px', padding: '4px 14px', fontSize: '12px', fontWeight: '600' }}>{p}</span>
          ))}
        </div>
      </div>

      {/* Cross-sell */}
      <div style={{ ...S.card, background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`, border: 'none', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', color: C.gold, letterSpacing: '0.1em', fontWeight: '800', marginBottom: '8px' }}>✦ COMPLETE YOUR JOB SEARCH</div>
        <div style={{ fontSize: '18px', fontWeight: '800', color: C.white, marginBottom: '8px', fontFamily: serif }}>Land the job first — then negotiate</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>Our full suite helps you at every stage of the process</div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/builder" style={{ background: C.gold, color: C.navy, padding: '10px 20px', borderRadius: '7px', textDecoration: 'none', fontWeight: '700', fontSize: '13px' }}>📄 Resume Builder</a>
          <a href="/linkedin" style={{ background: 'rgba(255,255,255,0.1)', color: C.white, padding: '10px 20px', borderRadius: '7px', textDecoration: 'none', fontWeight: '700', fontSize: '13px', border: '1px solid rgba(255,255,255,0.2)' }}>💼 LinkedIn Optimizer</a>
          <a href="/interview" style={{ background: 'rgba(255,255,255,0.1)', color: C.white, padding: '10px 20px', borderRadius: '7px', textDecoration: 'none', fontWeight: '700', fontSize: '13px', border: '1px solid rgba(255,255,255,0.2)' }}>🎯 Interview Coach</a>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <button style={S.btnPrimary} onClick={onRestart}>← Start Over</button>
        <button style={S.btnGold} onClick={() => window.print()}>⬇ Save as PDF</button>
      </div>
    </div>
  )
}


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

export default function SalaryNegotiator() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)
  const [checkingPayment, setCheckingPayment] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    role: '', company: '', industry: '',
    currentSalary: '', offeredSalary: '', targetSalary: '',
    yearsExp: '', achievements: '', competing: '',
    situation: 'new_offer', urgency: 'moderate',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    const { session_id, paid: p } = router.query
    if (session_id && p === 'true') {
      setCheckingPayment(true)
      fetch('/api/verify-payment', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id }),
      })
        .then(r => r.json())
        .then(d => { if (d.paid) { setPaid(true) } setCheckingPayment(false) })
        .catch(() => setCheckingPayment(false))
    }
  }, [router.query])

  const handleCheckout = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/checkout-salary', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: form }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError('Could not start checkout.')
    } catch { setError('Something went wrong.') }
    setLoading(false)
  }

  const generate = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/generate-salary', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: form }),
      })
      const data = await res.json()
      if (data.result) { setResult(parseResult(data.result)); setStep(2) }
      else setError('Failed to generate. Please try again.')
    } catch { setError('Something went wrong.') }
    setLoading(false)
  }

  const fi = (k, ph) => ({
    style: S.input, placeholder: ph, value: form[k],
    onChange: e => set(k, e.target.value),
    onFocus: e => e.target.style.borderColor = C.gold,
    onBlur: e => e.target.style.borderColor = C.border,
  })
  const ta = (k, ph, h = 80) => ({
    style: { ...S.textarea, minHeight: `${h}px` }, placeholder: ph, value: form[k],
    onChange: e => set(k, e.target.value),
    onFocus: e => e.target.style.borderColor = C.gold,
    onBlur: e => e.target.style.borderColor = C.border,
  })

  if (checkingPayment) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg }}>
      <div style={{ textAlign: 'center', color: C.navy, fontFamily: sans }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>⟳</div>
        <div style={{ fontWeight: '600' }}>Verifying payment...</div>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>NegotiateAI — Salary Negotiation Script Generator</title>
        <meta name="description" content="Get a personalized salary negotiation script, market analysis, objection handlers, and BATNA strategy. Never leave money on the table." />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={S.page}>

        {/* Nav */}
        <nav style={S.nav}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', background: C.gold, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>💰</div>
            <span style={{ fontSize: '16px', fontWeight: '800', color: C.white, fontFamily: serif }}>Negotiate<span style={{ color: C.gold }}>AI</span></span>
          </div>
          <a href="/" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '0.06em' }}>← ALL TOOLS</a>
        </nav>

        <div style={S.body}>

          {/* ── STEP 0: Situation ── */}
          {step === 0 && (
            <div>
              <div style={{ marginBottom: '36px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: C.gold, letterSpacing: '0.12em', marginBottom: '12px' }}>SALARY NEGOTIATION SCRIPT GENERATOR</div>
                <h1 style={{ fontSize: 'clamp(30px,5vw,50px)', fontWeight: '900', fontFamily: serif, color: C.navy, lineHeight: 1.1, marginBottom: '12px' }}>
                  Never Leave Money<br />on the Table Again
                </h1>
                <p style={{ fontSize: '15px', color: C.muted, lineHeight: '1.65', maxWidth: '520px' }}>
                  Get a personalized word-for-word negotiation script, market analysis, objection handlers, and BATNA strategy in minutes.
                </p>
              </div>

              <div style={S.card}>
                <div style={S.sectionLabel}>◈ Your Situation</div>

                {/* Situation type */}
                <div style={S.fg}>
                  <label style={S.label}>What are you negotiating?</label>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {[['new_offer', '🤝 New Job Offer'], ['raise', '📈 Raise / Promotion'], ['counter', '⚡ Counter Offer'], ['annual', '📅 Annual Review']].map(([v, l]) => (
                      <button key={v} onClick={() => set('situation', v)} style={{ background: form.situation === v ? C.navy : C.white, color: form.situation === v ? C.white : C.navy, border: `1.5px solid ${form.situation === v ? C.navy : C.border}`, borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: sans, transition: 'all 0.15s' }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={S.grid2}>
                  <Field label="Role / Job Title"><input {...fi('role', 'e.g. Senior Product Manager')} /></Field>
                  <Field label="Company"><input {...fi('company', 'e.g. Salesforce')} /></Field>
                  <Field label="Industry"><input {...fi('industry', 'e.g. SaaS, Finance, Healthcare')} /></Field>
                  <Field label="Years of Experience"><input {...fi('yearsExp', 'e.g. 7')} /></Field>
                </div>
              </div>

              <div style={S.card}>
                <div style={S.sectionLabel}>◈ The Numbers</div>
                <div style={S.grid2}>
                  <Field label="Current / Previous Salary" hint="Optional but helps set baseline">
                    <input {...fi('currentSalary', 'e.g. $95,000')} />
                  </Field>
                  <Field label="Offer / Current Comp" hint="What's on the table right now">
                    <input {...fi('offeredSalary', 'e.g. $110,000')} />
                  </Field>
                  <Field label="Your Target Salary" hint="What you actually want">
                    <input {...fi('targetSalary', 'e.g. $130,000')} />
                  </Field>
                  <Field label="Urgency">
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[['low', 'Low'], ['moderate', 'Moderate'], ['high', 'High']].map(([v, l]) => (
                        <button key={v} onClick={() => set('urgency', v)} style={{ flex: 1, background: form.urgency === v ? C.gold : C.bg, color: form.urgency === v ? C.navy : C.muted, border: `1.5px solid ${form.urgency === v ? C.gold : C.border}`, borderRadius: '8px', padding: '9px 8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: sans }}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              </div>

              <div style={S.card}>
                <div style={S.sectionLabel}>◈ Your Leverage</div>
                <Field label="Key Achievements & Value You Bring" hint="Quantified wins, awards, impact — the more specific, the stronger your script">
                  <textarea {...ta('achievements', 'e.g. Grew revenue 40% YoY, led team of 12, launched product used by 500k users, reduced churn by 18%...', 100)} />
                </Field>
                <Field label="Competing Offers or Alternatives" hint="Other offers, freelance income, or options if you walk away">
                  <textarea {...ta('competing', 'e.g. Competing offer from Stripe at $125k, or I could stay in current role with a promotion in Q2...', 70)} />
                </Field>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={S.btnPrimary} onClick={() => setStep(1)}>Review & Generate →</button>
              </div>
            </div>
          )}

          {/* ── STEP 1: Paywall ── */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '900', fontFamily: serif, color: C.navy, marginBottom: '8px' }}>Your Script is Ready to Generate</h2>
                <p style={{ fontSize: '14px', color: C.muted }}>Negotiating even $5,000 more pays for this 600× over.</p>
              </div>

              {/* Summary */}
              <div style={S.card}>
                <div style={S.sectionLabel}>◈ Your Details</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[['Role', form.role], ['Company', form.company], ['Offer', form.offeredSalary], ['Target', form.targetSalary]].filter(([, v]) => v).map(([l, v]) => (
                    <div key={l} style={{ background: C.bg, borderRadius: '8px', padding: '10px 14px' }}>
                      <div style={{ fontSize: '10px', color: C.muted, fontWeight: '700', letterSpacing: '0.08em', marginBottom: '2px' }}>{l.toUpperCase()}</div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: C.navy }}>{v}</div>
                    </div>
                  ))}
                </div>
                <button style={{ ...S.btnOutline, marginTop: '14px', fontSize: '13px', padding: '8px 16px' }} onClick={() => setStep(0)}>← Edit Details</button>
              </div>

              {/* What you get */}
              <div style={{ ...S.card, border: `2px solid ${C.gold}`, background: 'linear-gradient(135deg, #fffdf5, #fff9e8)' }}>
                <div style={S.sectionLabel}>◈ WHAT YOU GET</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  {[
                    ['📊', 'Market Analysis', 'Your leverage score + market context'],
                    ['💬', '4 Scripts', 'Opening, counter, closing & email versions'],
                    ['🛡️', 'Objection Handlers', 'Word-for-word responses to pushback'],
                    ['⚡', 'BATNA Strategy', 'Walk-away point & alternatives'],
                    ['🎁', 'Beyond Base Salary', 'Bonus, equity, PTO & perks to negotiate'],
                  ].map(([icon, title, desc]) => (
                    <div key={title} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '20px', flexShrink: 0 }}>{icon}</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: C.navy, marginBottom: '2px' }}>{title}</div>
                        <div style={{ fontSize: '12px', color: C.muted }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {!paid ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '44px', fontWeight: '900', color: C.navy, fontFamily: serif, letterSpacing: '-0.04em', lineHeight: 1 }}>$16.99</div>
                    <div style={{ fontSize: '13px', color: C.muted, marginBottom: '20px', marginTop: '4px' }}>One-time · Instant delivery · Worth thousands</div>
                    <button style={{ ...S.btnGold, fontSize: '15px', padding: '15px 48px', opacity: loading ? 0.7 : 1 }} onClick={handleCheckout} disabled={loading}>
                      {loading ? 'Redirecting...' : '🔒 Pay & Generate My Script'}
                    </button>
                    <div style={{ fontSize: '11px', color: C.muted, marginTop: '10px' }}>Powered by Stripe · Secure payment</div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: C.green, fontWeight: '700', marginBottom: '16px', fontSize: '14px' }}>✓ Payment confirmed!</div>
                    <button style={{ ...S.btnGold, fontSize: '15px', padding: '15px 48px', opacity: loading ? 0.7 : 1 }} onClick={generate} disabled={loading}>
                      {loading ? '⟳ Generating your scripts...' : '⚡ Generate My Negotiation Script'}
                    </button>
                  </div>
                )}
                {error && <p style={{ color: C.red, textAlign: 'center', marginTop: '12px', fontSize: '13px' }}>{error}</p>}
              </div>
            </div>
          )}

          {/* ── STEP 2: Results ── */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: C.gold, letterSpacing: '0.12em', marginBottom: '10px' }}>YOUR NEGOTIATION PACKAGE</div>
                <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: '900', fontFamily: serif, color: C.navy, lineHeight: 1.1, margin: 0 }}>
                  Ready to negotiate {form.targetSalary || 'your target'}
                </h1>
              </div>
              <Results data={result} form={form} onRestart={() => { setStep(0); setResult(null); setPaid(false) }} />
            </div>
          )}
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 32px' }}>
          <UpsellBar current="salary" />
        </div>
                <div style={{ textAlign: 'center', padding: '24px', color: C.borderDark, fontSize: '12px', borderTop: `1px solid ${C.border}`, fontFamily: sans }}>
          © {new Date().getFullYear()} NegotiateAI · Powered by Claude AI
        </div>
      </div>
    </>
  )
}
