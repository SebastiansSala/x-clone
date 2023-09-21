import { getPostById } from '@/actions/posts-get-actions'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params

  if (!postId) {
    return NextResponse.json({ error: 'PostId is required' }, { status: 400 })
  }

  const post = await getPostById(params.postId)

  return NextResponse.json(post)
}
