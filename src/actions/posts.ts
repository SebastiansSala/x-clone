import prisma from "@/utils/prisma"

export const getPublicPosts = async (skip: number, take: number) => {
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
    take,
    skip,
  })
}

export const getFollowingPosts = async (
  userId: string,
  skip: number,
  take: number
) => {
  return await prisma.posts.findMany({
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
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take,
    skip,
  })
}

export const getPublicPosts_withCursor = async (
  skip: number,
  take: number,
  cursorObj: { id: string }
) => {
  return await prisma.posts.findMany({
    where: {
      publicVisible: true,
    },
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
    take,
    skip,
    cursor: cursorObj,
  })
}

export const getFollowingPosts_withCursor = (
  userId: string,
  skip: number,
  take: number,
  cursorObj: { id: string }
) => {
  return prisma.posts.findMany({
    where: {
      publicVisible: true,
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
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take,
    cursor: cursorObj,
  })
}

export const getRetweetedPostsByUsername = async (username: string) => {
  return await prisma.posts.findMany({
    where: {
      retweets: {
        some: {
          author: {
            user_name: username,
          },
        },
      },
    },
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
      images: true,
    },
  })
}

export const getFollowedPosts = async (userId: string) => {
  return await prisma.posts.findMany({
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
      images: true,
    },
  })
}

export const getPostById = async (id: string) => {
  return await prisma.posts.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
      images: true,
    },
  })
}

export const getLikedPostsByUsername = async (username: string) => {
  return await prisma.posts.findMany({
    where: {
      likes: {
        some: {
          user_name: username,
        },
      },
    },
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
      images: true,
    },
  })
}

export const getPostsByUsername = async (username: string) => {
  return await prisma.posts.findMany({
    where: {
      authorId: username,
    },
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
      images: true,
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
