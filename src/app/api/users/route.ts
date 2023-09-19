import { type NextRequest, NextResponse } from 'next/server'

import {
  getAllUsers,
  getAllUsers_sessionRequest,
  getBlockedUsers,
  getFollowers,
  getFollowing,
} from '@/actions/users-get-actions'
import getNextId from '@/utils/getNextId'

import { MAX_POSTS_PER_FETCH } from '@/const/posts'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const cursor = searchParams.get('cursor')
  const skip = cursor && Number(cursor) !== 0 ? 1 : 0
  const cursorObj = skip === 1 && cursor ? { id: cursor } : undefined
  const username = searchParams.get('username')

  if (!username) {
    try {
      const users = await getAllUsers(skip, MAX_POSTS_PER_FETCH, cursorObj)

      const nextId = getNextId(users, MAX_POSTS_PER_FETCH)

      return NextResponse.json({ users, nextId })
    } catch (e) {
      console.error(e)
      return NextResponse.error()
    }
  }

  const fetchType = searchParams.get('fetchType')

  if (fetchType === 'following') {
    const users = await getFollowing(
      skip,
      MAX_POSTS_PER_FETCH,
      username,
      cursorObj
    )

    const nextId = getNextId(users, MAX_POSTS_PER_FETCH)

    return NextResponse.json({ users, nextId })
  } else if (fetchType === 'followers') {
    const users = await getFollowers(
      skip,
      MAX_POSTS_PER_FETCH,
      username,
      cursorObj
    )

    const nextId = getNextId(users, MAX_POSTS_PER_FETCH)

    return NextResponse.json({ users, nextId })
  } else if (fetchType === 'explore') {
    const users = await getAllUsers_sessionRequest(
      skip,
      MAX_POSTS_PER_FETCH,
      username,
      cursorObj
    )

    const nextId = getNextId(users, MAX_POSTS_PER_FETCH)

    return NextResponse.json({ users, nextId })
  } else if (fetchType === 'blocked') {
    const users = await getBlockedUsers(
      skip,
      MAX_POSTS_PER_FETCH,
      username,
      cursorObj
    )

    const nextId = getNextId(users, MAX_POSTS_PER_FETCH)

    return NextResponse.json({ users, nextId })
  }
}
