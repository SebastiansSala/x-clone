import type { ImageListType } from "react-images-uploading"

import type { PostType } from "@/types/posts"

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
  pageParam: number,
  username?: string
): Promise<{ posts: PostType[]; nextId: string }> => {
  const res = await fetch(
    `http://localhost:3000/api/posts?postType=${postType}&cursor=${pageParam}&username=${
      username ?? ""
    }`
  )
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  const data = await res.json()

  return data
}

export const addLike = async (postId: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${postId}/likes`, {
      method: "PUT",
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}
