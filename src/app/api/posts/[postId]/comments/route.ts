import { updatePostLikes } from "@/actions/posts-update-actions"
import { serverSession, serverUser } from "@/utils/supabase-server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get("postId")

  if (!postId) {
    return NextResponse.json("Invalid data", { status: 400 })
  }

  const user = await serverUser()

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  const { id, user_metadata } = user
  console.log("user", user)
  console.log("user_metadata", user_metadata)
  const { x } = user_metadata

  // const updatedPost = await updatePostLikes(postId, user.id)

  // return NextResponse.json({ updatedPost })
}
