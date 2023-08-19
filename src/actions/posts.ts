import prisma from "@/utils/prisma"

export const getAllPosts = async () => {
  return await prisma.posts.findMany({
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
    },
  })
}

export const getPostsSortedByDate = async () => {
  return await prisma.posts.findMany({
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const createPrismaPost = async (
  id: string,
  text: string,
  publicVisible: boolean,
  images?: string[]
) => {
  return await prisma.posts.create({
    data: {
      authorId: id,
      text,
      publicVisible,
    },
  })
}
