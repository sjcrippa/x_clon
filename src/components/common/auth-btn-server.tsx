import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { AuthBtn } from './auth-btn-client'

export async function AuthBtnServer () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  return <AuthBtn session={session} />
}
