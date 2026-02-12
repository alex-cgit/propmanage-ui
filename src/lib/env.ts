/**
 * Environment variable validation and access
 * This file ensures all required env vars are present and provides type-safe access
 */

// Client-side environment variables (prefixed with NEXT_PUBLIC_)
export const env = {
  // App config
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',

  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },

  // Feature flags
  features: {
    payments: process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === 'true',
    sms: process.env.NEXT_PUBLIC_ENABLE_SMS === 'true',
    documentSigning: process.env.NEXT_PUBLIC_ENABLE_DOCUMENT_SIGNING === 'true',
  },

  // Stripe (client-side key only)
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  },
}

// Server-side only environment variables
export const serverEnv = {
  // Supabase
  supabase: {
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },

  // AI/LLM
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
  },
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY || '',
    model: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
  },

  // Payments
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },

  // Email
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || '',
  },

  // SMS
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  },

  // Auth
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
  session: {
    secret: process.env.SESSION_SECRET || '',
  },
}

/**
 * Validates that all required environment variables are present
 * Call this at app startup to fail fast if config is missing
 */
export function validateEnv() {
  const errors: string[] = []

  // Required client-side vars
  if (!env.supabase.url) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL is required')
  }
  if (!env.supabase.anonKey) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is required')
  }

  // Required server-side vars (only check on server)
  if (typeof window === 'undefined') {
    if (!serverEnv.supabase.serviceRoleKey) {
      errors.push('SUPABASE_SERVICE_ROLE_KEY is required')
    }

    // Require at least one AI provider
    if (!serverEnv.openai.apiKey && !serverEnv.anthropic.apiKey) {
      errors.push(
        'Either OPENAI_API_KEY or ANTHROPIC_API_KEY is required for AI features'
      )
    }

    // Optional: Warn about missing optional services
    if (!serverEnv.resend.apiKey && !serverEnv.sendgrid.apiKey) {
      console.warn(
        '⚠️  No email service configured (RESEND_API_KEY or SENDGRID_API_KEY). Email features will be disabled.'
      )
    }

    if (env.features.payments && !serverEnv.stripe.secretKey) {
      console.warn(
        '⚠️  Payments enabled but STRIPE_SECRET_KEY not configured. Payment features will fail.'
      )
    }

    if (env.features.sms && !serverEnv.twilio.accountSid) {
      console.warn(
        '⚠️  SMS enabled but Twilio credentials not configured. SMS features will fail.'
      )
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${errors.join('\n')}\n\nSee ENV_SETUP_GUIDE.md for setup instructions.`
    )
  }

  return true
}

/**
 * Returns which AI provider is configured
 */
export function getAIProvider(): 'openai' | 'anthropic' | null {
  if (typeof window !== 'undefined') return null // Server-side only

  if (serverEnv.openai.apiKey) return 'openai'
  if (serverEnv.anthropic.apiKey) return 'anthropic'
  return null
}

/**
 * Returns which email provider is configured
 */
export function getEmailProvider(): 'resend' | 'sendgrid' | null {
  if (typeof window !== 'undefined') return null // Server-side only

  if (serverEnv.resend.apiKey) return 'resend'
  if (serverEnv.sendgrid.apiKey) return 'sendgrid'
  return null
}
