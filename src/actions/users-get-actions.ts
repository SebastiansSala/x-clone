import prisma from "@/utils/prisma"

export const getUsers = async () => {
  try {
    return await prisma.users.findMany({
      take: 5,
    })
  } catch (e) {
    console.error(e)
  }
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
  userId: string,
  cursorObj?: { id: string }
) => {
  return await prisma.users.findMany({
    where: {
      NOT: {
        id: userId,
      },
      AND: {
        followers: {
          some: {
            NOT: {
              id: userId,
            },
          },
        },
      },
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
        following: {
          some: {
            NOT: {
              id: currentUserId,
            },
          },
        },
      },
      take: 5,
    })
  } catch (e) {
    console.error(e)
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
    },
  })
}
