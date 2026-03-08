import Head from 'next/head'
import Link from 'next/link'

const tools = [
  { emoji: '📊', title: 'Pitch Deck Outline Generator', desc: 'A slide-by-slide investor pitch deck with speaker notes and design tips.', price: '$25.99', href: '/founders/pitch-deck', color: '#a78bfa' },
  { emoji: '📩', title: 'Investor Cold Email Generator', desc: '5 cold emails to reach VCs and angels — each with a different strategy.', price: '$16.99', href: '/founders/investor-email', color: '#818cf8' },
  { emoji: '🚀', title: 'YC Application Essay Writer', desc: 'Nail every YC application question with specific, founder-voice answers.', price: '$25.99', href: '/founders/yc-essay', color: '#c084fc' },
  { emoji: '📝', title: 'Startup One-Pager Generator', desc: 'A crisp, compelling one-pager that gets read — not skimmed.', price: '$16.99', href: '/founders/one-pager', color: '#f472b6' },
  { emoji: '🤝', title: 'Founder Cold Outreach Scripts', desc: 'Reach advisors, press, and partners with scripts that get replies.', price: '$16.99', href: '/founders/cold-outreach', color: '#34d399' },
]

export default function Founders() {
  return (
    <>
      <Head><title>FounderCraft AI — Fundraise & Build Faster</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" /></Head>
      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>
        <nav style={{ padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <Link href="/" style={{ fontSize: '18px', fontWeight: '800', textDecoration: 'none', color: '#f0ece0' }}><span style={{ color: '#c8b98a' }}>Career</span>Craft AI</Link>
          <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← All Verticals</Link>
        </nav>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 20px 48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '20px', padding: '5px 16px', fontSize: '11px', color: '#a78bfa', letterSpacing: '0.12em', fontWeight: '700', marginBottom: '24px' }}>FOUNDERCRAFT AI</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.04em', marginBottom: '16px' }}>
            Raise Money Faster<br /><span style={{ color: '#a78bfa' }}>& Build in Public Better</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#8a8070', maxWidth: '460px', margin: '0 auto 44px', lineHeight: '1.7' }}>
            AI tools for founders — pitch decks, investor emails, YC essays, and outreach scripts.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', textAlign: 'left', marginBottom: '32px' }}>
            {tools.map(t => (
              <div key={t.href} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${t.color}33`, borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{t.emoji}</div>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: t.color, marginBottom: '8px' }}>{t.title}</h2>
                <p style={{ fontSize: '13px', color: '#8a8070', lineHeight: '1.6', flex: 1, marginBottom: '16px' }}>{t.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: t.color }}>{t.price}</div>
                  <Link href={t.href} style={{ background: t.color, color: '#0d0f1a', padding: '8px 16px', borderRadius: '7px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>Get Started</Link>
                </div>
              </div>
            ))}
          </div>
          <Link href="/" style={{ fontSize: '13px', color: '#8a8070', textDecoration: 'none' }}>← See all CareerCraft AI tools</Link>
        </div>
      </div>
    </>
  )
}
