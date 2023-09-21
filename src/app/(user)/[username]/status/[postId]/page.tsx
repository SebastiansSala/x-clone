import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import PostPageMain from '@/components/post/post-page'

import { getPostById } from '@/actions/posts-get-actions'

type ProfileFollowPageProps = {
  params: {
    postId: string
  }
}

export const dynamic = 'force-dynamic'

export default async function ProfileFollowPage({
  params,
}: ProfileFollowPageProps) {
  const { postId } = params

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main>
      <PostPageMain postId={postId} user={session?.user} />
    </main>
  )
}
