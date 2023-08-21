import { PostType } from "@/types/posts"
import type { ImageListType } from "react-images-uploading"

export const createPost = async (
  text: string,
  selectedOption: string,
  images?: ImageListType[]
) => {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        images,
        selectedOption,
      }),
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const fetchPosts = async (
  postType: string,
  pageParam: string,
  username?: string
) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts?postType=${postType}&cursor=${pageParam}&username=${
        username ?? ""
      }`
    )
    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const addLike = async (postId: string) => {
  try {
    console.log(postId)
    const res = await fetch(`http://localhost:3000/api/posts/${postId}/likes`, {
      method: "PUT",
    })
    console.log(res)

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}
