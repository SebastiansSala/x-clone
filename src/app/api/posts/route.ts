import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createPrismaPost } from "@/lib/actions"

export async function GET() {
  const posts = await prisma.post.findMany()
  return NextResponse.json({ posts })
}

export const POST = async (req: Request) => {
  try {
    const { text, images, selectedOption } = await req.json()

    const user = await currentUser()

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    if (user.username) {
      const post = await createPrismaPost(user.username, user.id, text)
      return NextResponse.json({ post })
    }
  } catch (e) {
    console.error(e)
    return NextResponse.error()
  }
}
