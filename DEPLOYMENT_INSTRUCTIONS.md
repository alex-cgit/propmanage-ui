# Deployment Instructions for PropManage UI

## 🎯 What We've Built

A test landing page to verify the Perplexity-style design and Supabase connectivity before building the full application.

### Features Implemented:
- ✅ Test page at `/test` with various UI components
- ✅ Navigation bar with icon buttons
- ✅ Multiple button styles (primary, secondary, outline, rounded, icon)
- ✅ Form inputs (text, email, search, textarea)
- ✅ Feature cards with hover effects
- ✅ Supabase database connection
- ✅ API route to test database writes
- ✅ Real-time form submission to `test_submissions` table

## 📋 Pre-Deployment Checklist

### 1. Install Dependencies

You need to install the Supabase client library we added to `package.json`:

```bash
cd propmanage-ui
npm install
```

### 2. Test Locally

Before deploying, test the app locally:

```bash
npm run dev
```

Then visit:
- **Home page**: http://localhost:3000
- **Test page**: http://localhost:3000/test

Try submitting the form on the test page to verify Supabase connectivity.

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the project directory:
```bash
cd propmanage-ui
vercel
```

4. Follow the prompts:
   - **Set up and deploy**: Yes
   - **Which scope**: Choose your account
   - **Link to existing project**: No (this is a new project)
   - **Project name**: `propmanage-ui` or your preferred name
   - **Directory**: `./` (current directory)
   - **Override settings**: No

5. Add environment variables:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste: <your-supabase-project-url>

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste: <your-supabase-anon-key>

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste: <your-supabase-service-role-key>
```

6. Redeploy with environment variables:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: PropManage test page"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)

3. Click "Add New" → "Project"

4. Import your GitHub repository

5. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

6. Add Environment Variables:
   - Click "Environment Variables"
   - Add each variable from your `.env.local` file:
     - `NEXT_PUBLIC_SUPABASE_URL` = `<your-supabase-url>`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<your-anon-key>`
     - `SUPABASE_SERVICE_ROLE_KEY` = `<your-service-role-key>`

7. Click "Deploy"

## ✅ Post-Deployment Testing

Once deployed, test the following:

### 1. Visual Design Test
Visit `https://your-app.vercel.app/test` and verify:
- [ ] Navigation bar renders correctly
- [ ] All button styles display properly
- [ ] Form inputs have proper styling
- [ ] Feature cards have hover effects
- [ ] Dark/light mode toggle works
- [ ] Colors match the brand (#0066CC primary)

### 2. Database Connectivity Test
On the test page:
- [ ] Fill in Name and Email fields
- [ ] Click "Test Supabase Connection"
- [ ] Verify success message appears
- [ ] Check Supabase dashboard to see the new row in `test_submissions` table

### 3. Check Supabase Data
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/vdxuwfoevhczjebtaiic/editor)
2. Click on "test_submissions" table
3. Verify your test submission appears

## 📊 What to Look For

### Design Elements:
- **Typography**: Montserrat font (300-700 weights)
- **Primary Color**: #0066CC (blue)
- **Accent Colors**:
  - Teal: #00A3AD
  - Orange: #FF6B35
  - Green: #00A651
- **Border Radius**: Consistent rounded corners (12px, 16px, 24px)
- **Hover Effects**: Smooth transitions with -translate-y-0.5
- **Responsiveness**: Mobile-friendly layout

### Functionality:
- Form validation works
- API route responds correctly
- Data persists in Supabase
- Error handling displays messages

## 🐛 Troubleshooting

### Build Errors

**Error**: "Module not found: @supabase/supabase-js"
**Solution**: Run `npm install` to install dependencies

**Error**: "Environment variables not defined"
**Solution**: Check that all three env vars are set in Vercel dashboard

### Runtime Errors

**Error**: "Failed to save to database"
**Solution**:
1. Check Supabase credentials are correct
2. Verify `test_submissions` table exists
3. Check Vercel logs: `vercel logs`

**Error**: "CORS error" or "Network request failed"
**Solution**: Check API route is deployed correctly at `/api/test-submission`

## 📝 Next Steps

After verifying the test page works:

1. **Design Approval**: Confirm the look and feel matches your vision
2. **Connectivity Confirmed**: Ensure Supabase writes work correctly
3. **Build Full App**: Start implementing actual property management features
4. **Update Env Vars**: When ready for production, rotate API keys
5. **Custom Domain**: Add your custom domain in Vercel settings

## 🔗 Important Links

- **Vercel Dashboard**: https://vercel.com/alex-gits-projects
- **Supabase Dashboard**: https://supabase.com/dashboard/project/vdxuwfoevhczjebtaiic
- **GitHub Repo**: <your-repo-url>
- **Production URL**: <will-be-generated-by-vercel>

## 💡 Pro Tips

- Use `vercel dev` for local development with Vercel environment
- Check `vercel logs` if something doesn't work after deployment
- Use Vercel's automatic preview deployments for branches
- Monitor Supabase usage in the dashboard (Free tier: 500MB database, 1GB file storage, 2GB bandwidth)

---

**Ready to deploy?** Follow the steps above and let me know if you encounter any issues!
