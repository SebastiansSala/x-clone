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
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

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

export const updatePostImages = async (postId: string, url: string) => {
  try {
    return await prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        images: {
          create: {
            url,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
