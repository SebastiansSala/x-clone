import prisma from "@/lib/prisma"
export const createPrismaPost = async (
  username: string,
  id: string,
  text: string
) => {
  return await prisma.post.create({
    data: {
      name: username,
      authorId: id,
      text,
    },
  })
}
