import prisma from '@/utils/prisma'

export const findRetweet = async (postId: string, userId: string) => {
  return await prisma.retweets.findFirst({
    where: {
      postId,
      authorId: userId,
    },
  })
}

export const createRetweet = async (postId: string, userId: string) => {
  return await prisma.retweets.create({
    data: {
      postId,
      authorId: userId,
      text: '',
    },
  })
}

export const deleteRetweeet = async (retweetId: string) => {
  return await prisma.retweets.delete({
    where: {
      id: retweetId,
    },
  })
}
