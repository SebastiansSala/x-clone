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
