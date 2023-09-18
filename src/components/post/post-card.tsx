'use client'

import { Avatar } from '@nextui-org/avatar'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'
import type { User } from '@supabase/supabase-js'

import CommentsModal from '../comments-modal/comments-modal'
import LikeButton from '../like-button'
import RetweetButton from '../retweet-button'
import OptionsDropdown from './post-options-dropdown'

import type { CommentType, PostType } from '@/types/posts'

type PostProps = {
  post: PostType | CommentType
  user?: User
  isFollowing: boolean
  isLiked: boolean
  isRetweeted: boolean
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
  isLiked,
  isRetweeted,
}: PostProps) {
  const likesCount = post.likes.length

  return (
    <div className="grid grid-cols-12 p-4 relative">
      <Link
        href={`/${post.author.user_name}`}
        className="col-span-1 z-30 place-self-start mt-2"
      >
        <Avatar
          src={post.author.avatar_url}
          className="w-8 h-8 md:h-10 md:w-10"
        />
      </Link>
      <div className="col-span-11 px-4">
        <div className="flex justify-between items-center">
          <Link href={`/${post.author.user_name}`} className="flex gap-4 z-30">
            <h4 className="text-white text-xs sm:text-sm md:text-base">
              {post.author.name}
            </h4>
            <h5 className="text-gray-500 text-xs sm:text-sm md:text-base">
              {post.author.user_name}
            </h5>
          </Link>
          <OptionsDropdown
            author={post.author}
            isFollowing={isFollowing}
            toggleFollow={toggleFollow}
            showPublicButtons={user?.id !== post.author.id}
            handleBlock={handleBlock}
          />
        </div>
        <div className="w-full ">
          <p className="truncate max-w-full text-xs sm:text-sm md:text-base">
            {post.text}
          </p>
        </div>

        {post.image && (
          <Image
            key={post.image.id}
            isZoomed
            width={240}
            alt={post.image.url}
            src={post.image.url}
          />
        )}

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
