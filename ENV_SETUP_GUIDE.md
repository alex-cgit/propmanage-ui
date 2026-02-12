# Environment Setup Guide for PropManage

This guide will help you set up all the necessary API keys and environment variables for your PropManage application.

## 🚀 Quick Start (Minimum Required)

To get your app running, you only need **2 services** to start:

1. **Supabase** (Database + Auth)
2. **OpenAI or Anthropic** (AI Chat)

---

## 📋 Step-by-Step Setup

### 1. Supabase Setup (REQUIRED)

Supabase provides your database, authentication, and storage.

**Steps:**
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Dashboard" (if already logged in)
3. Create a new project (or use existing)
4. Once created, go to **Settings** → **API**
5. Copy these values to your `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Keep this secret!

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 2. AI/LLM Setup (REQUIRED - Choose One)

You need an AI service to power the chat interface.

#### Option A: OpenAI (ChatGPT)

**Steps:**
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key immediately (you won't see it again!)
5. Add to `.env.local`:

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
OPENAI_MODEL=gpt-4-turbo-preview
```

**Pricing:** Pay-as-you-go, ~$0.01 per 1K tokens

#### Option B: Anthropic Claude (Alternative)

**Steps:**
1. Go to [https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Sign in or create an account
3. Click "Create Key"
4. Copy the key
5. Add to `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
ANTHROPIC_MODEL=claude-3-sonnet-20240229
```

**Pricing:** Pay-as-you-go, similar to OpenAI

---

### 3. Payment Processing (OPTIONAL)

Only set this up when you're ready to handle rent payments.

#### Stripe Setup

**Steps:**
1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Create an account
3. Go to **Developers** → **API keys**
4. Copy both keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)
5. For webhooks:
   - Go to **Developers** → **Webhooks**
   - Add endpoint: `http://localhost:3000/api/webhooks/stripe` (for local testing)
   - Copy the **Signing secret**

```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

**Note:** Use test keys during development!

---

### 4. Email Service (OPTIONAL)

For sending notifications, password resets, etc.

#### Option A: Resend (Recommended for Next.js)

**Steps:**
1. Go to [https://resend.com](https://resend.com)
2. Sign up (free tier: 3,000 emails/month)
3. Go to **API Keys**
4. Create a new key
5. Add to `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

#### Option B: SendGrid (Alternative)

**Steps:**
1. Go to [https://signup.sendgrid.com](https://signup.sendgrid.com)
2. Create account (free tier: 100 emails/day)
3. Go to **Settings** → **API Keys**
4. Create API Key
5. Add to `.env.local`:

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

---

### 5. SMS Service (OPTIONAL)

For urgent maintenance notifications, rent reminders, etc.

#### Twilio Setup

**Steps:**
1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up (free trial credit provided)
3. Go to **Console Dashboard**
4. Copy:
   - **Account SID**
   - **Auth Token**
5. Get a phone number: **Phone Numbers** → **Buy a number**
6. Add to `.env.local`:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

---

## ✅ Verification Checklist

After setting up your environment variables, verify:

- [ ] `.env.local` file exists in project root
- [ ] All REQUIRED variables are filled in (Supabase + AI key)
- [ ] File is listed in `.gitignore` (already done ✓)
- [ ] Restart your dev server: `npm run dev`
- [ ] Check browser console for any missing env variable warnings

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use different keys for production** - Get production keys when deploying
3. **Rotate keys if exposed** - Immediately regenerate any leaked keys
4. **Use Vercel environment variables** - When deploying to Vercel, add these in the dashboard

---

## 🚀 Deploying to Vercel

When you're ready to deploy:

1. Push your code to GitHub (`.env.local` won't be included)
2. Connect your repo to Vercel
3. Go to **Settings** → **Environment Variables**
4. Add each variable from your `.env.local`
5. Deploy!

Vercel will automatically use these variables in production.

---

## 🆘 Troubleshooting

**Problem:** "NEXT_PUBLIC_SUPABASE_URL is not defined"
- **Solution:** Make sure `.env.local` is in the root directory
- Restart dev server: Stop (`Ctrl+C`) and run `npm run dev` again

**Problem:** "API key invalid"
- **Solution:** Double-check you copied the entire key (no extra spaces)
- Verify you're using the correct key type (anon vs service_role)

**Problem:** "OpenAI rate limit exceeded"
- **Solution:** You may need to add payment method in OpenAI dashboard
- Or use a lower usage model like `gpt-3.5-turbo`

---

## 📞 Need Help?

- **Supabase Docs:** https://supabase.com/docs
- **OpenAI Docs:** https://platform.openai.com/docs
- **Next.js Env Variables:** https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
