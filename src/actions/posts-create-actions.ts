import prisma from "@/utils/prisma"

export const createPost = async (
  id: string,
  text: string,
  publicVisible: boolean
) => {
  return await prisma.posts.create({
    data: {
      authorId: id,
      text,
      publicVisible,
    },
  })
}
