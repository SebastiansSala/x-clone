import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/prisma"
import { createPost, updatePostImages } from "@/actions/posts"
import { getServerSession } from "@/utils/supabase-server"
import supabase from "@/utils/supabase-server"
import { decode } from "base64-arraybuffer"

export async function GET() {
  const posts = await prisma.posts.findMany()
  return NextResponse.json({ posts })
}

type imagesPost = {
  dataURL: string
  file: File
}

export const POST = async (req: NextRequest) => {
  try {
    const {
      text,
      images,
      selectedOption,
    }: { text: string; images: imagesPost[]; selectedOption: string } =
      await req.json()

    if (!text) {
      return NextResponse.json("Invalid data", { status: 400 })
    }

    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const userId = session?.user.id

    const publicVisible = selectedOption === "Everyone" ? true : false

    const post = await createPost(userId, text, publicVisible)

    let imageUrls = []
    if (images.length > 0) {
      for (const image of images) {
        let index = 1

        const { data, error } = await supabase.storage
          .from("images")
          .upload(`images/${image.file.name}`, image.dataURL)
        if (error) {
          console.error("Error uploading images", error)
        }
        console.log(data)

        if (data) {
          imageUrls.push(data.path)
          index++
        }
      }
    }

    for (const imageUrl of imageUrls) {
      await updatePostImages(post.id, imageUrl)
    }

    return NextResponse.json({ post })
  } catch (e) {
    console.error(e)
    return NextResponse.error()
  }
}
