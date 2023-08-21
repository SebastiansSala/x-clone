import { type NextRequest, NextResponse } from "next/server"
import { updatePostLikes } from "@/actions/posts-update-actions"
import { serverUser } from "@/utils/supabase-server"

export async function PUT(req: NextRequest) {
  const postId = req.cookies.get("postId")

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
