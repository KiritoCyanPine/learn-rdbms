# GitHub Pages Deployment Guide

This guide walks you through deploying the SQL Learning Platform to GitHub Pages.

## 🚀 Automated Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys your application whenever you push to the main branch.

### Setup Steps

#### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - **Source**: GitHub Actions
4. Click **Save**

#### 2. Configure Repository Name (if different)

If your repository name is **not** `learnrdbms`, update the webpack config:

**Edit `platform/app/webpack.config.js`:**

```javascript
// Change this line (around line 8):
const publicPath =
  process.env.PUBLIC_PATH || (isProduction ? '/your-repo-name/' : '/');
```

Replace `/learnrdbms/` with `/your-actual-repo-name/`

#### 3. Push to Main Branch

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

#### 4. Wait for Deployment

1. Go to **Actions** tab in your GitHub repository
2. Watch the "Deploy to GitHub Pages" workflow run
3. Once complete, your site will be live at:
   ```
   https://yourusername.github.io/learn-rdbms/
   ```

### Workflow Details

The automated workflow (`.github/workflows/deploy.yml`):

- ✅ Triggers on push to main/master branch
- ✅ Installs Node.js and dependencies
- ✅ Builds the production bundle
- ✅ Adds `.nojekyll` file (prevents Jekyll processing)
- ✅ Deploys to GitHub Pages

## 🌐 Custom Domain Setup (Optional)

If you have a custom domain (e.g., `learn-sql.com`):

### 1. Configure DNS

Add these records to your DNS provider:

**For apex domain (learn-sql.com):**

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

**For www subdomain:**

```
CNAME www   yourusername.github.io
```

### 2. Update GitHub Settings

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter: `learn-sql.com` (or your domain)
3. Check **Enforce HTTPS** (after DNS propagates)

### 3. Build for Custom Domain

```bash
cd platform/app
npm run build:custom-domain
```

Or set environment variable:

```bash
PUBLIC_PATH=/ npm run build
```

### 4. Add CNAME file

Create `platform/app/public/CNAME`:

```
learn-sql.com
```

Update `webpack.config.js` to copy it:

```javascript
new CopyWebpackPlugin({
  patterns: [
    {
      from: 'node_modules/sql.js/dist/sql-wasm.wasm',
      to: 'sql-wasm.wasm',
    },
    {
      from: 'public/CNAME',
      to: 'CNAME',
      noErrorOnMissing: true,
    },
  ],
});
```

## 🔧 Manual Deployment (Alternative)

If you prefer manual deployment:

### 1. Build the Application

```bash
cd platform/app
npm run build
```

### 2. Deploy to gh-pages Branch

Using `gh-pages` package:

```bash
# Install gh-pages globally or as dev dependency
npm install -g gh-pages

# Deploy dist folder
cd platform/app
gh-pages -d dist
```

Or manually:

```bash
# Create gh-pages branch
git checkout --orphan gh-pages
git rm -rf .

# Copy dist contents to root
cp -r platform/app/dist/* .

# Commit and push
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force
```

### 3. Configure Pages Source

In **Settings** → **Pages**:

- **Source**: Deploy from a branch
- **Branch**: gh-pages
- **Folder**: / (root)

## 🧪 Test Before Deploying

### Local Preview

After building, test the production build locally:

```bash
cd platform/app
npm run preview
```

Open http://localhost:8080 and verify:

- ✅ All assets load correctly
- ✅ SQL.js initializes properly
- ✅ Exercises work
- ✅ MCQs function
- ✅ Progress saves to localStorage

### Test with Subdirectory Path

To simulate GitHub Pages subdirectory locally:

```bash
# Build with production path
npm run build

# Serve from subdirectory
python3 -m http.server 8080 --directory dist
# Then manually navigate to http://localhost:8080 in browser
```

## 🐛 Troubleshooting

### Assets Not Loading (404 errors)

**Problem**: JavaScript/CSS files return 404

**Solution**: Check `publicPath` in webpack.config.js matches your URL structure

```javascript
// For https://user.github.io/learn-rdbms/
publicPath: '/learn-rdbms/';

// For custom domain https://learn-sql.com/
publicPath: '/';
```

### SQL.js WASM Not Loading

**Problem**: `sql-wasm.wasm` not found

**Solution**: Ensure CopyWebpackPlugin is configured:

```javascript
new CopyWebpackPlugin({
  patterns: [
    {
      from: 'node_modules/sql.js/dist/sql-wasm.wasm',
      to: 'sql-wasm.wasm',
    },
  ],
});
```

### Blank Page After Deployment

**Possible causes:**

1. Wrong publicPath → Check webpack config
2. JavaScript errors → Open browser console (F12)
3. Cache issue → Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

**Debug:**

```bash
# Check browser console for errors
# Look for 404s or CORS errors

# Verify files in deployment
# Check Actions → Artifacts → download and inspect
```

### Workflow Fails

**Check:**

1. Node version compatibility (uses Node 20)
2. npm ci vs npm install (uses ci for clean install)
3. Build errors in Actions logs
4. Permissions settings in repository

## 📊 Deployment Checklist

Before going live:

- [ ] Repository is public (or GitHub Pages enabled for private)
- [ ] Main branch has latest changes
- [ ] GitHub Actions workflow file exists (`.github/workflows/deploy.yml`)
- [ ] Pages source set to "GitHub Actions"
- [ ] `publicPath` configured correctly for your URL
- [ ] Tested build locally with `npm run build && npm run preview`
- [ ] All exercises load and function
- [ ] MCQs work correctly
- [ ] Progress tracking saves to localStorage
- [ ] No console errors in browser
- [ ] `.nojekyll` file present in dist (prevents Jekyll processing)

## 🎉 Post-Deployment

After successful deployment:

1. **Test Live Site**: Visit your GitHub Pages URL
2. **Verify Features**:
   - Run a query on an exercise
   - Answer an MCQ
   - Refresh page - progress should persist
3. **Share**: Your SQL learning platform is live!
4. **Monitor**: Check Actions tab for deployment status

## 🔄 Update Process

To update your deployed site:

1. Make changes to your code
2. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "Update exercise content"
   git push origin main
   ```
3. GitHub Actions automatically rebuilds and redeploys
4. Changes live in ~2-3 minutes

## 📈 GitHub Actions Status Badge

Add this to your README.md to show deployment status:

```markdown
[![Deploy](https://github.com/yourusername/learn-rdbms/actions/workflows/deploy.yml/badge.svg)](https://github.com/yourusername/learn-rdbms/actions/workflows/deploy.yml)
```

## 🌍 Access Your Site

After deployment, your site will be available at:

```
https://yourusername.github.io/learn-rdbms/
```

Replace `yourusername` with your actual GitHub username.

## 🔐 Private Repository

GitHub Pages for private repositories requires GitHub Pro, Team, or Enterprise.

**Alternatives for private repos:**

- Netlify (free tier, supports private repos)
- Vercel (free tier, supports private repos)
- Cloudflare Pages (free tier)

See `DEPLOYMENT_ALTERNATIVES.md` for guides on these platforms.
