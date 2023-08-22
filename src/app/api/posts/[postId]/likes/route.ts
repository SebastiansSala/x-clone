import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { updatePostLikes } from "@/actions/posts-update-actions"

const supabase = createServerComponentClient({ cookies })

export async function PUT(req: NextRequest) {
  const postId = req.cookies.get("postId")

  if (!postId) {
    return NextResponse.json("Invalid data", { status: 400 })
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  const { id, user_metadata } = session.user

  const { x } = user_metadata

  // const updatedPost = await updatePostLikes(postId, user.id)

  // return NextResponse.json({ updatedPost })
}
