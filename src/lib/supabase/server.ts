import { createClient } from '@supabase/supabase-js'
import { serverEnv } from '../env'

// Server-side Supabase client (uses service role key for admin access)
// ONLY use this in API routes or server components
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  serverEnv.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
