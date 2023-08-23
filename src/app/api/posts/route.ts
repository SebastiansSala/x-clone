import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { type NextRequest, NextResponse } from "next/server"
import { decode } from "base64-arraybuffer"

import { updatePostImages } from "@/actions/posts-update-actions"
import { createPost } from "@/actions/posts-create-actions"

import { MAX_POSTS_PER_FETCH } from "@/const/posts"
import {
  getPublicPosts,
  getPublicPosts_withCursor,
} from "@/actions/posts-get-actions"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const cursor = searchParams.get("cursor") ?? undefined

  const skip = cursor ? 1 : 0
  const cursorObj = cursor ? { id: cursor } : undefined

  const username = searchParams.get("username")

  // const postType = searchParams.get("postType") ?? undefined

  console.log(cursor, skip, cursorObj)

  const supabase = createServerComponentClient({ cookies })

  const posts = await getPublicPosts_withCursor(
    skip,
    MAX_POSTS_PER_FETCH,
    cursorObj
  )

  const nextId =
    posts.length < MAX_POSTS_PER_FETCH ? undefined : posts[posts.length - 1].id

  return NextResponse.json({ posts, nextId })
}

type imagesPost = {
  dataURL: string
  file: File
}

export const POST = async (req: NextRequest) => {
  try {
    const {
      text,
      images,
      selectedOption,
    }: { text: string; images: imagesPost[]; selectedOption: string } =
      await req.json()

    if (!text) {
      return NextResponse.json("Invalid data", { status: 400 })
    }

    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const userId = session.user.id

    const publicVisible = selectedOption === "Everyone" ? true : false

    const post = await createPost(userId, text, publicVisible)

    let imageUrls = []
    if (images.length > 0) {
      for (const image of images) {
        let index = 1

        const { data, error } = await supabase.storage
          .from("images")
          .upload(`images/${image.file.name}`, image.dataURL)
        if (error) {
          console.error("Error uploading images", error)
        }
        console.log(data)

        if (data) {
          imageUrls.push(data.path)
          index++
        }
      }
    }

    for (const imageUrl of imageUrls) {
      await updatePostImages(post.id, imageUrl)
    }

    return NextResponse.json({ post })
  } catch (e) {
    console.error(e)
    return NextResponse.error()
  }
}
