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

export const getUniqueUser = async (id: string) => {
  try {
    return await prisma.users.findUnique({
      where: {
        id,
      },
    })
  } catch (e) {
    console.error(e)
  }
}
