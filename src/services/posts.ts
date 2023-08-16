import { PostImage } from "@/types/posts"
import prisma from "@/utils/prisma"

export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        likes: true,
        retweets: true,
        comments: true,
      },
    })
    return posts
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

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
