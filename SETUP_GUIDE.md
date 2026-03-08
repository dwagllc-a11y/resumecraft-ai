# 🚀 ResuméCraft AI — Complete Setup Guide
## Go from zero to earning in ~30 minutes

---

## STEP 1: Create Your Accounts (15 min)

### A) GitHub (free) — stores your code
1. Go to https://github.com/signup
2. Create a free account
3. Click **"New repository"** → name it `resumecraft-ai` → click **Create**

### B) Vercel (free) — hosts your website
1. Go to https://vercel.com/signup
2. Sign up with your **GitHub account** (click "Continue with GitHub")
3. That's it for now — we'll deploy later

### C) Stripe (free to sign up) — takes payments
1. Go to https://stripe.com → click **Start now**
2. Fill in your info and verify your email
3. Go to **Developers → API Keys**
4. Copy your **Publishable key** (starts with `pk_live_...`)
5. Copy your **Secret key** (starts with `sk_live_...`)
6. ⚠️ Keep these secret!

### D) Anthropic API Key
1. Go to https://console.anthropic.com
2. Sign in or create account
3. Click **API Keys** → **Create Key**
4. Copy the key (starts with `sk-ant-...`)
5. ⚠️ You'll need to add credit — $5 lasts ~500 resumes

---

## STEP 2: Upload Code to GitHub (5 min)

1. Download this entire `resumecraft-ai` folder to your computer
2. Go to your GitHub repo you created
3. Click **"uploading an existing file"**
4. Drag ALL the files/folders in and click **Commit changes**

   Make sure you upload:
   - `pages/` folder (all files inside)
   - `styles/` folder
   - `package.json`
   - `next.config.js`
   - `.gitignore`
   - `.env.example`

   ⚠️ Do NOT upload `.env.local` (that contains your secret keys)

---

## STEP 3: Deploy on Vercel (5 min)

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Click **"Import"** next to your `resumecraft-ai` repo
4. Click **Deploy** (it will fail — that's ok, we need to add env vars first)
5. Go to your project → **Settings → Environment Variables**
6. Add each of these one by one:

| Variable Name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | sk-ant-xxxxx (your Anthropic key) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | pk_live_xxxxx |
| `STRIPE_SECRET_KEY` | sk_live_xxxxx |
| `NEXT_PUBLIC_APP_URL` | https://YOUR-PROJECT.vercel.app |
| `RESUME_PRICE_CENTS` | 999 (= $9.99, change as you like) |

7. Go to **Deployments** → click the 3 dots → **Redeploy**
8. Your site is LIVE! 🎉

---

## STEP 4: Set Up Stripe Webhook (5 min)

This makes sure payments are verified correctly.

1. Go to https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. URL: `https://YOUR-PROJECT.vercel.app/api/webhook`
4. Events: select `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_...`)
7. Add it to Vercel env vars as `STRIPE_WEBHOOK_SECRET`
8. Redeploy again

---

## STEP 5: Test It!

1. Visit your live site
2. Fill in fake info
3. Use Stripe test card: **4242 4242 4242 4242** (any future expiry, any CVC)
4. Make sure the resume generates!
5. When ready to go live, switch Stripe to **Live mode**

---

## 💰 Earning Tips

- **Set price**: Edit `RESUME_PRICE_CENTS` in Vercel (e.g., `1999` = $19.99)
- **Get a custom domain**: Buy one on Namecheap (~$10/yr), add in Vercel settings
- **Market it**:
  - Post in r/jobs, r/resumes on Reddit
  - Share on LinkedIn
  - Post on X/Twitter targeting job seekers
  - List on Product Hunt

## 📊 Revenue Potential
- 10 sales/month @ $9.99 = **$99/month passive**
- 50 sales/month @ $9.99 = **$499/month passive**
- 100 sales/month @ $14.99 = **$1,499/month passive**

Anthropic API cost per resume ≈ $0.01–0.03 (negligible)

---

## Need Help?
If you get stuck at any step, reach out! The most common issues are:
- Missing env variables (re-check spelling)
- Stripe in test mode (switch to live when ready)
- Anthropic account needs credits added
