import Head from 'next/head'
import Link from 'next/link'

const tools = [
  { emoji: '📄', title: 'AI Resume Builder', price: '$16.99', href: '/builder', color: '#c8b98a' },
  { emoji: '💼', title: 'LinkedIn Optimizer', price: '$16.99', href: '/linkedin', color: '#60a5fa' },
  { emoji: '🎯', title: 'AI Interview Coach', price: '$16.99', href: '/interview', color: '#22c55e' },
  { emoji: '💰', title: 'Salary Negotiation Scripts', price: '$16.99', href: '/salary', color: '#f0d080' },
  { emoji: '✉️', title: 'Cover Letter Generator', price: '$16.99', href: '/cover-letter', color: '#c8b98a' },
  { emoji: '🔍', title: 'Job Description Analyzer', price: '$8.99', href: '/jd-analyzer', color: '#60a5fa' },
  { emoji: '📝', title: 'Reference Letter Writer', price: '$16.99', href: '/reference-letter', color: '#a78bfa' },
  { emoji: '📧', title: 'Cold Email Generator', price: '$16.99', href: '/cold-email', color: '#f97316' },
  { emoji: '📅', title: '30/60/90 Day Plan', price: '$16.99', href: '/90-day-plan', color: '#22c55e' },
  { emoji: '🔄', title: 'Career Change Roadmap', price: '$25.99', href: '/career-change', color: '#e879f9' },
]

export default function Careers() {
  return (
    <>
      <Head><title>CareerCraft AI — 10 Job Search Tools</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" /></Head>
      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>
        <nav style={{ padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← All Verticals</Link>
        </nav>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 20px 48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(200,185,138,0.08)', border: '1px solid rgba(200,185,138,0.2)', borderRadius: '20px', padding: '5px 16px', fontSize: '11px', color: '#c8b98a', letterSpacing: '0.12em', fontWeight: '700', marginBottom: '24px' }}>CAREERCRAFT AI — JOB SEEKERS</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 50px)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.04em', marginBottom: '16px' }}>10 Tools to Land<br /><span style={{ color: '#c8b98a' }}>Your Dream Job</span></h1>
          <p style={{ fontSize: '16px', color: '#8a8070', maxWidth: '460px', margin: '0 auto 44px', lineHeight: '1.7' }}>Every AI tool you need from application to offer letter.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', textAlign: 'left', marginBottom: '28px' }}>
            {tools.map(t => (
              <div key={t.href} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.color}33`, borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{t.emoji}</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: t.color, marginBottom: '12px', flex: 1 }}>{t.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: t.color }}>{t.price}</div>
                  <Link href={t.href} style={{ background: t.color, color: '#0d0f1a', padding: '8px 14px', borderRadius: '7px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>Start</Link>
                </div>
              </div>
            ))}
          </div>
          <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← See all CareerCraft AI verticals</Link>
        </div>
      </div>
    </>
  )
}
