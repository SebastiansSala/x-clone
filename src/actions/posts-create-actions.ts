import prisma from '@/utils/prisma'

export const createPost = async (id: string, text: string) => {
  return await prisma.posts.create({
    data: {
      authorId: id,
      text,
    },
  })
}

export const createPostComment = async ({
  userId,
  text,
  postId,
}: {
  userId: string
  text: string
  postId: string
}) => {
  return prisma.comments.create({
    data: {
      text,
      authorId: userId,
      postId,
    },
  })
}
