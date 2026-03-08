import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const products = [
    { emoji: '📄', brand: 'RESUMECRAFT AI', brandColor: '#c8b98a', title: 'AI Resume Builder', desc: 'Fill in your details, pay once, and get a polished ATS-optimized resume in 2 minutes.', features: ['ATS-optimized formatting', 'Achievement-focused bullets', 'Instant download / print', 'Claude AI-powered'], price: '$9.99', priceColor: '#c8b98a', href: '/builder', btnBg: 'linear-gradient(135deg, #c8b98a, #a8965a)', btnColor: '#1a1208', cardBorder: 'rgba(200,185,138,0.25)', cardBg: 'rgba(255,255,255,0.04)', btnLabel: 'Build Resume' },
    { emoji: '💼', brand: 'PROFILEPULSE AI', brandColor: '#60a5fa', title: 'LinkedIn Optimizer', desc: 'Full profile score, rewritten headline, About section, missing keywords, and action plan.', features: ['Profile score (6 dimensions)', 'Rewritten headline & about', 'Missing keywords', 'Recruiter visibility strategy'], price: '$7.99', priceColor: '#60a5fa', href: '/linkedin', btnBg: 'linear-gradient(135deg, #0a66c2, #0856a8)', btnColor: '#fff', cardBorder: 'rgba(10,102,194,0.3)', cardBg: 'rgba(10,102,194,0.08)', btnLabel: 'Optimize Profile' },
    { emoji: '🎯', brand: 'INTERVIEWOS', brandColor: '#22c55e', title: 'AI Interview Coach', desc: 'Practice with AI. Get scored answers, detailed feedback, and ideal answer frameworks.', features: ['Role-tailored questions', 'Scored 1-10 per answer', 'Feedback + ideal framework', 'Session summary report'], price: '$12.99', priceColor: '#22c55e', href: '/interview', btnBg: 'linear-gradient(135deg, #22c55e, #16a34a)', btnColor: '#020f02', cardBorder: 'rgba(34,197,94,0.2)', cardBg: 'rgba(34,197,94,0.05)', btnLabel: 'Start Coaching' },
    { emoji: '💰', brand: 'NEGOTIATEAI', brandColor: '#f0d080', title: 'Salary Negotiation Scripts', desc: 'Word-for-word scripts, objection handlers, BATNA strategy, and market analysis.', features: ['4 word-for-word scripts', 'Objection handler responses', 'BATNA & walk-away point', 'Beyond-salary perks guide'], price: '$9.99', priceColor: '#f0d080', href: '/salary', btnBg: 'linear-gradient(135deg, #c9a84c, #a8843a)', btnColor: '#0b1437', cardBorder: 'rgba(201,168,76,0.25)', cardBg: 'rgba(201,168,76,0.06)', btnLabel: 'Get Scripts' },
  ]

  return (
    <>
      <Head>
        <title>CareerCraft AI - Resume, LinkedIn, Interview and Salary Tools</title>
        <meta name="description" content="AI-powered career tools. Resume builder, LinkedIn optimizer, interview coach, and salary negotiation scripts." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>
        <nav style={{ padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ fontSize: '18px', fontWeight: '800' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[['Resume', '/builder', '#c8b98a'], ['LinkedIn', '/linkedin', '#60a5fa'], ['Interview', '/interview', '#22c55e'], ['Salary', '/salary', '#f0d080']].map(([l, h, c]) => (
              <Link key={h} href={h} style={{ color: c, textDecoration: 'none', fontSize: '12px', fontWeight: '600', padding: '6px 12px', border: `1px solid ${c}33`, borderRadius: '6px' }}>{l}</Link>
            ))}
          </div>
        </nav>

        <div style={{ maxWidth: '940px', margin: '0 auto', padding: '64px 20px 48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(200,185,138,0.08)', border: '1px solid rgba(200,185,138,0.2)', borderRadius: '20px', padding: '5px 16px', fontSize: '11px', color: '#c8b98a', letterSpacing: '0.12em', fontWeight: '700', marginBottom: '24px' }}>AI-POWERED CAREER TOOLS</div>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.04em', marginBottom: '16px' }}>
            Land Your Dream Job<br /><span style={{ color: '#c8b98a' }}>Faster Than Everyone Else</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#8a8070', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto 44px' }}>
            Four AI-powered tools covering every stage of your job search.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', textAlign: 'left', marginBottom: '20px' }}>
            {products.map((p) => (
              <div key={p.href} style={{ background: p.cardBg, border: `1px solid ${p.cardBorder}`, borderRadius: '18px', padding: '26px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '26px', marginBottom: '10px' }}>{p.emoji}</div>
                <div style={{ fontSize: '10px', color: p.brandColor, fontWeight: '700', letterSpacing: '0.1em', marginBottom: '6px' }}>{p.brand}</div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: '#f0ece0' }}>{p.title}</h2>
                <p style={{ fontSize: '13px', color: '#8a8070', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>{p.desc}</p>
                <div style={{ marginBottom: '18px' }}>
                  {p.features.map(f => <div key={f} style={{ fontSize: '12px', color: '#a09070', marginBottom: '4px' }}>{'✓ ' + f}</div>)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: p.priceColor }}>{p.price}</div>
                  <Link href={p.href} style={{ background: p.btnBg, color: p.btnColor, padding: '9px 18px', borderRadius: '7px', textDecoration: 'none', fontWeight: '700', fontSize: '13px' }}>{p.btnLabel}</Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 22px', display: 'inline-block' }}>
            <span style={{ fontSize: '14px', color: '#8a8070' }}>Bundle all 4 = <strong style={{ color: '#c8b98a' }}>$40.96 total</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', padding: '32px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap' }}>
          {[['3,200+', 'Professionals Helped'], ['< 2 min', 'Average Delivery'], ['Claude AI', 'Powered By']].map(([stat, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#c8b98a' }}>{stat}</div>
              <div style={{ fontSize: '11px', color: '#4a4535', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', padding: '18px', color: '#2a2520', fontSize: '11px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {new Date().getFullYear()} CareerCraft AI
        </div>
      </div>
    </>
  )
}
