import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { updatePostLikes } from "@/actions/posts-update-actions"
import { getPostById } from "@/actions/posts-get-actions"
import { deleteLikeFromPost } from "@/actions/post-delete-actions"

export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId

    if (!postId) return NextResponse.json("Invalid data", { status: 400 })

    const findPost = await getPostById(postId)

    if (!findPost) return NextResponse.json("Post not found", { status: 404 })

    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const { id, user_metadata } = session.user

    await updatePostLikes(postId, id)

    return NextResponse.json({ message: "Like added" })
  } catch (e) {
    return NextResponse.error()
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId

    if (!postId) return NextResponse.json("Invalid data", { status: 400 })

    const findPost = await getPostById(postId)

    if (!findPost) return NextResponse.json("Post not found", { status: 404 })

    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const { id } = session.user

    await deleteLikeFromPost(postId, id)

    return NextResponse.json({ message: "Like deleted" })
  } catch (e) {
    return NextResponse.error()
  }
}
