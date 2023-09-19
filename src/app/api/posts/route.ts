import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { createPost } from '@/actions/posts-create-actions'
import { updatePostImages } from '@/actions/posts-update-actions'

import { getPublicPosts } from '@/actions/posts-get-actions'
import { MAX_POSTS_PER_FETCH } from '@/const/posts'
import getNextId from '@/utils/getNextId'
import { fetchPostFunctions } from './postTypeFunctions'

import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const postType = searchParams.get('postType')

  if (!postType) {
    return NextResponse.json('Invalid data', { status: 400 })
  }

  const cursor = searchParams.get('cursor')
  const skip = cursor && Number(cursor) !== 0 ? 1 : 0
  const cursorObj = skip === 1 && cursor ? { id: cursor } : undefined

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (postType === 'fyp') {
    const userId = session?.user.id

    if (!userId) {
      const posts = await getPublicPosts(skip, MAX_POSTS_PER_FETCH, cursorObj)
      const nextId = getNextId(posts, MAX_POSTS_PER_FETCH)

      return NextResponse.json({ posts, nextId })
    } else {
      const posts = await getPublicPosts(
        skip,
        MAX_POSTS_PER_FETCH,
        cursorObj,
        userId
      )
      const nextId = getNextId(posts, MAX_POSTS_PER_FETCH)

      return NextResponse.json({ posts, nextId })
    }
  }

  const username = searchParams.get('username')
  let usernameOrUserId = ''

  if (username) {
    usernameOrUserId = username
  } else {
    try {
      const userId = session?.user.id

      if (!userId) {
        return NextResponse.json('Unauthorized', { status: 401 })
      }
      usernameOrUserId = userId
    } catch (e) {
      console.error(e)
      return NextResponse.error()
    }
  }

  try {
    const posts = await fetchPostFunctions(
      postType,
      usernameOrUserId,
      skip,
      MAX_POSTS_PER_FETCH,
      cursorObj
    )
    const nextId = getNextId(posts, MAX_POSTS_PER_FETCH)

    return NextResponse.json({ posts, nextId })
  } catch (e) {
    console.error(e)
    return NextResponse.error()
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
    }: { text: string; image: imagesPost; selectedOption: string } =
      await req.json()

    if (!text) {
      return NextResponse.json('Invalid data', { status: 400 })
    }

    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    const userId = session.user.id

    const post = await createPost(userId, text)

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`images/${image.file.name}`, image.dataURL)
    if (error) {
      console.error('Error uploading images', error)
    }

    await updatePostImages(post.id, image.dataURL)

    return NextResponse.json({ post })
  } catch (e) {
    console.error(e)
    return NextResponse.error()
  }
}
