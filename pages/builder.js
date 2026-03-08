import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const steps = ['Personal Info', 'Experience', 'Education & Skills', 'Your Resume']

const inputStyle = {
  width: '100%', padding: '10px 14px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '8px', color: '#f0ece0',
  fontSize: '14px', outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit',
}

const labelStyle = {
  display: 'block', fontSize: '11px', fontWeight: '600',
  letterSpacing: '0.08em', textTransform: 'uppercase',
  color: '#c8b98a', marginBottom: '6px',
}

const btnPrimary = {
  background: 'linear-gradient(135deg, #c8b98a, #a8965a)',
  color: '#1a1208', border: 'none', borderRadius: '8px',
  padding: '12px 28px', fontSize: '14px', fontWeight: '700',
  cursor: 'pointer', letterSpacing: '0.05em', fontFamily: 'inherit',
}

const btnSecondary = {
  background: 'transparent', color: '#c8b98a',
  border: '1px solid #c8b98a', borderRadius: '8px',
  padding: '11px 24px', fontSize: '14px', fontWeight: '600',
  cursor: 'pointer', fontFamily: 'inherit',
}

const cardStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '14px', padding: '28px', marginBottom: '20px',
}

const fg = { marginBottom: '18px' }

export default function Builder() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [checkingPayment, setCheckingPayment] = useState(false)
  const [paid, setPaid] = useState(false)
  const [resumeHTML, setResumeHTML] = useState('')
  const [error, setError] = useState('')
  const printRef = useRef(null)

  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '', linkedin: '',
    jobTitle: '', summary: '',
    experience: [{ company: '', role: '', dates: '', bullets: '' }],
    education: '', skills: '', certifications: '',
  })

  // Check for returning paid user
  useEffect(() => {
    const { session_id, paid: paidParam } = router.query
    if (session_id && paidParam === 'true') {
      setCheckingPayment(true)
      fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.paid) setPaid(true)
          setCheckingPayment(false)
        })
        .catch(() => setCheckingPayment(false))
    }
  }, [router.query])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setExp = (i, k, v) => setForm(f => {
    const exp = [...f.experience]; exp[i] = { ...exp[i], [k]: v }
    return { ...f, experience: exp }
  })
  const addExp = () => setForm(f => ({ ...f, experience: [...f.experience, { company: '', role: '', dates: '', bullets: '' }] }))

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: form }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(`Checkout error: ${data.error || 'No URL returned. Check Stripe keys in Vercel.'}`)
      }
    } catch (e) {
      setError(`Network error: ${e.message}`)
    }
    setLoading(false)
  }

  const generateResume = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: form }),
      })
      const data = await res.json()
      if (data.html) { setResumeHTML(data.html); setStep(3) }
      else setError('Failed to generate. Please try again.')
    } catch (e) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const handlePrint = () => {
    const win = window.open('', '_blank')
    win.document.write(`<!DOCTYPE html><html><head><title>${form.name || 'Resume'}</title></head><body>${resumeHTML}</body></html>`)
    win.document.close()
    win.print()
  }

  if (checkingPayment) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0f1a' }}>
        <div style={{ textAlign: 'center', color: '#c8b98a' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>✦</div>
          <div>Verifying your payment...</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>ResuméCraft AI — Build Your Resume</title>
      </Head>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0d0f1a 0%, #131824 50%, #0f1520 100%)', fontFamily: "'Palatino Linotype', Palatino, serif", color: '#f0ece0' }}>

        {/* Header */}
        <div style={{ borderBottom: '1px solid rgba(200,185,138,0.2)', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#c8b98a' }}>✦ ResuméCraft AI</div>
          </a>
          {/* Step indicators */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', opacity: i <= step ? 1 : 0.3 }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: i < step ? '#c8b98a' : 'transparent', border: `2px solid ${i <= step ? '#c8b98a' : '#444'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: i < step ? '#1a1208' : '#c8b98a' }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '11px', color: i === step ? '#c8b98a' : '#555', display: 'none' }}>{s}</span>
                {i < steps.length - 1 && <span style={{ color: '#333', fontSize: '12px' }}>›</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 20px' }}>

          {/* STEP 0 */}
          {step === 0 && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '6px' }}>Personal Information</h2>
              <p style={{ color: '#8a8070', marginBottom: '28px', fontSize: '15px' }}>Fill in your details. This takes about 3 minutes.</p>
              <div style={cardStyle}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                  {[['Full Name', 'name', 'Jane Smith'], ['Target Job Title', 'jobTitle', 'Senior Product Manager'], ['Email', 'email', 'jane@email.com'], ['Phone', 'phone', '+1 555 000 0000'], ['Location', 'location', 'New York, NY'], ['LinkedIn URL', 'linkedin', 'linkedin.com/in/jane']].map(([label, key, ph]) => (
                    <div key={key} style={fg}>
                      <label style={labelStyle}>{label}</label>
                      <input style={inputStyle} placeholder={ph} value={form[key]} onChange={e => set(key, e.target.value)} onFocus={e => e.target.style.borderColor = '#c8b98a'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                    </div>
                  ))}
                </div>
                <div style={fg}>
                  <label style={labelStyle}>Professional Summary</label>
                  <textarea style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }} placeholder="Results-driven professional with 7+ years of experience..." value={form.summary} onChange={e => set('summary', e.target.value)} onFocus={e => e.target.style.borderColor = '#c8b98a'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={btnPrimary} onClick={() => setStep(1)}>Continue →</button>
              </div>
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '6px' }}>Work Experience</h2>
              <p style={{ color: '#8a8070', marginBottom: '28px', fontSize: '15px' }}>Add your most recent roles. Be specific about achievements.</p>
              {form.experience.map((exp, i) => (
                <div key={i} style={cardStyle}>
                  <div style={{ fontSize: '11px', color: '#c8b98a', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '16px' }}>POSITION {i + 1}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                    {[['Company', 'company', 'Google'], ['Your Role', 'role', 'Product Manager'], ['Dates', 'dates', 'Jan 2021 – Present']].map(([label, key, ph]) => (
                      <div key={key} style={fg}>
                        <label style={labelStyle}>{label}</label>
                        <input style={inputStyle} placeholder={ph} value={exp[key]} onChange={e => setExp(i, key, e.target.value)} onFocus={e => e.target.style.borderColor = '#c8b98a'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                      </div>
                    ))}
                  </div>
                  <div style={fg}>
                    <label style={labelStyle}>Key Achievements & Responsibilities</label>
                    <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Led team of 12, increased DAU by 34%, launched X feature..." value={exp.bullets} onChange={e => setExp(i, 'bullets', e.target.value)} onFocus={e => e.target.style.borderColor = '#c8b98a'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                  </div>
                </div>
              ))}
              <button style={{ ...btnSecondary, width: '100%', padding: '10px', marginBottom: '20px' }} onClick={addExp}>+ Add Another Position</button>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button style={btnSecondary} onClick={() => setStep(0)}>← Back</button>
                <button style={btnPrimary} onClick={() => setStep(2)}>Continue →</button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '6px' }}>Education & Skills</h2>
              <p style={{ color: '#8a8070', marginBottom: '28px', fontSize: '15px' }}>Almost done! One last step.</p>
              <div style={cardStyle}>
                {[['Education', 'education', 'BS Computer Science, MIT, 2016\nMBA, Wharton, 2019', 80], ['Skills', 'skills', 'Product Strategy, SQL, Python, Figma, JIRA, A/B Testing...', 70]].map(([label, key, ph, h]) => (
                  <div key={key} style={fg}>
                    <label style={labelStyle}>{label}</label>
                    <textarea style={{ ...inputStyle, minHeight: `${h}px`, resize: 'vertical' }} placeholder={ph} value={form[key]} onChange={e => set(key, e.target.value)} onFocus={e => e.target.style.borderColor = '#c8b98a'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                  </div>
                ))}
                <div style={fg}>
                  <label style={labelStyle}>Certifications (optional)</label>
                  <input style={inputStyle} placeholder="PMP, AWS Certified, Google Analytics..." value={form.certifications} onChange={e => set('certifications', e.target.value)} onFocus={e => e.target.style.borderColor = '#c8b98a'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
                </div>
              </div>

              {/* Payment or Generate */}
              {!paid ? (
                <div style={{ background: 'rgba(200,185,138,0.08)', border: '1px solid rgba(200,185,138,0.25)', borderRadius: '12px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', color: '#c8b98a', letterSpacing: '0.06em', marginBottom: '8px' }}>✦ ONE-TIME PAYMENT</div>
                  <div style={{ fontSize: '40px', fontWeight: '700', color: '#f0ece0', marginBottom: '8px' }}>$9.99</div>
                  <div style={{ fontSize: '14px', color: '#8a8070', marginBottom: '20px' }}>Instant resume · Unlimited reprints · ATS-optimized</div>
                  <button style={{ ...btnPrimary, fontSize: '16px', padding: '14px 40px', opacity: loading ? 0.7 : 1 }} onClick={handleCheckout} disabled={loading}>
                    {loading ? 'Redirecting to checkout...' : '🔒 Pay & Generate Resume'}
                  </button>
                  <div style={{ fontSize: '12px', color: '#4a4535', marginTop: '12px' }}>Powered by Stripe · 100% secure</div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ color: '#7ec87e', fontSize: '14px', marginBottom: '16px' }}>✓ Payment confirmed!</div>
                  <button style={{ ...btnPrimary, fontSize: '16px', padding: '14px 40px', opacity: loading ? 0.7 : 1 }} onClick={generateResume} disabled={loading}>
                    {loading ? '✦ Generating your resume...' : '✦ Generate My Resume'}
                  </button>
                </div>
              )}

              {error && <p style={{ color: '#e07070', textAlign: 'center', marginTop: '12px' }}>{error}</p>}
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <button style={btnSecondary} onClick={() => setStep(1)}>← Back</button>
              </div>
            </div>
          )}

          {/* STEP 3 - Resume Output */}
          {step === 3 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#c8b98a', margin: 0 }}>✦ Your Resume is Ready!</h2>
                  <p style={{ color: '#8a8070', margin: '4px 0 0', fontSize: '14px' }}>AI-optimized for ATS and hiring managers</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={btnSecondary} onClick={() => { setStep(0); setPaid(false); setResumeHTML('') }}>Start Over</button>
                  <button style={btnPrimary} onClick={handlePrint}>⬇ Download / Print</button>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <div ref={printRef} dangerouslySetInnerHTML={{ __html: resumeHTML }} style={{ color: '#333' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
