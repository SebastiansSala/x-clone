import { Avatar } from "@nextui-org/avatar"
import { type Post } from "@/types/db"
import {
  CommentIcon,
  LikeIcon,
  OptionsIcon,
  RetweetIcon,
} from "./Icons/PostActionsIcons"
import { Button } from "@nextui-org/button"

type PostProps = {
  post: Post
}

const Post = async ({ post }: PostProps) => {
  return (
    <li className='grid grid-cols-12 border-t-1 border-[#2f3336] p-4'>
      <Avatar className='col-span-1' src={post.author?.avatar_url} />
      <div className='col-span-11'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4'>
            <h4>{post?.author.avatar_url}</h4>
            <p className='text-gray-500'>{post.author?.user_name}</p>
          </div>
          <Button
            radius='full'
            isIconOnly
            color='primary'
            variant='light'
            className='text-gray-500 hover:text-blue-600'
          >
            <OptionsIcon className='w-6 h-6' />
          </Button>
        </div>
        <div className='w-full'>
          <p className='truncate max-w-full'>{post.text}</p>
        </div>
        <div className='flex justify-evenly py-2'>
          <Button
            radius='full'
            isIconOnly
            color='primary'
            variant='light'
            className='text-gray-500 hover:text-blue-500'
          >
            <CommentIcon className='w-6 h-6 ' />
          </Button>
          <Button
            radius='full'
            isIconOnly
            color='success'
            variant='light'
            className='text-gray-500 hover:text-green-500'
          >
            <RetweetIcon className='w-6 h-6 ' />
          </Button>
          <Button
            radius='full'
            isIconOnly
            color='danger'
            variant='light'
            className='text-gray-500 hover:text-red-500'
          >
            <LikeIcon className='w-6 h-6 ' />
          </Button>
        </div>
      </div>
    </li>
  )
}

export default Post
