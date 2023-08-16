import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/utils/prisma"
import { createPrismaPost } from "@/utils/actions"

export async function GET() {
  const posts = await prisma.post.findMany()
  return NextResponse.json({ posts })
}

export const POST = async (req: Request) => {
  try {
    const { text, images, selectedOption } = await req.json()

    const user = await currentUser()

    if (!user || !user.username) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const post = await createPrismaPost(user.username, user.id, text)
    return NextResponse.json({ post })
  } catch (e) {
    console.error(e)
    return NextResponse.error()
  }
}
