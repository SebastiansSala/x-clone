import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import BlockedUsersList from '@/components/blocked-users/blocked-users-list'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return redirect('/login')
  }

  const user = session.user

  return (
    <>
      <BlockedUsersList user={user} />
    </>
  )
}
