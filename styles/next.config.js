/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = nextConfig
```

---

After committing all 3 files, Vercel will auto-redeploy and it should build successfully. Your repo root should then show:
```
📁 pages/
📁 styles/
📄 package.json
📄 next.config.js
