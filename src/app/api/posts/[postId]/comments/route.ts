import { NextResponse } from 'next/server'

import { getCommentsByPostId } from '@/actions/posts-get-actions'
import { createPostComment } from '@/actions/posts-create-actions'
import getNextId from '@/utils/getNextId'

import { MAX_COMMENTS_PER_COMMENT, MAX_COMMENTS_PER_FETCH } from '@/const/posts'

import type { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { searchParams } = new URL(req.url)

  const userId = searchParams.get('userId') || ''
  const cursor = searchParams.get('cursor')
  const skip = cursor && Number(cursor) !== 0 ? 1 : 0
  const cursorObj = skip === 1 && cursor ? { id: cursor } : undefined

  const comments = await getCommentsByPostId(
    params.postId,
    userId,
    cursorObj,
    skip,
    MAX_COMMENTS_PER_FETCH,
    MAX_COMMENTS_PER_COMMENT
  )

  const nextId = getNextId(comments, MAX_COMMENTS_PER_FETCH)

  return NextResponse.json({ comments, nextId })
}

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const res = await req.json()

  const { userId, text } = res

  if (!userId || !text) {
    return NextResponse.json(
      { error: 'Missing userId or text' },
      { status: 400 }
    )
  }

  const { postId } = params

  if (!postId) {
    return NextResponse.json({ error: 'Missing postId' }, { status: 400 })
  }

  const comment = await createPostComment({ postId, userId, text })

  return NextResponse.json(comment, { status: 201 })
}
