import { NextResponse } from 'next/server'

import { getCommentsByPostId } from '@/actions/posts-get-actions'
import getNextId from '@/utils/getNextId'

import { MAX_COMMENTS_PER_COMMENT, MAX_COMMENTS_PER_FETCH } from '@/const/posts'

import type { NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { searchParams } = new URL(req.url)

  const cursor = searchParams.get('cursor')
  const skip = cursor && Number(cursor) !== 0 ? 1 : 0
  const cursorObj = skip === 1 && cursor ? { id: cursor } : undefined

  const comments = await getCommentsByPostId(
    params.postId,
    cursorObj,
    skip,
    MAX_COMMENTS_PER_COMMENT,
    MAX_COMMENTS_PER_FETCH
  )

  const nextId = getNextId(comments, MAX_COMMENTS_PER_FETCH)

  return NextResponse.json({ comments, nextId })
}
