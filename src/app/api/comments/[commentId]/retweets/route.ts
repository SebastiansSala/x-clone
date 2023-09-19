import { NextResponse } from 'next/server'

import {
  createCommentRetweet,
  findRetweetByPostIdAndUserId,
  deleteCommentRetweet,
} from '@/actions/comments-actions'

export async function POST(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  const res = await req.json()

  const { userId } = res

  if (!userId) {
    return NextResponse.json({
      error: 'No session, userId is required',
    })
  }

  const { commentId } = params

  if (!commentId) {
    return NextResponse.json({
      error: 'commentId is required',
    })
  }

  await createCommentRetweet(commentId, userId)

  return NextResponse.json({ message: 'Retweet added!' })
}

export async function DELETE(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  const res = await req.json()

  const { userId } = res

  if (!userId) {
    return NextResponse.json({
      error: 'No session, userId is required',
    })
  }

  const commentId = params.commentId

  if (!commentId) {
    return NextResponse.json({
      error: 'postId is required',
    })
  }

  const retweet = await findRetweetByPostIdAndUserId(commentId, userId)

  if (!retweet) {
    return NextResponse.json({
      error: 'Retweet not found',
    })
  }

  await deleteCommentRetweet(retweet.id)

  return NextResponse.json({ message: 'Retweet deleted!' })
}
