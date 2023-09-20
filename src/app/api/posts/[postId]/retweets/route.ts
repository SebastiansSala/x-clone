import { NextResponse } from 'next/server'

import {
  createRetweet,
  deleteRetweeet,
  findRetweet,
} from '@/actions/retweet-actions'

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const res = await req.json()

  const { userId } = res

  if (!userId) {
    return NextResponse.json({
      error: 'No session, userId is required',
    })
  }

  const postId = params.postId

  if (!postId) {
    return NextResponse.json({
      error: 'postId is required',
    })
  }

  const isRetweeted = await findRetweet(postId, userId)

  if (isRetweeted) {
    return NextResponse.json({
      error: 'Already retweeted',
    })
  }

  await createRetweet(postId, userId)

  return NextResponse.json({ message: 'Retweet added!' })
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const res = await req.json()

  const { userId } = res

  if (!userId) {
    return NextResponse.json({
      error: 'No session, userId is required',
    })
  }

  const postId = params.postId

  if (!postId) {
    return NextResponse.json({
      error: 'postId is required',
    })
  }

  const retweet = await findRetweet(postId, userId)

  if (!retweet) {
    return NextResponse.json({
      error: 'Retweet not found',
    })
  }

  await deleteRetweeet(retweet.id)

  return NextResponse.json({ message: 'Retweet deleted!' })
}
