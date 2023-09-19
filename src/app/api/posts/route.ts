import { NextResponse } from 'next/server'

import { createPost } from '@/actions/posts-create-actions'
import { updatePostImages } from '@/actions/posts-update-actions'

import { getPublicPosts } from '@/actions/posts-get-actions'
import { MAX_POSTS_PER_FETCH } from '@/const/posts'
import getNextId from '@/utils/getNextId'
import { fetchPostFunctions } from './postTypeFunctions'

import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const postType = searchParams.get('postType')

    if (!postType) {
      return NextResponse.json('Invalid data', { status: 400 })
    }

    const cursor = searchParams.get('cursor')
    const skip = cursor && Number(cursor) !== 0 ? 1 : 0
    const cursorObj = skip === 1 && cursor ? { id: cursor } : undefined

    const userId = searchParams.get('userId') || ''

    if (postType === 'fyp') {
      const posts = await getPublicPosts(
        skip,
        MAX_POSTS_PER_FETCH,
        cursorObj,
        userId
      )
      const nextId = getNextId(posts, MAX_POSTS_PER_FETCH)

      return NextResponse.json({ posts, nextId })
    }

    const posts = await fetchPostFunctions(
      postType,
      userId,
      skip,
      MAX_POSTS_PER_FETCH,
      cursorObj
    )
    const nextId = getNextId(posts, MAX_POSTS_PER_FETCH)

    return NextResponse.json({ posts, nextId })
  } catch (e) {
    console.error(e)
    return NextResponse.json('Error', { status: 500 })
  }
}

type imagesPost = {
  dataURL: string
  file: File
}

export const POST = async (req: NextRequest) => {
  try {
    const {
      text,
      image,
      userId,
    }: { text: string; image: imagesPost; userId: string } = await req.json()

    if (!text) {
      return NextResponse.json('Invalid data', { status: 400 })
    }

    if (!userId) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    const post = await createPost(userId, text)

    const url = image.dataURL ?? ''

    await updatePostImages(post.id, url)

    return NextResponse.json({ post })
  } catch (e) {
    console.error(e)
    return NextResponse.error()
  }
}
