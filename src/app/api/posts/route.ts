import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { type NextRequest, NextResponse } from "next/server"
import { decode } from "base64-arraybuffer"

import { updatePostImages } from "@/actions/posts-update-actions"
import { createPost } from "@/actions/posts-create-actions"
import { postTypeFunctions } from "./postTypeFunctions"

import { MAX_POSTS_PER_FETCH } from "@/const/posts"
import { PostType } from "@/types/posts"

const supabase = createServerComponentClient({ cookies })

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const cursor = searchParams.get("cursor")
  const username = searchParams.get("username")

  const skip = cursor === "0" ? 0 : 1
  const cursorObj = cursor === "1" ? { id: cursor } : undefined
  const postType = searchParams.get("postType") ?? undefined

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const userId = session?.user.id

  if (!postType && typeof postType !== "string") {
    return NextResponse.json("Invalid data", { status: 400 })
  }

  if (!postTypeFunctions.hasOwnProperty(postType)) {
    return NextResponse.json("Invalid data", { status: 400 })
  }

  let posts = [] as PostType[]

  const { withoutCursor, withCursor } = postTypeFunctions[postType]

  if (
    !username &&
    username === "" &&
    (postType === "posts" || postType === "retweets" || postType === "likes")
  ) {
    return NextResponse.json("Invalid data", { status: 400 })
  }

  if (!cursorObj) {
    posts = await withoutCursor(username || userId, skip, MAX_POSTS_PER_FETCH)
  } else {
    posts = await withCursor(
      username || userId,
      skip,
      MAX_POSTS_PER_FETCH,
      cursorObj
    )
  }

  return NextResponse.json({
    posts,
    nextId:
      posts.length < MAX_POSTS_PER_FETCH
        ? undefined
        : posts[MAX_POSTS_PER_FETCH - 1].id,
  })
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