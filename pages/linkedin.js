import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background: "#f4f6fa",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: "#0f1923",
  },
  nav: {
    background: "#fff",
    borderBottom: "1px solid #e8ecf2",
    padding: "0 40px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#0a66c2",
    letterSpacing: "-0.03em",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  body: { maxWidth: "780px", margin: "0 auto", padding: "40px 20px" },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "20px",
    border: "1px solid #e8ecf2",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  },
  sectionTitle: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#0a66c2",
    marginBottom: "18px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#0f1923",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: "#fafbfc",
    transition: "border-color 0.15s",
  },
  textarea: {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#0f1923",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: "#fafbfc",
    resize: "vertical",
    lineHeight: "1.6",
    transition: "border-color 0.15s",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #0a66c2, #0856a8)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "13px 32px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "-0.01em",
    boxShadow: "0 4px 14px rgba(10,102,194,0.35)",
    transition: "transform 0.1s, box-shadow 0.1s",
  },
  btnSecondary: {
    background: "#fff",
    color: "#0a66c2",
    border: "1.5px solid #0a66c2",
    borderRadius: "10px",
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  fg: { marginBottom: "18px" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" },
  tag: {
    display: "inline-block",
    background: "#eff6ff",
    color: "#0a66c2",
    borderRadius: "20px",
    padding: "3px 12px",
    fontSize: "12px",
    fontWeight: "600",
    marginRight: "6px",
    marginBottom: "6px",
    border: "1px solid #bfdbfe",
  },
  scoreCircle: (score) => ({
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: score >= 80 ? "#dcfce7" : score >= 60 ? "#fef9c3" : "#fee2e2",
    border: `3px solid ${score >= 80 ? "#16a34a" : score >= 60 ? "#ca8a04" : "#dc2626"}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "800",
    color: score >= 80 ? "#16a34a" : score >= 60 ? "#ca8a04" : "#dc2626",
    flexShrink: 0,
  }),
};

const steps = ["Your Profile", "Target & Goals", "Your Report"];

// ─── Section components ────────────────────────────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <div style={S.fg}>
      <label style={S.label}>{label}</label>
      {hint && <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "6px" }}>{hint}</div>}
      {children}
    </div>
  );
}

function StepDots({ step }) {
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{
            width: "24px", height: "24px", borderRadius: "50%",
            background: i < step ? "#0a66c2" : i === step ? "#fff" : "#f1f5f9",
            border: `2px solid ${i <= step ? "#0a66c2" : "#cbd5e1"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "10px", fontWeight: "700",
            color: i < step ? "#fff" : i === step ? "#0a66c2" : "#94a3b8",
          }}>
            {i < step ? "✓" : i + 1}
          </div>
          <span style={{ fontSize: "11px", color: i === step ? "#0a66c2" : "#94a3b8", fontWeight: i === step ? "700" : "400" }}>
            {s}
          </span>
          {i < steps.length - 1 && <span style={{ color: "#cbd5e1", margin: "0 4px" }}>›</span>}
        </div>
      ))}
    </div>
  );
}

// ─── Report renderer ───────────────────────────────────────────────────────────
function ReportSection({ title, icon, children }) {
  return (
    <div style={{ ...S.card, marginBottom: "16px" }}>
      <div style={{ ...S.sectionTitle, marginBottom: "14px" }}>{icon} {title}</div>
      {children}
    </div>
  );
}

function parseReport(raw) {
  try {
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

function ScoreBar({ label, score }) {
  const color = score >= 80 ? "#16a34a" : score >= 60 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>{label}</span>
        <span style={{ fontSize: "13px", fontWeight: "700", color }}>{score}/100</span>
      </div>
      <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: "3px", transition: "width 1s ease" }} />
      </div>
    </div>
  );
}

function Report({ data, name }) {
  if (!data) return <div style={{ color: "#ef4444", padding: "20px" }}>Could not parse report. Please try again.</div>;

  const overall = Math.round(Object.values(data.scores || {}).reduce((a, b) => a + b, 0) / Object.keys(data.scores || {}).length) || 0;

  return (
    <div>
      {/* Overall score hero */}
      <div style={{ ...S.card, background: "linear-gradient(135deg, #0a66c2, #0856a8)", color: "#fff", border: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ width: "88px", height: "88px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "3px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "26px", fontWeight: "900" }}>{overall}</span>
          </div>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", marginBottom: "4px" }}>
              {name ? `${name.split(" ")[0]}'s LinkedIn Score` : "Your LinkedIn Score"}
            </div>
            <div style={{ fontSize: "14px", opacity: 0.85 }}>
              {overall >= 80 ? "🏆 Excellent — you're in the top tier of profiles" : overall >= 60 ? "📈 Good foundation — targeted improvements can get you hired faster" : "🔧 Needs work — big wins available with these optimizations"}
            </div>
          </div>
        </div>
      </div>

      {/* Score breakdown */}
      <ReportSection title="Score Breakdown" icon="📊">
        {Object.entries(data.scores || {}).map(([k, v]) => (
          <ScoreBar key={k} label={k} score={v} />
        ))}
      </ReportSection>

      {/* Headline */}
      <ReportSection title="Optimized Headline" icon="✏️">
        <div style={{ background: "#eff6ff", borderRadius: "10px", padding: "16px 20px", marginBottom: "12px" }}>
          <div style={{ fontSize: "11px", color: "#0a66c2", fontWeight: "700", marginBottom: "6px", letterSpacing: "0.06em" }}>SUGGESTED HEADLINE</div>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f1923", lineHeight: "1.4" }}>{data.headline}</div>
        </div>
        <div style={{ fontSize: "13px", color: "#6b7280" }}>{data.headlineReason}</div>
      </ReportSection>

      {/* About section */}
      <ReportSection title="Optimized About Section" icon="📝">
        <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "16px 20px", marginBottom: "12px", fontSize: "14px", color: "#374151", lineHeight: "1.7", whiteSpace: "pre-wrap" }}>
          {data.about}
        </div>
        <div style={{ fontSize: "13px", color: "#6b7280" }}>{data.aboutTips}</div>
      </ReportSection>

      {/* Keywords */}
      <ReportSection title="Missing Keywords to Add" icon="🔍">
        <div style={{ marginBottom: "12px" }}>
          {(data.keywords || []).map(k => <span key={k} style={S.tag}>{k}</span>)}
        </div>
        <div style={{ fontSize: "13px", color: "#6b7280" }}>{data.keywordTip}</div>
      </ReportSection>

      {/* Action items */}
      <ReportSection title="Top Action Items" icon="🎯">
        {(data.actions || []).map((a, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#eff6ff", color: "#0a66c2", fontSize: "12px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {i + 1}
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f1923", marginBottom: "2px" }}>{a.title}</div>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>{a.detail}</div>
            </div>
          </div>
        ))}
      </ReportSection>

      {/* Connection strategy */}
      <ReportSection title="Connection & Visibility Strategy" icon="🌐">
        <div style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7", whiteSpace: "pre-wrap" }}>{data.strategy}</div>
      </ReportSection>

      {/* Cross-sell */}
      <div style={{ ...S.card, background: "linear-gradient(135deg, #0f1923, #1e293b)", border: "none", textAlign: "center" }}>
        <div style={{ fontSize: "12px", color: "#c8b98a", letterSpacing: "0.1em", fontWeight: "700", marginBottom: "8px" }}>✦ ALSO FROM OUR SUITE</div>
        <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff", marginBottom: "8px" }}>Need a matching resume?</div>
        <div style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "20px" }}>Our AI Resume Builder creates ATS-optimized resumes that pair perfectly with your new LinkedIn profile.</div>
        <a href="/resume" style={{ background: "linear-gradient(135deg, #c8b98a, #a8965a)", color: "#1a1208", padding: "12px 28px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "14px", display: "inline-block" }}>
          Build My Resume →
        </a>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function LinkedInOptimizer() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "", currentHeadline: "", currentAbout: "",
    experience: "", skills: "", education: "",
    targetRole: "", targetIndustry: "", goals: "",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    const { session_id, paid: p } = router.query;
    if (session_id && p === "true") {
      setCheckingPayment(true);
      fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id }),
      })
        .then(r => r.json())
        .then(d => { if (d.paid) setPaid(true); setCheckingPayment(false); })
        .catch(() => setCheckingPayment(false));
    }
  }, [router.query]);

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout-linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: form }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError("Could not start checkout. Please try again.");
    } catch { setError("Something went wrong."); }
    setLoading(false);
  };

  const generateReport = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate-linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: form }),
      });
      const data = await res.json();
      if (data.report) { setReport(parseReport(data.report)); setStep(2); }
      else setError("Failed to generate. Please try again.");
    } catch { setError("Something went wrong."); }
    setLoading(false);
  };

  const fi = (k) => ({
    style: S.input,
    value: form[k],
    onChange: e => set(k, e.target.value),
    onFocus: e => e.target.style.borderColor = "#0a66c2",
    onBlur: e => e.target.style.borderColor = "#e5e7eb",
  });
  const ta = (k, h = 90) => ({
    style: { ...S.textarea, minHeight: `${h}px` },
    value: form[k],
    onChange: e => set(k, e.target.value),
    onFocus: e => e.target.style.borderColor = "#0a66c2",
    onBlur: e => e.target.style.borderColor = "#e5e7eb",
  });

  if (checkingPayment) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f6fa" }}>
      <div style={{ textAlign: "center", color: "#0a66c2" }}>
        <div style={{ fontSize: "36px", marginBottom: "16px" }}>⟳</div>
        <div style={{ fontWeight: "600" }}>Verifying your payment...</div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>ProfilePulse AI — LinkedIn Profile Optimizer</title>
        <meta name="description" content="AI-powered LinkedIn profile optimizer. Get a score, rewritten headline, about section, missing keywords, and action plan." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div style={S.page}>
        {/* Nav */}
        <nav style={S.nav}>
          <div style={S.logo}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0a66c2"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 014 0v4M12 13v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
            ProfilePulse AI
          </div>
          <StepDots step={step} />
        </nav>

        <div style={S.body}>
          {/* ── STEP 0: Profile Info ── */}
          {step === 0 && (
            <div>
              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ fontSize: "30px", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "8px" }}>
                  Optimize Your LinkedIn Profile
                </h1>
                <p style={{ color: "#6b7280", fontSize: "15px", lineHeight: "1.6" }}>
                  Paste in your current profile info. The more detail you give, the better your optimization report.
                </p>
              </div>

              <div style={S.card}>
                <div style={S.sectionTitle}>◉ Basic Info</div>
                <div style={S.grid2}>
                  <Field label="Full Name"><input placeholder="Jane Smith" {...fi("name")} /></Field>
                </div>
                <Field label="Current Headline" hint="Copy it exactly from your LinkedIn profile">
                  <input placeholder="Software Engineer at Acme Corp" {...fi("currentHeadline")} />
                </Field>
                <Field label="Current About Section" hint="Paste your full About/Summary section">
                  <textarea placeholder="I'm a passionate engineer..." {...ta("currentAbout", 110)} />
                </Field>
              </div>

              <div style={S.card}>
                <div style={S.sectionTitle}>◉ Experience & Skills</div>
                <Field label="Work Experience" hint="List your roles, companies, and key achievements">
                  <textarea placeholder="Senior Engineer @ Google (2021–now): Led team of 8, built X feature used by 2M users..." {...ta("experience", 100)} />
                </Field>
                <Field label="Top Skills" hint="List your most important skills">
                  <textarea placeholder="Python, React, AWS, Team Leadership, Product Strategy..." {...ta("skills", 60)} />
                </Field>
                <Field label="Education">
                  <input placeholder="BS Computer Science, Stanford, 2018" {...fi("education")} />
                </Field>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={S.btnPrimary} onClick={() => setStep(1)}>Continue →</button>
              </div>
            </div>
          )}

          {/* ── STEP 1: Goals ── */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ fontSize: "30px", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "8px" }}>
                  What are you optimizing for?
                </h1>
                <p style={{ color: "#6b7280", fontSize: "15px" }}>
                  This helps the AI tailor your optimization for your specific goals.
                </p>
              </div>

              <div style={S.card}>
                <div style={S.sectionTitle}>◉ Target & Goals</div>
                <Field label="Target Job Title / Role">
                  <input placeholder="Head of Product, Senior Data Scientist, Marketing Director..." {...fi("targetRole")} />
                </Field>
                <Field label="Target Industry">
                  <input placeholder="Fintech, Healthcare, SaaS, E-commerce..." {...fi("targetIndustry")} />
                </Field>
                <Field label="Primary Goal" hint="What do you most want from LinkedIn right now?">
                  <textarea placeholder="I want to get more recruiter inbound messages, land a role at a Series B startup, grow my personal brand as a thought leader in AI..." {...ta("goals", 90)} />
                </Field>
              </div>

              {/* Paywall or generate */}
              {!paid ? (
                <div style={{ background: "#fff", border: "2px solid #0a66c2", borderRadius: "16px", padding: "28px", textAlign: "center", marginBottom: "20px" }}>
                  <div style={{ fontSize: "12px", color: "#0a66c2", letterSpacing: "0.1em", fontWeight: "700", marginBottom: "8px" }}>◉ FULL OPTIMIZATION REPORT</div>
                  <div style={{ fontSize: "42px", fontWeight: "900", color: "#0f1923", letterSpacing: "-0.04em", marginBottom: "4px" }}>$16.99</div>
                  <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>One-time · Instant delivery</div>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px", marginBottom: "22px" }}>
                    {["Profile Score", "Rewritten Headline", "Full About Section", "Missing Keywords", "Action Plan", "Visibility Strategy"].map(f => (
                      <span key={f} style={S.tag}>✓ {f}</span>
                    ))}
                  </div>
                  <button
                    style={{ ...S.btnPrimary, fontSize: "16px", padding: "15px 44px", opacity: loading ? 0.7 : 1 }}
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? "Redirecting..." : "🔒 Pay & Get My Report"}
                  </button>
                  <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "10px" }}>Powered by Stripe · Secure payment</div>
                </div>
              ) : (
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <div style={{ color: "#16a34a", fontWeight: "600", marginBottom: "16px" }}>✓ Payment confirmed!</div>
                  <button
                    style={{ ...S.btnPrimary, fontSize: "16px", padding: "15px 44px", opacity: loading ? 0.7 : 1 }}
                    onClick={generateReport}
                    disabled={loading}
                  >
                    {loading ? "⟳ Analyzing your profile..." : "⚡ Generate My Report"}
                  </button>
                </div>
              )}

              {error && <p style={{ color: "#ef4444", textAlign: "center" }}>{error}</p>}
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <button style={S.btnSecondary} onClick={() => setStep(0)}>← Back</button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Report ── */}
          {step === 2 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h1 style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.03em", margin: 0 }}>Your Optimization Report</h1>
                  <p style={{ color: "#6b7280", margin: "4px 0 0", fontSize: "14px" }}>AI-personalized for your target role and goals</p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button style={S.btnSecondary} onClick={() => { setStep(0); setPaid(false); setReport(null); }}>Start Over</button>
                  <button style={S.btnPrimary} onClick={() => window.print()}>⬇ Save as PDF</button>
                </div>
              </div>
              <Report data={report} name={form.name} />
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", padding: "24px", color: "#d1d5db", fontSize: "12px", borderTop: "1px solid #e8ecf2", marginTop: "20px" }}>
          © {new Date().getFullYear()} ProfilePulse AI · Powered by Claude AI
        </div>
      </div>
    </>
  );
}
