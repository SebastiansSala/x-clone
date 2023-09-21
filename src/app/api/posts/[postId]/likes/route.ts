import { NextResponse } from 'next/server'

import { deleteLikeFromPost } from '@/actions/post-delete-actions'
import { updatePostLikes } from '@/actions/posts-update-actions'

import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const res = await req.json()

    const { userId } = res

    if (!userId) {
      return NextResponse.json({
        error: 'No session, userId is required',
      })
    }

    const postId = params.postId

    if (!postId) return NextResponse.json('Invalid data', { status: 400 })

    await updatePostLikes(postId, userId)

    return NextResponse.json({ message: 'Like added' })
  } catch (e) {
    return NextResponse.error()
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const res = await req.json()

    const { userId } = res

    if (!userId) {
      return NextResponse.json({
        error: 'No session, userId is required',
      })
    }

    const postId = params.postId

    if (!postId) return NextResponse.json('Invalid data', { status: 400 })

    await deleteLikeFromPost(postId, userId)

    return NextResponse.json({ message: 'Like deleted' })
  } catch (e) {
    return NextResponse.error()
  }
}
