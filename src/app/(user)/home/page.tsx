import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import PostSection from '@/components/post/post-section'

import { postTabs } from '@/data/tabs'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user

  return (
    <main className="text-white relative">
      <PostSection
        user={user}
        userId={user?.id}
        initialState="fyp"
        tabs={postTabs}
        isSticky={true}
      />
    </main>
  )
}
