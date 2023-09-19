import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import BlockedUsersList from '@/components/blocked-users/blocked-users-list'

export default async function Page() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return redirect('/login')
  }

  const username = session.user.user_metadata.user_name

  return (
    <>
      <BlockedUsersList username={username} />
    </>
  )
}
