import { PostImage } from "@/types/posts"

export const createPost = async (
  text: string,
  selectedOption: string,
  images?: PostImage[]
) => {
  try {
    const res = await fetch("https://localhost:3000/api/posts", {
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
