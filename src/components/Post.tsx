import { Avatar } from "@nextui-org/avatar"
import React from "react"
import prisma from "@/utils/prisma"
import { type PostWithAll, type Post } from "@/types/db"

type PostProps = {
  post: Post
}

const Post = async ({ post }: PostProps) => {
  if (!post.authorId) return

  const author = await prisma.users.findFirst({
    where: {
      id: post.authorId,
    },
  })

  return (
    <li className='grid grid-cols-12 border-t-1 border-[#2f3336] p-4'>
      <Avatar className='col-span-1' src={author?.avatar_url} />
      <div className='col-span-11'>
        <div>
          <div>
            <h4>{author?.name}</h4>
            <p>{author?.user_name}</p>
            <span>8h</span>
          </div>
          <div>...</div>
        </div>
        <div className='w-full'>
          <p className='truncate max-w-full'>{post.text}</p>
        </div>
        <div></div>
        <div className='flex justify-between py-2'></div>
      </div>
    </li>
  )
}

export default Post
