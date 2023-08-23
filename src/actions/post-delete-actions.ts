import prisma from "@/utils/prisma"

export const deleteLikeFromPost = async (postId: string, userId: string) => {
  return await prisma.posts.update({
    where: {
      id: postId,
    },
    data: {
      likes: {
        disconnect: {
          id: userId,
        },
      },
    },
  })
}
