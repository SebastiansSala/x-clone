import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { getPostById } from '@/actions/posts-get-actions'
import { redirect } from 'next/navigation'
import PostPageMain from '@/components/post/post-page'

type ProfileFollowPageProps = {
  params: {
    postId: string
  }
}

export default async function ProfileFollowPage({
  params,
}: ProfileFollowPageProps) {
  const { postId } = params

  const postInfo = await getPostById(postId)

  if (!postInfo) {
    redirect('/home')
  }

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main>
      <PostPageMain postInfo={postInfo} user={session?.user} />
    </main>
  )
}
