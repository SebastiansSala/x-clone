import { NextResponse } from 'next/server'

import {
  deleteLikeFromComment,
  updateCommentLikes,
} from '@/actions/comments-actions'

import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PUT(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    const res = await req.json()

    const { userId } = res

    if (!userId) {
      return NextResponse.json({
        error: 'No session, userId is required',
      })
    }

    const commentId = params.commentId

    if (!commentId) return NextResponse.json('Invalid data', { status: 400 })

    await updateCommentLikes(commentId, userId)

    return NextResponse.json({ message: 'Like added' })
  } catch (e) {
    return NextResponse.error()
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    const res = await req.json()

    const { userId } = res

    if (!userId) {
      return NextResponse.json({
        error: 'No session, userId is required',
      })
    }

    const commentId = params.commentId

    if (!commentId) return NextResponse.json('Invalid data', { status: 400 })

    await deleteLikeFromComment(commentId, userId)

    return NextResponse.json({ message: 'Like deleted' })
  } catch (e) {
    return NextResponse.error()
  }
}
