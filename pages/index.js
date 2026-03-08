import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>CareerCraft AI — Resume Builder & LinkedIn Optimizer</title>
        <meta name="description" content="AI-powered career tools. Build an ATS-optimized resume and optimize your LinkedIn profile. Land more interviews." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#0d0f1a', fontFamily: "'DM Sans', sans-serif", color: '#f0ece0' }}>

        {/* Nav */}
        <nav style={{ padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
          <div style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.03em' }}>
            <span style={{ color: '#c8b98a' }}>Career</span>Craft AI
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/builder" style={{ color: '#c8b98a', textDecoration: 'none', fontSize: '14px', fontWeight: '600', padding: '8px 16px', border: '1px solid rgba(200,185,138,0.3)', borderRadius: '8px' }}>Resume Builder</Link>
            <Link href="/salary" style={{ background: 'linear-gradient(135deg, #c9a84c, #a8843a)', color: '#0b1437', textDecoration: 'none', fontSize: '14px', fontWeight: '600', padding: '8px 16px', borderRadius: '8px' }}>Salary Scripts</Link>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '80px 20px 60px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(200,185,138,0.08)', border: '1px solid rgba(200,185,138,0.2)', borderRadius: '20px', padding: '6px 18px', fontSize: '11px', color: '#c8b98a', letterSpacing: '0.12em', fontWeight: '700', marginBottom: '28px' }}>
            ✦ AI-POWERED CAREER TOOLS
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '800', lineHeight: '1.08', letterSpacing: '-0.04em', marginBottom: '24px' }}>
            Land Your Dream Job<br />
            <span style={{ color: '#c8b98a' }}>Faster Than Everyone Else</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#8a8070', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto 50px' }}>
            Two AI-powered tools that transform your resume and LinkedIn profile into job-getting machines.
          </p>

          {/* Product Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', textAlign: 'left', maxWidth: '900px', margin: '0 auto' }}>

            {/* Resume Card */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,185,138,0.25)', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>📄</div>
              <div style={{ fontSize: '11px', color: '#c8b98a', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>RESUMÉCRAFT AI</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '12px' }}>AI Resume Builder</h2>
              <p style={{ fontSize: '14px', color: '#8a8070', lineHeight: '1.6', marginBottom: '24px' }}>
                Fill in your details, pay once, and get a polished ATS-optimized resume in 2 minutes.
              </p>
              <div style={{ marginBottom: '24px' }}>
                {['ATS-optimized formatting', 'Achievement-focused bullets', 'Instant download / print', 'Claude AI-powered'].map(f => (
                  <div key={f} style={{ fontSize: '13px', color: '#a09070', marginBottom: '6px' }}>✓ {f}</div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#c8b98a' }}>$9.99</div>
                <Link href="/builder" style={{ background: 'linear-gradient(135deg, #c8b98a, #a8965a)', color: '#1a1208', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
                  Build Resume →
                </Link>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div style={{ background: 'rgba(10,102,194,0.08)', border: '1px solid rgba(10,102,194,0.3)', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>💼</div>
              <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>PROFILEPULSE AI</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '12px' }}>LinkedIn Optimizer</h2>
              <p style={{ fontSize: '14px', color: '#8a8070', lineHeight: '1.6', marginBottom: '24px' }}>
                Get a full profile score, rewritten headline, About section, missing keywords, and action plan.
              </p>
              <div style={{ marginBottom: '24px' }}>
                {['Profile score (6 dimensions)', 'Rewritten headline & about', 'Missing keywords', 'Recruiter visibility strategy'].map(f => (
                  <div key={f} style={{ fontSize: '13px', color: '#a09070', marginBottom: '6px' }}>✓ {f}</div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#60a5fa' }}>$7.99</div>
                <Link href="/linkedin" style={{ background: 'linear-gradient(135deg, #0a66c2, #0856a8)', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
                  Optimize Profile →
                </Link>
              </div>
            </div>
          </div>

            {/* Interview Card */}
            <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>🎯</div>
              <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>INTERVIEWOS</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '12px' }}>AI Interview Coach</h2>
              <p style={{ fontSize: '14px', color: '#8a8070', lineHeight: '1.6', marginBottom: '24px' }}>
                Practice with AI. Get scored answers, detailed feedback, and ideal answer frameworks for every question.
              </p>
              <div style={{ marginBottom: '24px' }}>
                {['Role-tailored questions', 'Scored 1–10 per answer', 'Feedback + ideal framework', 'Session summary report'].map(f => (
                  <div key={f} style={{ fontSize: '13px', color: '#a09070', marginBottom: '6px' }}>✓ {f}</div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#22c55e' }}>$12.99</div>
                <Link href="/interview" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#020f02', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
                  Start Coaching →
                </Link>
              </div>
            </div>
          </div>

            {/* Salary Card */}
            <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>💰</div>
              <div style={{ fontSize: '11px', color: '#f0d080', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>NEGOTIATEAI</div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.03em', marginBottom: '12px' }}>Salary Negotiation Scripts</h2>
              <p style={{ fontSize: '14px', color: '#8a8070', lineHeight: '1.6', marginBottom: '24px' }}>
                Get word-for-word scripts, objection handlers, BATNA strategy, and a market analysis to maximize your offer.
              </p>
              <div style={{ marginBottom: '24px' }}>
                {['4 word-for-word scripts', 'Objection handler responses', 'BATNA & walk-away point', 'Beyond-salary perks guide'].map(f => (
                  <div key={f} style={{ fontSize: '13px', color: '#a09070', marginBottom: '6px' }}>✓ {f}</div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#f0d080' }}>$9.99</div>
                <Link href="/salary" style={{ background: 'linear-gradient(135deg, #c9a84c, #a8843a)', color: '#0b1437', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
                  Get Scripts →
                </Link>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '14px 24px', display: 'inline-block' }}>
            <span style={{ fontSize: '14px', color: '#8a8070' }}>{'🔥'} <strong style={{ color: '#f0ece0' }}>Bundle all 4:</strong> Resume + LinkedIn + Interview + Salary = <span style={{ color: '#c8b98a', fontWeight: '700' }}>$40.96 total</span></span>
          </div>
        </div>

        {/* Social proof */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', padding: '40px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap' }}>
          {[['3,200+', 'Professionals Helped'], ['< 2 min', 'Average Delivery'], ['Claude AI', 'Powered By']].map(([stat, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#c8b98a', letterSpacing: '-0.03em' }}>{stat}</div>
              <div style={{ fontSize: '12px', color: '#4a4535', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '20px', color: '#2a2520', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          © {new Date().getFullYear()} CareerCraft AI · Powered by Claude AI
        </div>
      </div>
    </>
  )
}
