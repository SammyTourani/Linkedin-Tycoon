# 🚀 Deployment Guide for LinkedIn Tycoon

This guide explains how to deploy LinkedIn Tycoon to GitHub Pages and other platforms.

## 📋 Table of Contents
- [GitHub Pages (Recommended)](#github-pages-recommended)
- [Alternative Hosting Options](#alternative-hosting-options)
- [Custom Domain Setup](#custom-domain-setup)
- [Troubleshooting](#troubleshooting)

---

## 🌐 GitHub Pages (Recommended)

GitHub Pages is **free, fast, and automatic**. Perfect for this game!

### Method 1: Automatic Deployment (Using GitHub Actions)

**This is already set up!** Every push to `main` automatically deploys.

#### How it works:
1. You push code to `main` branch
2. GitHub Actions runs the workflow (`.github/workflows/deploy.yml`)
3. Game is built and deployed to GitHub Pages
4. Live at: `https://sammytourani.github.io/Linkedin-Tycoon/`

#### First-Time Setup:
1. Go to your repo **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. That's it! Next push will deploy automatically.

#### Check Deployment Status:
- Go to **Actions** tab in your repo
- See build and deployment progress
- Green checkmark = successful deployment ✅

---

### Method 2: Manual Deployment

If you prefer manual control:

```bash
# 1. Build the project
npm run build

# 2. Deploy to gh-pages branch
npm run deploy

# Or manually with git subtree
git subtree push --prefix dist origin gh-pages
```

Then configure GitHub Pages:
- Settings → Pages
- Source: **Deploy from a branch**
- Branch: `gh-pages` / root

---

## 🔧 Alternative Hosting Options

### Netlify

**Free tier includes:**
- Automatic deployments
- Custom domains
- SSL certificates
- CDN

**Steps:**
1. Create account at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import existing project"
3. Connect GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: leave empty
5. Click "Deploy site"

**Custom build settings:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Vercel

**Free tier includes:**
- Instant deployments
- Custom domains
- Analytics
- CDN

**Steps:**
1. Create account at [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import GitHub repository
4. Framework: **Vite**
5. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

**Configuration:**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

### Cloudflare Pages

**Free tier includes:**
- Unlimited bandwidth
- Custom domains
- Analytics
- DDoS protection

**Steps:**
1. Create account at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Click "Create a project"
3. Connect GitHub
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy

---

### itch.io (Game Platform)

Perfect for reaching gamers!

**Steps:**
1. Create account at [itch.io](https://itch.io)
2. Click "Upload new project"
3. Build your game: `npm run build`
4. Zip the `dist` folder
5. Upload zip file
6. Set as "HTML" project
7. Check "This file will be played in the browser"
8. Publish!

---

## 🌍 Custom Domain Setup

### GitHub Pages with Custom Domain

**Steps:**
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In your domain provider's DNS settings:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: sammytourani.github.io
   ```
3. In GitHub repo → Settings → Pages
4. Enter custom domain: `yourdomain.com`
5. Check "Enforce HTTPS"
6. Wait for DNS propagation (up to 24 hours)

### Update vite.config.js for custom domain:
```javascript
export default defineConfig({
  base: '/', // Change from '/Linkedin-Tycoon/' to '/'
  // ... rest of config
});
```

---

## 🐛 Troubleshooting

### Issue: "Page not found" (404)

**Solution:**
- Check GitHub Pages is enabled in Settings
- Verify source is set correctly
- Wait a few minutes for deployment
- Clear browser cache

### Issue: Assets not loading

**Solution:**
- Check `base` in `vite.config.js` matches your deployment path
- For GitHub Pages: `base: '/Linkedin-Tycoon/'`
- For custom domain: `base: '/'`
- Rebuild after changing: `npm run build`

### Issue: Build fails

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building locally
npm run build

# Check for errors in console
```

### Issue: Sounds not playing

**Solution:**
- Check audio files are in correct location
- Verify paths in code match actual file locations
- Browser might block autoplay - user interaction required
- Check browser console for loading errors

### Issue: Game runs locally but not on deployment

**Solution:**
- Check file paths (case-sensitive!)
- Verify all assets are included in build
- Check browser console for errors
- Test with `npm run preview` before deploying

---

## ✅ Pre-Deployment Checklist

Before deploying, verify:

- [ ] Game runs without errors locally
- [ ] All assets load correctly
- [ ] Tested on multiple browsers
- [ ] Tested fullscreen mode
- [ ] Save/load functionality works
- [ ] Audio plays correctly
- [ ] No console errors
- [ ] Build command succeeds: `npm run build`
- [ ] Preview build works: `npm run preview`
- [ ] Updated version in `package.json`
- [ ] Updated README if needed
- [ ] Committed all changes

---

## 📊 Monitoring Your Deployment

### GitHub Pages Analytics

View deployment status:
1. Repo → **Insights** → **Traffic**
2. See views, clones, referrers
3. Track popularity over time

### Third-Party Analytics

Add Google Analytics or Plausible:

```html
<!-- Add to index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🎉 You're Live!

After successful deployment:

1. **Share your game:**
   - Reddit: r/WebGames, r/incremental_games
   - Twitter/X with #indiegame #gamedevelopment
   - LinkedIn (naturally!)
   - Itch.io community

2. **Update README badges** with live link

3. **Monitor feedback** from users

4. **Iterate and improve** based on feedback

---

## 📞 Need Help?

- Check [GitHub Pages docs](https://docs.github.com/pages)
- Open an issue on GitHub
- Check deployment logs in Actions tab
- Review Vite documentation

---

**Happy Deploying! 🚀**

*Your game is now accessible to players worldwide!*
