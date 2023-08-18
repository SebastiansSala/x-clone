import prisma from "@/utils/prisma"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const user = await req.json()
  const { id, name, user_name, avatar_url } = JSON.parse(user)
  if (!id || !name || !user_name || !avatar_url) {
    return new Response("Invalid data", { status: 400 })
  }

  const findUser = await prisma.users.findUnique({
    where: {
      id,
    },
  })

  if (findUser) {
    return NextResponse.json("User already exists", { status: 400 })
  }

  const userCreated = await prisma.users.create({
    data: {
      id,
      name,
      user_name,
      avatar_url,
    },
  })

  return NextResponse.json(userCreated)
}
