// src/app.d.ts

import type { SupabaseClient, Session } from '@supabase/supabase-js'
import { Link, UserInfo } from '$types'

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient
      getSession(): Promise<Session | null>
      user_info: UserInfo | null
    }
    interface PageData {
      session: Session | null
      layout_links: Link[] | null
    }
    // interface Error {}
    // interface Platform {}
  }
}