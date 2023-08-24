import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { type NextRequest, NextResponse } from "next/server"
import { decode } from "base64-arraybuffer"

import { updatePostImages } from "@/actions/posts-update-actions"
import { createPost } from "@/actions/posts-create-actions"

import { MAX_POSTS_PER_FETCH } from "@/const/posts"
import { fetchPostFunctions } from "./postTypeFunctions"
import { getPublicPosts } from "@/actions/posts-get-actions"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const postType = searchParams.get("postType")

  if (!postType) {
    return NextResponse.json("Invalid data", { status: 400 })
  }

  const cursor = searchParams.get("cursor")
  const skip = cursor && Number(cursor) !== 0 ? 1 : 0
  const cursorObj = skip === 1 && cursor ? { id: cursor } : undefined

  if (postType === "fyp") {
    try {
      const posts = await getPublicPosts(skip, MAX_POSTS_PER_FETCH, cursorObj)
      const nextId =
        posts.length < MAX_POSTS_PER_FETCH
          ? undefined
          : posts[posts.length - 1].id

      return NextResponse.json({ posts, nextId })
    } catch (e) {
      console.error(e)
      return NextResponse.error()
    }
  }

  const username = searchParams.get("username")
  let usernameOrUserId = ""

  if (username) {
    usernameOrUserId = username
  } else {
    const supabase = createServerComponentClient({ cookies })

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const userId = session?.user.id

      if (!userId) {
        return NextResponse.json("Unauthorized", { status: 401 })
      }
      usernameOrUserId = userId
    } catch (e) {
      console.error(e)
      return NextResponse.error()
    }
  }

  try {
    const posts = await fetchPostFunctions(
      postType,
      usernameOrUserId,
      skip,
      MAX_POSTS_PER_FETCH,
      cursorObj
    )
    const nextId =
      posts.length < MAX_POSTS_PER_FETCH
        ? undefined
        : posts[posts.length - 1].id

    return NextResponse.json({ posts, nextId })
  } catch (e) {
    console.error(e)
    return NextResponse.error()
  }
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
