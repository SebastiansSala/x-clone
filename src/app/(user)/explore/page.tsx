import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import UsersList from '@/components/explore/explore-users-list'

export const dynamic = 'force-dynamic'

export default async function ExplorePage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main>
      <UsersList
        username={session?.user.user_metadata.user_name}
        fetchType="explore"
      />
    </main>
  )
}
