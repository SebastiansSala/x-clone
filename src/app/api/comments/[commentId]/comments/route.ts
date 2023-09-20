import { createChildComment } from '@/actions/comments-actions'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

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
