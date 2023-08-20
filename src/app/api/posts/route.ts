import { type NextRequest, NextResponse } from "next/server"
import {
  createPost,
  getPublicPosts,
  getFollowingPosts,
  getPublicPosts_withCursor,
  updatePostImages,
  getFollowingPosts_withCursor,
} from "@/actions/posts"
import { getServerSession } from "@/utils/supabase-server"
import supabase from "@/utils/supabase-server"
import { decode } from "base64-arraybuffer"
import { MAX_POSTS_PER_FETCH } from "@/const/posts"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const take = MAX_POSTS_PER_FETCH

  const cursor = searchParams.get("cursor")
  const skip = cursor === "0" ? 0 : 1
  const cursorObj = cursor === "1" ? { id: cursor } : undefined
  const postType = searchParams.get("postType") ?? undefined

  if (!cursorObj) {
    if (postType !== "following") {
      const posts = await getPublicPosts(skip, take)
      return NextResponse.json({
        posts,
        nextId: posts.length < take ? undefined : posts[take - 1].id,
      })
    }
    const session = await getServerSession()
    const userId = session?.user.id
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }
    const posts = await getFollowingPosts(userId, skip, take)
    return NextResponse.json({
      posts,
      nextId: posts.length < take ? undefined : posts[take - 1].id,
    })
  }

  if (postType !== "following") {
    const posts = await getPublicPosts_withCursor(skip, take, cursorObj)
    return NextResponse.json({
      posts,
      nextId: posts.length < take ? undefined : posts[take - 1].id,
    })
  }

  const session = await getServerSession()
  const userId = session?.user.id
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  const posts = await getFollowingPosts_withCursor(
    userId,
    skip,
    take,
    cursorObj
  )

  return NextResponse.json({
    posts,
    nextId: posts.length < take ? undefined : posts[take - 1].id,
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

    const session = await getServerSession()

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
