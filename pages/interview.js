import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

// ── Design tokens ──────────────────────────────────────────────────────────────
const C = {
  bg: '#080c08',
  surface: '#0d120d',
  border: '#1a2e1a',
  green: '#22c55e',
  greenDim: '#16a34a',
  greenFaint: 'rgba(34,197,94,0.08)',
  greenGlow: 'rgba(34,197,94,0.15)',
  text: '#d4f0d4',
  muted: '#4a7a4a',
  white: '#f0faf0',
  red: '#ef4444',
  yellow: '#fbbf24',
  amber: '#f59e0b',
}

const mono = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
const sans = "'Syne', 'DM Sans', sans-serif"

const S = {
  page: { minHeight: '100vh', background: C.bg, fontFamily: mono, color: C.text },
  nav: {
    padding: '0 32px', height: '56px', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`,
    background: 'rgba(0,0,0,0.6)', position: 'sticky', top: 0, zIndex: 100,
  },
  logo: { fontSize: '15px', fontWeight: '700', color: C.green, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '10px' },
  body: { maxWidth: '760px', margin: '0 auto', padding: '40px 20px' },
  card: {
    background: C.surface, border: `1px solid ${C.border}`,
    borderRadius: '10px', padding: '28px', marginBottom: '18px',
  },
  label: { display: 'block', fontSize: '11px', fontWeight: '700', color: C.green, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' },
  input: {
    width: '100%', padding: '10px 14px', background: C.bg,
    border: `1px solid ${C.border}`, borderRadius: '6px',
    color: C.text, fontSize: '13px', outline: 'none',
    boxSizing: 'border-box', fontFamily: mono, transition: 'border-color 0.15s',
  },
  textarea: {
    width: '100%', padding: '10px 14px', background: C.bg,
    border: `1px solid ${C.border}`, borderRadius: '6px',
    color: C.text, fontSize: '13px', outline: 'none',
    boxSizing: 'border-box', fontFamily: mono, resize: 'vertical', lineHeight: '1.6',
  },
  btnPrimary: {
    background: C.green, color: '#020f02', border: 'none', borderRadius: '6px',
    padding: '12px 28px', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
    fontFamily: mono, letterSpacing: '0.05em', transition: 'opacity 0.15s',
  },
  btnSecondary: {
    background: 'transparent', color: C.green, border: `1px solid ${C.greenDim}`,
    borderRadius: '6px', padding: '11px 22px', fontSize: '13px',
    fontWeight: '600', cursor: 'pointer', fontFamily: mono,
  },
  fg: { marginBottom: '18px' },
}

const CATEGORIES = ['Behavioral', 'Technical', 'Situational', 'Leadership', 'Culture Fit']

// ── Blinking cursor ────────────────────────────────────────────────────────────
function Cursor() {
  const [on, setOn] = useState(true)
  useEffect(() => { const t = setInterval(() => setOn(v => !v), 530); return () => clearInterval(t) }, [])
  return <span style={{ color: C.green, opacity: on ? 1 : 0 }}>█</span>
}

// ── Score badge ────────────────────────────────────────────────────────────────
function ScoreBadge({ score }) {
  const color = score >= 8 ? C.green : score >= 6 ? C.yellow : C.red
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color, flexShrink: 0 }}>
        {score}
      </div>
      <span style={{ fontSize: '11px', color: C.muted }}>/ 10</span>
    </div>
  )
}

// ── Chat bubble ────────────────────────────────────────────────────────────────
function Bubble({ role, content, score, feedback, ideal, streaming }) {
  const isCoach = role === 'coach'
  return (
    <div style={{ marginBottom: '20px', display: 'flex', flexDirection: isCoach ? 'row' : 'row-reverse', gap: '12px', alignItems: 'flex-start' }}>
      {/* Avatar */}
      <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: isCoach ? C.greenFaint : 'rgba(255,255,255,0.04)', border: `1px solid ${isCoach ? C.greenDim : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>
        {isCoach ? '🤖' : '👤'}
      </div>
      <div style={{ maxWidth: '88%' }}>
        <div style={{ fontSize: '10px', color: C.muted, marginBottom: '6px', letterSpacing: '0.08em' }}>
          {isCoach ? 'INTERVIEW COACH' : 'YOU'} {!isCoach && score !== undefined && <ScoreBadge score={score} />}
        </div>
        {/* Main bubble */}
        <div style={{ background: isCoach ? C.greenFaint : 'rgba(255,255,255,0.03)', border: `1px solid ${isCoach ? C.border : 'rgba(255,255,255,0.07)'}`, borderRadius: isCoach ? '4px 12px 12px 12px' : '12px 4px 12px 12px', padding: '14px 18px', fontSize: '13px', lineHeight: '1.7', color: isCoach ? C.text : '#c8e8c8' }}>
          {content}{streaming && <Cursor />}
        </div>
        {/* Feedback */}
        {feedback && (
          <div style={{ marginTop: '10px', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '8px', padding: '12px 16px' }}>
            <div style={{ fontSize: '10px', color: C.amber, fontWeight: '700', letterSpacing: '0.1em', marginBottom: '6px' }}>▸ COACH FEEDBACK</div>
            <div style={{ fontSize: '12px', color: '#e0d080', lineHeight: '1.65' }}>{feedback}</div>
          </div>
        )}
        {ideal && (
          <div style={{ marginTop: '8px', background: 'rgba(34,197,94,0.05)', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '12px 16px' }}>
            <div style={{ fontSize: '10px', color: C.green, fontWeight: '700', letterSpacing: '0.1em', marginBottom: '6px' }}>✦ IDEAL ANSWER FRAMEWORK</div>
            <div style={{ fontSize: '12px', color: C.muted, lineHeight: '1.65' }}>{ideal}</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Progress bar ───────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '11px', color: C.muted }}>QUESTION {current} OF {total}</span>
        <span style={{ fontSize: '11px', color: C.green, fontWeight: '700' }}>{pct}% COMPLETE</span>
      </div>
      <div style={{ height: '4px', background: C.border, borderRadius: '2px' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${C.greenDim}, ${C.green})`, borderRadius: '2px', transition: 'width 0.5s ease' }} />
      </div>
    </div>
  )
}

// ── Session summary ────────────────────────────────────────────────────────────
function Summary({ exchanges, role, onRestart }) {
  const scores = exchanges.filter(e => e.score !== undefined).map(e => e.score)
  const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 'N/A'
  const color = avg >= 8 ? C.green : avg >= 6 ? C.yellow : C.red

  return (
    <div>
      {/* Hero */}
      <div style={{ ...S.card, background: 'linear-gradient(135deg, #0d1f0d, #091409)', border: `1px solid ${C.greenDim}`, textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', color: C.green, letterSpacing: '0.12em', fontWeight: '700', marginBottom: '12px' }}>SESSION COMPLETE</div>
        <div style={{ fontSize: '64px', fontWeight: '900', color, lineHeight: 1, marginBottom: '8px' }}>{avg}</div>
        <div style={{ fontSize: '13px', color: C.muted, marginBottom: '20px' }}>AVERAGE SCORE OUT OF 10</div>
        <div style={{ fontSize: '15px', color: C.text }}>
          {avg >= 8 ? '🏆 Outstanding — you\'re interview-ready!' : avg >= 6 ? '📈 Solid performance — a few tweaks and you\'ll nail it.' : '🔧 Good start — keep practicing, you\'ll get there.'}
        </div>
      </div>

      {/* Per-question breakdown */}
      <div style={S.card}>
        <div style={{ fontSize: '11px', color: C.green, fontWeight: '700', letterSpacing: '0.1em', marginBottom: '18px' }}>▸ QUESTION BREAKDOWN</div>
        {exchanges.map((ex, i) => ex.score !== undefined && (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', color: C.white, fontWeight: '600', flex: 1 }}>Q{i + 1}: {ex.question}</div>
              <ScoreBadge score={ex.score} />
            </div>
            {ex.feedback && <div style={{ fontSize: '12px', color: C.muted, lineHeight: '1.6' }}>{ex.feedback}</div>}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button style={S.btnPrimary} onClick={onRestart}>↺ Start New Session</button>
        <a href="/builder" style={{ ...S.btnSecondary, textDecoration: 'none', padding: '11px 22px' }}>📄 Build Resume Too</a>
        <a href="/linkedin" style={{ ...S.btnSecondary, textDecoration: 'none', padding: '11px 22px' }}>💼 Optimize LinkedIn</a>
      </div>
    </div>
  )
}

// ── Main App ───────────────────────────────────────────────────────────────────

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

export default function InterviewCoach() {
  const router = useRouter()
  const [phase, setPhase] = useState('setup')   // setup | paying | session | summary
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)
  const [checkingPayment, setCheckingPayment] = useState(false)
  const [error, setError] = useState('')

  // Setup form
  const [form, setForm] = useState({
    role: '', company: '', industry: '', experience: '',
    jobDesc: '', focus: 'Behavioral', numQuestions: '8',
  })

  // Session state
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [exchanges, setExchanges] = useState([])
  const [userAnswer, setUserAnswer] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamText, setStreamText] = useState('')
  const chatEndRef = useRef(null)

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
        .then(d => { if (d.paid) { setPaid(true); setPhase('setup') } setCheckingPayment(false) })
        .catch(() => setCheckingPayment(false))
    }
  }, [router.query])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [exchanges, streamText])

  const handleCheckout = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/checkout-interview', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: form }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError('Could not start checkout.')
    } catch { setError('Something went wrong.') }
    setLoading(false)
  }

  const startSession = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: form }),
      })
      const data = await res.json()
      if (data.questions) {
        setQuestions(data.questions)
        setExchanges([{ role: 'coach', content: `Welcome! I'm your AI interview coach. We're preparing you for a ${form.role} role${form.company ? ` at ${form.company}` : ''}. I'll ask you ${data.questions.length} questions and give you detailed feedback after each answer.\n\nTake your time, answer as you would in a real interview, and I'll score and coach you on every response. Let's begin! 🎯` }])
        setCurrentQ(0)
        setPhase('session')
      } else setError('Failed to generate questions.')
    } catch { setError('Something went wrong.') }
    setLoading(false)
  }

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return
    const q = questions[currentQ]
    const answer = userAnswer.trim()
    setUserAnswer('')

    // Add user answer to chat
    setExchanges(prev => [...prev, { role: 'user', content: answer, question: q }])
    setStreaming(true); setStreamText('')

    try {
      const res = await fetch('/api/evaluate-answer', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, answer, role: form.role, focus: form.focus }),
      })
      const data = await res.json()

      setStreaming(false)
      // Update the last user exchange with score/feedback
      setExchanges(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { ...updated[updated.length - 1], score: data.score, feedback: data.feedback, ideal: data.ideal }
        return updated
      })

      const isLast = currentQ >= questions.length - 1
      if (!isLast) {
        setTimeout(() => {
          setCurrentQ(i => i + 1)
          setExchanges(prev => [...prev, { role: 'coach', content: questions[currentQ + 1] }])
        }, 600)
      } else {
        setTimeout(() => setPhase('summary'), 800)
      }
    } catch {
      setStreaming(false)
      setExchanges(prev => [...prev, { role: 'coach', content: 'Sorry, I had trouble evaluating that. Try submitting again.' }])
    }
  }

  // Add first question when session starts
  useEffect(() => {
    if (phase === 'session' && questions.length > 0 && exchanges.length === 1) {
      setTimeout(() => {
        setExchanges(prev => [...prev, { role: 'coach', content: questions[0] }])
      }, 700)
    }
  }, [phase, questions])

  if (checkingPayment) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg }}>
      <div style={{ textAlign: 'center', color: C.green, fontFamily: mono }}>
        <div style={{ fontSize: '24px', marginBottom: '12px' }}>⟳</div>
        <div>VERIFYING PAYMENT...</div>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>InterviewOS — AI Interview Coach</title>
        <meta name="description" content="Practice job interviews with AI. Get scored answers, detailed feedback, and coaching on every response." />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={S.page}>

        {/* Nav */}
        <nav style={S.nav}>
          <div style={S.logo}>
            <span style={{ fontSize: '18px' }}>⬛</span>
            <span>Interview<span style={{ color: C.white }}>OS</span></span>
          </div>
          {phase === 'session' && questions.length > 0 && (
            <div style={{ fontSize: '11px', color: C.muted }}>
              Q{currentQ + 1}/{questions.length} · <span style={{ color: form.focus === 'Behavioral' ? C.green : C.amber }}>{form.focus}</span>
            </div>
          )}
          <a href="/" style={{ fontSize: '11px', color: C.muted, textDecoration: 'none', letterSpacing: '0.08em' }}>← ALL TOOLS</a>
        </nav>

        <div style={S.body}>

          {/* ── SETUP ── */}
          {phase === 'setup' && (
            <div>
              <div style={{ marginBottom: '36px' }}>
                <div style={{ fontSize: '11px', color: C.green, fontWeight: '700', letterSpacing: '0.12em', marginBottom: '10px' }}>▸ INITIALIZE SESSION</div>
                <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '800', letterSpacing: '-0.03em', fontFamily: sans, color: C.white, marginBottom: '10px', lineHeight: 1.1 }}>
                  AI Interview Coach
                </h1>
                <p style={{ fontSize: '14px', color: C.muted, lineHeight: '1.6' }}>
                  Practice with a real AI coach. Get scored, get feedback, get hired.
                </p>
              </div>

              <div style={S.card}>
                <div style={{ fontSize: '11px', color: C.green, fontWeight: '700', letterSpacing: '0.1em', marginBottom: '18px' }}>▸ TARGET ROLE</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                  {[['Job Title / Role', 'role', 'e.g. Product Manager'], ['Company (optional)', 'company', 'e.g. Google, any startup']].map(([l, k, p]) => (
                    <div key={k} style={S.fg}>
                      <label style={S.label}>{l}</label>
                      <input style={S.input} placeholder={p} value={form[k]} onChange={e => set(k, e.target.value)} onFocus={e => e.target.style.borderColor = C.green} onBlur={e => e.target.style.borderColor = C.border} />
                    </div>
                  ))}
                </div>
                <div style={S.fg}>
                  <label style={S.label}>Your Experience Level</label>
                  <input style={S.input} placeholder="e.g. 5 years in product, previously at fintech startups" value={form.experience} onChange={e => set('experience', e.target.value)} onFocus={e => e.target.style.borderColor = C.green} onBlur={e => e.target.style.borderColor = C.border} />
                </div>
                <div style={S.fg}>
                  <label style={S.label}>Job Description (optional but recommended)</label>
                  <textarea style={{ ...S.textarea, minHeight: '80px' }} placeholder="Paste the job description to get highly tailored questions..." value={form.jobDesc} onChange={e => set('jobDesc', e.target.value)} onFocus={e => e.target.style.borderColor = C.green} onBlur={e => e.target.style.borderColor = C.border} />
                </div>
              </div>

              <div style={S.card}>
                <div style={{ fontSize: '11px', color: C.green, fontWeight: '700', letterSpacing: '0.1em', marginBottom: '18px' }}>▸ SESSION CONFIG</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                  <div style={S.fg}>
                    <label style={S.label}>Question Focus</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {CATEGORIES.map(c => (
                        <button key={c} onClick={() => set('focus', c)} style={{ background: form.focus === c ? C.green : 'transparent', color: form.focus === c ? '#020f02' : C.muted, border: `1px solid ${form.focus === c ? C.green : C.border}`, borderRadius: '4px', padding: '5px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', fontFamily: mono, letterSpacing: '0.05em', transition: 'all 0.15s' }}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={S.fg}>
                    <label style={S.label}>Number of Questions</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['5', '8', '10'].map(n => (
                        <button key={n} onClick={() => set('numQuestions', n)} style={{ background: form.numQuestions === n ? C.green : 'transparent', color: form.numQuestions === n ? '#020f02' : C.muted, border: `1px solid ${form.numQuestions === n ? C.green : C.border}`, borderRadius: '4px', padding: '5px 18px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: mono }}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Paywall */}
              {!paid ? (
                <div style={{ ...S.card, border: `1px solid ${C.greenDim}`, background: 'rgba(34,197,94,0.04)', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: C.green, letterSpacing: '0.12em', fontWeight: '700', marginBottom: '10px' }}>▸ SESSION ACCESS</div>
                  <div style={{ fontSize: '44px', fontWeight: '900', color: C.white, letterSpacing: '-0.04em', marginBottom: '4px', fontFamily: sans }}>$16.99</div>
                  <div style={{ fontSize: '13px', color: C.muted, marginBottom: '18px' }}>One-time · Unlimited replays · All question types</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '22px' }}>
                    {[`${form.numQuestions || 8} tailored questions`, 'Scored 1–10 per answer', 'Detailed feedback', 'Ideal answer framework', 'Session summary report'].map(f => (
                      <span key={f} style={{ background: C.greenFaint, color: C.green, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '3px 10px', fontSize: '11px', fontWeight: '600', letterSpacing: '0.04em' }}>✓ {f}</span>
                    ))}
                  </div>
                  <button style={{ ...S.btnPrimary, fontSize: '14px', padding: '14px 40px', opacity: loading ? 0.6 : 1 }} onClick={handleCheckout} disabled={loading}>
                    {loading ? 'REDIRECTING...' : '🔒 PAY & START COACHING'}
                  </button>
                  <div style={{ fontSize: '11px', color: C.muted, marginTop: '10px' }}>Powered by Stripe · Secure payment</div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: C.green, fontSize: '13px', fontWeight: '700', marginBottom: '16px' }}>✓ PAYMENT CONFIRMED — READY TO TRAIN</div>
                  <button style={{ ...S.btnPrimary, fontSize: '14px', padding: '14px 40px', opacity: loading ? 0.6 : 1 }} onClick={startSession} disabled={loading}>
                    {loading ? 'GENERATING QUESTIONS...' : '▸ START SESSION'}
                  </button>
                </div>
              )}
              {error && <p style={{ color: C.red, textAlign: 'center', marginTop: '12px', fontSize: '13px' }}>{error}</p>}
            </div>
          )}

          {/* ── SESSION ── */}
          {phase === 'session' && (
            <div>
              <ProgressBar current={Math.min(currentQ + 1, questions.length)} total={questions.length} />

              {/* Chat */}
              <div style={{ marginBottom: '20px' }}>
                {exchanges.map((ex, i) => (
                  <Bubble key={i} {...ex} />
                ))}
                {streaming && (
                  <Bubble role="coach" content={streamText || 'Evaluating your answer'} streaming={true} />
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Answer input */}
              {phase === 'session' && currentQ < questions.length && !streaming && exchanges.length > 0 && exchanges[exchanges.length - 1]?.role === 'coach' && (
                <div style={S.card}>
                  <div style={{ fontSize: '11px', color: C.green, fontWeight: '700', letterSpacing: '0.1em', marginBottom: '10px' }}>▸ YOUR ANSWER</div>
                  <textarea
                    style={{ ...S.textarea, minHeight: '120px', marginBottom: '14px' }}
                    placeholder="Type your answer here... speak naturally, as if in a real interview."
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    onFocus={e => e.target.style.borderColor = C.green}
                    onBlur={e => e.target.style.borderColor = C.border}
                    onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) submitAnswer() }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: C.muted }}>⌘+Enter to submit</span>
                    <button style={{ ...S.btnPrimary, opacity: userAnswer.trim() ? 1 : 0.4 }} onClick={submitAnswer} disabled={!userAnswer.trim()}>
                      SUBMIT ANSWER ▸
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── SUMMARY ── */}
          {phase === 'summary' && (
            <Summary
              exchanges={exchanges.filter(e => e.role === 'user')}
              role={form.role}
              onRestart={() => { setPhase('setup'); setExchanges([]); setQuestions([]); setCurrentQ(0) }}
            />
          )}
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px 32px' }}>
          <UpsellBar current="interview" />
        </div>
                <div style={{ textAlign: 'center', padding: '20px', color: '#1a2e1a', fontSize: '11px', borderTop: `1px solid ${C.border}`, letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} INTERVIEWOS · POWERED BY CLAUDE AI
        </div>
      </div>
    </>
  )
}
