import { getCommentInfo } from '@/actions/comments-actions'
import { getPostById } from '@/actions/posts-get-actions'
import PostPageMain from '@/components/post/post-page'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

type Props = {
  params: {
    postId: string
    commentId: string
    user_name: string
  }
}

export default async function Page({ params }: Props) {
  const { postId, commentId, user_name } = params

  const [commentInfo, postInfo] = await Promise.all([
    getCommentInfo(commentId),
    getPostById(postId),
  ])

  if (!commentInfo || !postInfo) {
    redirect('/home')
  }

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main>
      <PostPageMain postInfo={commentInfo} user={session?.user} />
    </main>
  )
}
