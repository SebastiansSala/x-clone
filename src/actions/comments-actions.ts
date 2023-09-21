import prisma from '@/utils/prisma'

export const createCommentRetweet = async (
  commentId: string,
  authorId: string
) => {
  return await prisma.retweets.create({
    data: {
      text: '',
      authorId,
      commentsId: commentId,
    },
  })
}

export const getChildCommentsByPostId = async (
  commentId: string,
  userId: string,
  cursor: { id: string } | undefined,
  skip: number,
  take: number,
  maxCommentsPerComment: number
) => {
  return await prisma.comments.findMany({
    where: {
      parentId: commentId,
      AND: {
        author: {
          blockedBy: {
            none: {
              id: userId,
            },
          },
        },
      },
    },
    include: {
      comments: {
        where: {
          author: {
            blockedBy: {
              none: {
                id: userId,
              },
            },
          },
        },
        take: maxCommentsPerComment,
        include: {
          _count: {
            select: {
              comments: true,
              likes: true,
              retweets: true,
            },
          },
          author: true,
          retweets: true,
          comments: true,
          likes: true,
          parent: true,
          image: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
          retweets: true,
        },
      },
      likes: true,
      retweets: true,
      image: true,
      author: true,
    },
    skip,
    take,
    cursor,
  })
}

export const createChildComment = async (
  commentId: string,
  authorId: string,
  text: string
) => {
  return await prisma.comments.create({
    data: {
      text,
      authorId,
      parentId: commentId,
    },
  })
}

export const findRetweetByPostIdAndUserId = async (
  postId: string,
  userId: string
) => {
  return await prisma.retweets.findFirst({
    where: {
      commentsId: postId,
      authorId: userId,
    },
  })
}

export const deleteCommentRetweet = async (retweetId: string) => {
  return await prisma.retweets.delete({
    where: {
      id: retweetId,
    },
  })
}

export const updateCommentLikes = async (commentId: string, userId: string) => {
  return await prisma.comments.update({
    where: {
      id: commentId,
    },
    data: {
      likes: {
        connect: {
          id: userId,
        },
      },
    },
  })
}

export const deleteLikeFromComment = async (
  commentId: string,
  userId: string
) => {
  return await prisma.comments.update({
    where: {
      id: commentId,
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

export const getCommentInfo = async (commentId: string) => {
  return await prisma.comments.findFirst({
    where: {
      id: commentId,
    },
    include: {
      likes: true,
      comments: true,
      author: true,
      retweets: true,
      image: true,
    },
  })
}
