import { MAX_POSTS_PER_FETCH } from "@/const/posts"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import {
  getAllUsers,
  getAllUsers_sessionRequest,
} from "@/actions/users-get-actions"
import getNextId from "@/utils/getNextId"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const cursor = searchParams.get("cursor")
  const skip = cursor && Number(cursor) !== 0 ? 1 : 0
  const cursorObj = skip === 1 && cursor ? { id: cursor } : undefined

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    try {
      const users = await getAllUsers(skip, MAX_POSTS_PER_FETCH, cursorObj)

      const nextId = getNextId(users, MAX_POSTS_PER_FETCH)

      return NextResponse.json({ users, nextId })
    } catch (e) {
      console.error(e)
      return NextResponse.error()
    }
  }

  const userId = session.user.id
  try {
    console.log(userId, skip, MAX_POSTS_PER_FETCH, cursorObj)
    const users = await getAllUsers_sessionRequest(
      skip,
      MAX_POSTS_PER_FETCH,
      userId,
      cursorObj
    )

    const nextId = getNextId(users, MAX_POSTS_PER_FETCH)

    return NextResponse.json({ users, nextId })
  } catch (e) {
    console.error(e)
    return NextResponse.error()
  }
}
