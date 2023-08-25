import prisma from "@/utils/prisma"

export const getUsers = async () => {
  try {
    return await prisma.users.findMany({
      where: {
        NOT: {
          following: {
            some: {
              id: "cku0q2q6h0000h4tj5q6q6q6q",
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
    },
  })
}
