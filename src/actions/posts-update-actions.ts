import prisma from "@/utils/prisma"

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

export const updatePostLikes = async (
  postId: string,
  avatar_url: string,
  name: string,
  user_name: string
) => {
  try {
    return await prisma.posts.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          create: {
            avatar_url,
            name,
            user_name,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}
