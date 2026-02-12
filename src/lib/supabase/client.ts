import { createClient } from '@supabase/supabase-js'
import { env } from '../env'

// Client-side Supabase client (uses anon key)
export const supabase = createClient(env.supabase.url, env.supabase.anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})
