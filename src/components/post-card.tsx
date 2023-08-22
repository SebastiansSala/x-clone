import { Avatar } from "@nextui-org/avatar"
import { Image } from "@nextui-org/image"
import { Button } from "@nextui-org/button"

import { CommentIcon } from "./Icons/utility/comment-icon"
import { LikeIcon } from "./Icons/utility/like-icon"
import { OptionsIcon } from "./Icons/utility/option-icon"
import { RetweetIcon } from "./Icons/utility/retweet-icon"

import { addLike } from "@/services/posts-services"

import type { PostType } from "@/types/posts"

type PostProps = {
  post: PostType
}

const Post = ({ post }: PostProps) => {
  const handleLike = async () => {
    try {
      const res = await addLike(post.id)
    } catch (err) {
      console.log(err)
    }
  }

  const handleComment = () => {
    console.log("comment")
  }

  const handleRetweet = () => {}

  return (
    <li className='grid grid-cols-12 border-t-1 border-[#2f3336] p-4'>
      <Avatar className='col-span-1' src={post.author.avatar_url} />
      <div className='col-span-11'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4'>
            <h4>{post.author.name}</h4>
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
        <div>
          {post.images?.map((image, index) => (
            <Image
              key={index}
              isZoomed
              width={240}
              alt={index.toString()}
              src={image.url}
            />
          ))}
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
            {post.comments.length}
          </Button>
          <Button
            radius='full'
            isIconOnly
            color='success'
            variant='light'
            className='text-gray-500 hover:text-green-500'
          >
            <RetweetIcon className='w-6 h-6 ' />
            {post.retweets.length}
          </Button>
          <Button
            radius='full'
            isIconOnly
            color='danger'
            variant='light'
            className='text-gray-500 hover:text-red-500'
            onPress={handleLike}
          >
            <LikeIcon className='w-6 h-6 ' />
            {post.likes.length}
          </Button>
        </div>
      </div>
    </li>
  )
}

export default Post
