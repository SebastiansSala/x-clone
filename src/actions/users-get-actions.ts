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

//function that returns users taht the current user is not following

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
