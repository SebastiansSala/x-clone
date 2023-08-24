import { useState } from "react"
import { Avatar } from "@nextui-org/avatar"
import { Image } from "@nextui-org/image"
import { Button } from "@nextui-org/button"
import type { User } from "@supabase/supabase-js"

import LikeButton from "./like-button"
import CommentButton from "./comment-button"
import RetweetButton from "./retweet-button"
import { OptionsIcon } from "./Icons/utility/option-icon"

import type { PostType } from "@/types/posts"

type PostProps = {
  post: PostType
  user?: User
  likeMutation: any
}

const PostCard = ({ post, user, likeMutation }: PostProps) => {
  const isLikedInitially = post.likes.some((like) => like.id === user?.id)
  const [isLiked, setIsLiked] = useState(isLikedInitially)
  const likesCount = post.likes.length
  const [likes, setLikes] = useState(likesCount)

  const handleLike = async () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
    try {
      const res = await likeMutation.mutateAsync(post.id)

      if (!res) {
        setIsLiked(isLikedInitially)
        setLikes(likesCount)
      }
    } catch (err) {
      console.log(err)
      setIsLiked(isLikedInitially)
      setLikes(likesCount)
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
          <CommentButton
            onClick={handleComment}
            commentsCount={post.comments.length}
          />
          <RetweetButton
            onClick={handleRetweet}
            retweetsCount={post.retweets.length}
          />
          <LikeButton
            onClick={handleLike}
            likesCount={likes}
            isLiked={isLiked}
          />
        </div>
      </div>
    </li>
  )
}

export default PostCard
