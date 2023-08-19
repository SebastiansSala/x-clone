import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/prisma"
import { createPrismaPost } from "@/actions/posts"
import { getServerSession } from "@/utils/supabase-server"

export async function GET() {
  const posts = await prisma.posts.findMany()
  return NextResponse.json({ posts })
}

export const POST = async (req: NextRequest) => {
  try {
    const { text, images, selectedOption } = await req.json()

    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const userId = session?.user.id

    const publicVisible = selectedOption === "Everyone" ? true : false

    console.log(userId, text, images, publicVisible)
    const post = await createPrismaPost(userId, text, publicVisible, images)
    return NextResponse.json({ post })
  } catch (e) {
    console.error(e)
    return NextResponse.error()
  }
}
