import prisma from "@/utils/prisma"

export const createUser = async (
  id: string,
  name: string,
  user_name: string,
  avatar_url: string
) => {
  try {
    return await prisma.users.create({
      data: {
        id,
        name,
        user_name,
        avatar_url,
      },
    })
  } catch (e) {
    console.error(e)
  }
}
