import prisma from '@/utils/prisma'

export const getUsers = async () => {
  try {
    return await prisma.users.findMany({
      take: 5,
    })
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getBlockedUsers = async (
  skip: number,
  take: number,
  username: string,
  cursorObj?: { id: string }
) => {
  return await prisma.users.findMany({
    where: {
      AND: {
        blockedBy: {
          some: {
            user_name: username,
          },
        },
      },
    },
    skip,
    take,
    cursor: cursorObj ? { id: cursorObj.id } : undefined,
  })
}

export const getAllUsers = async (
  skip: number,
  take: number,

  cursorObj?: { id: string }
) => {
  return await prisma.users.findMany({
    skip,
    take,
    cursor: cursorObj ? { id: cursorObj.id } : undefined,
  })
}

export const getAllUsers_sessionRequest = async (
  skip: number,
  take: number,
  username: string,
  cursorObj?: { id: string }
) => {
  return await prisma.users.findMany({
    where: {
      NOT: {
        user_name: username,
      },
      AND: {
        followers: {
          none: {
            user_name: username,
          },
        },
        blockedBy: {
          none: {
            user_name: username,
          },
        },
      },
    },
    skip,
    take,
    cursor: cursorObj ? { id: cursorObj.id } : undefined,
  })
}

export const getFollowing = async (
  skip: number,
  take: number,
  username: string,
  cursorObj?: { id: string }
) => {
  return await prisma.users.findMany({
    where: {
      NOT: {
        user_name: username,
      },
      AND: [
        {
          followers: {
            some: {
              user_name: username,
            },
          },
        },
      ],
    },
    skip,
    take,
    cursor: cursorObj ? { id: cursorObj.id } : undefined,
  })
}

export const getFollowers = async (
  skip: number,
  take: number,
  username: string,
  cursorObj?: { id: string }
) => {
  return await prisma.users.findMany({
    where: {
      NOT: {
        user_name: username,
      },
      AND: [
        {
          following: {
            some: {
              user_name: username,
            },
          },
        },
      ],
    },
    skip,
    take,
    cursor: cursorObj ? { id: cursorObj.id } : undefined,
  })
}

export const getUsersNotFollowing = async (currentUserId: string) => {
  try {
    return await prisma.users.findMany({
      where: {
        NOT: {
          followers: {
            some: {
              id: currentUserId,
            },
          },
        },
        AND: {
          blockedBy: {
            none: {
              id: currentUserId,
            },
          },
        },
      },
      take: 5,
    })
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getUserFollowData = async (currentUserId: string) => {
  return await prisma.users.findUnique({
    where: {
      id: currentUserId,
    },
    include: {
      followers: true,
      following: true,
      blockedUsers: true,
      blockedBy: true,
    },
  })
}

export const getIsBlockedUser = async (
  currentUserId: string,
  blockedUserId: string
) => {
  return await prisma.users.findUnique({
    where: {
      id: currentUserId,
      blockedUsers: {
        some: {
          id: blockedUserId,
        },
      },
    },
  })
}
