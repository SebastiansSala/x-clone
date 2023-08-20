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

    return await res.json()
  } catch (e) {
    console.error(e)
  }
}

export const fetchPosts = async (postType: string, pageParam: string) => {
  try {
    console.log(pageParam)
    const res = await fetch(
      `http://localhost:3000/api/posts?postType=${postType}&cursor=${pageParam}`
    )
    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return await res.json()
  } catch (e) {
    console.error(e)
  }
}
