import {
  createChildComment,
  getChildCommentsByPostId,
} from '@/actions/comments-actions'
import { MAX_COMMENTS_PER_COMMENT, MAX_COMMENTS_PER_FETCH } from '@/const/posts'
import getNextId from '@/utils/getNextId'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const { searchParams } = new URL(req.url)

  const userId = searchParams.get('userId') || ''
  const cursor = searchParams.get('cursor')
  const skip = cursor && Number(cursor) !== 0 ? 1 : 0
  const cursorObj = skip === 1 && cursor ? { id: cursor } : undefined

  const comments = await getChildCommentsByPostId(
    params.commentId,
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
  { params }: { params: { commentId: string } }
) {
  try {
    const { commentId } = params

    if (!commentId) {
      return NextResponse.json(
        { error: 'Could not create a child comment' },
        { status: 500 }
      )
    }

    const res = await req.json()

    const { userId, text } = res

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized!' }, { status: 500 })
    }

    if (!text) {
      return NextResponse.json(
        { error: 'Message is missing!' },
        { status: 500 }
      )
    }

    const comment = await createChildComment(commentId, userId, text)

    return NextResponse.json(comment, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Could not create a child comment' },
      { status: 500 }
    )
  }
}
