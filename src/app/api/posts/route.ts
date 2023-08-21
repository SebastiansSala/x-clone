import { type NextRequest, NextResponse } from "next/server"
import { decode } from "base64-arraybuffer"

import { serverSession } from "@/utils/supabase-server"
import supabase from "@/utils/supabase-server"

import { MAX_POSTS_PER_FETCH } from "@/const/posts"
import { PostType } from "@/types/posts"
import { createPost } from "@/actions/posts-create-actions"
import { updatePostImages } from "@/actions/posts-update-actions"
import { postTypeFunctions } from "./postTypeFunctions"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const cursor = searchParams.get("cursor")
  const username = searchParams.get("username")

  const skip = cursor === "0" ? 0 : 1
  const cursorObj = cursor === "1" ? { id: cursor } : undefined
  const postType = searchParams.get("postType") ?? undefined

  const session = await serverSession()
  const userId = session?.user.id

  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

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
    console.log("without cursor")
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

    const session = await serverSession()

    if (!session?.user) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const userId = session?.user.id

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
