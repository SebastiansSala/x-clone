import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import PostMain from '@/components/post-main'
import ReplyMain from '@/components/replies/reply-main'

import { getCommentInfo } from '@/actions/comments-actions'
import { getPostById } from '@/actions/posts-get-actions'

type Props = {
  params: {
    commentId: string
    username: string
  }
}

export const dynamic = 'force-dynamic'

export default async function Page({ params }: Props) {
  const { commentId, username } = params

  let newCommentId = commentId

  let allComments = []
  let lastItem = null

  while (!lastItem) {
    const commentInfo = await getCommentInfo(newCommentId)

    const parentId = commentInfo?.parentId
    const postId = commentInfo?.postId

    if (parentId) {
      allComments.push(commentInfo)
      newCommentId = parentId
    } else if (postId) {
      allComments.push(commentInfo)
      lastItem = await getPostById(postId)
    }
  }

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  allComments.forEach((comment) => {
    console.log(comment.id)
  })

  return (
    <main>
      <ul className="space-y-6">
        <PostMain post={lastItem} />
        {allComments.map((comment) => {
          return <div key={comment?.id}>{comment?.id}</div>
        })}
        <ReplyMain postInfo={allComments[0]} user={session?.user} />
      </ul>
    </main>
  )
}
