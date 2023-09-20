import prisma from '@/utils/prisma'

export const getPublicPosts = async (
  skip: number,
  take: number,
  cursorObj: { id: string } | undefined,
  userId?: string
) => {
  return await prisma.posts.findMany({
    where: {
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
      author: true,
      likes: true,
      retweets: true,
      comments: true,
      image: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take,
    skip,
    cursor: cursorObj,
  })
}

export const getFollowingPosts = (
  userId: string,
  skip: number,
  take: number,
  cursorObj: { id: string } | undefined
) => {
  return prisma.posts.findMany({
    where: {
      author: {
        followers: {
          some: {
            id: userId,
          },
        },
      },
    },
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
      image: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip,
    take,
    cursor: cursorObj,
  })
}

export const getRetweetedPostsByUsername = async (
  userId: string,
  skip: number,
  take: number,
  cursor: { id: string } | undefined
) => {
  return await prisma.posts.findMany({
    where: {
      retweets: {
        some: {
          author: {
            id: userId,
          },
        },
      },
    },
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
      image: true,
    },
    take,
    skip,
    cursor,
  })
}

export const getLikedPostsByUsername = async (
  userId: string,
  skip: number,
  take: number,
  cursor: { id: string } | undefined
) => {
  return await prisma.posts.findMany({
    where: {
      likes: {
        some: {
          user_name: userId,
        },
      },
    },
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
      image: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take,
    skip,
    cursor,
  })
}

export const getPostsByUsername = async (
  userId: string,
  skip: number,
  take: number,
  cursor: { id: string } | undefined
) => {
  return await prisma.posts.findMany({
    where: {
      author: {
        user_name: userId,
      },
    },
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
      image: true,
    },
    skip,
    take,
    cursor,
  })
}

export const getPostById = async (postId: string) => {
  return await prisma.posts.findFirst({
    where: {
      id: postId,
    },
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
      image: true,
    },
  })
}

export const getUserLikedPost = async (postId: string, userId: string) => {
  return await prisma.posts.findFirst({
    where: {
      id: postId,
      likes: {
        some: {
          id: userId,
        },
      },
    },
  })
}

export const getCommentsByPostId = async (
  postId: string,
  userId: string,
  cursor: { id: string } | undefined,
  skip: number,
  takeComments: number,
  takeChildComments: number
) => {
  return await prisma.comments.findMany({
    where: {
      postId,
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
                id: postId,
              },
            },
          },
        },
        take: takeChildComments,
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
    take: takeComments,
    cursor,
  })
}
