// src/app.d.ts

import type { SupabaseClient, Session } from '@supabase/supabase-js'
import { Link } from './types'

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient
      getSession(): Promise<Session | null>
    }
    interface PageData {
      session: Session | null
      layout_links: Link[] | null
    }
    // interface Error {}
    // interface Platform {}
  }
}