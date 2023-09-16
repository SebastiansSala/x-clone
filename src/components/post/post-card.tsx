'use client'

import { Avatar } from '@nextui-org/avatar'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'
import type { User } from '@supabase/supabase-js'

import CommentsModal from '../comments-modal/comments-modal'
import LikeButton from '../like-button'
import RetweetButton from '../retweet-button'
import OptionsDropdown from './post-options-dropdown'

import type { PostType } from '@/types/posts'

type PostProps = {
  post: PostType
  user?: User
  isFollowing: boolean
  toggleFollow: (authorId: string) => Promise<void>
  handleLike: (isLiked: boolean, postId: string) => void
  handleRetweet: (isRetweeted: boolean, postId: string) => void
  handleBlock: (authorId: string) => void
}

export default function PostCard({
  post,
  user,
  isFollowing,
  toggleFollow,
  handleLike,
  handleRetweet,
  handleBlock,
}: PostProps) {
  const isLiked = post.likes.some((like) => like.id === user?.id)
  const isRetweeted = post.retweets.some(
    (retweet) => retweet.authorId === user?.id
  )

  const likesCount = post.likes.length

  return (
    <div className="grid grid-cols-12 p-4 relative">
      <Link href={`/${post.author.user_name}`}>
        <Avatar className="col-span-1 z-30" src={post.author.avatar_url} />
      </Link>
      <div className="col-span-11">
        <div className="flex justify-between items-center">
          <Link href={`/${post.author.user_name}`} className="flex gap-4 z-30">
            <h4 className="text-white">{post.author.name}</h4>
            <h5 className="text-gray-500">{post.author.user_name}</h5>
          </Link>
          <OptionsDropdown
            author={post.author}
            postId={post.id}
            isFollowing={isFollowing}
            toggleFollow={toggleFollow}
            showPublicButtons={user?.id !== post.author.id}
            handleBlock={handleBlock}
          />
        </div>
        <div className="w-full ">
          <p className="truncate max-w-full">{post.text}</p>
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
        <div className="flex justify-evenly py-2">
          <CommentsModal
            commentsCount={post.comments.length}
            author_avatarUrl={post.author.avatar_url}
            author_name={post.author.name}
            author_username={post.author.user_name}
            post_description={post.text}
            created_at={post.createdAt}
          />
          <RetweetButton
            onClick={() => handleRetweet(isRetweeted, post.id)}
            retweetsCount={post.retweets.length}
            isRetweeted={isRetweeted}
            isLoading={false}
          />
          <LikeButton
            onClick={() => handleLike(isLiked, post.id)}
            likesCount={likesCount}
            isLiked={isLiked}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  )
}
