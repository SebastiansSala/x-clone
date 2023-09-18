'use client'

import { Avatar } from '@nextui-org/avatar'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'
import type { User } from '@supabase/supabase-js'

import type { CommentType } from '@/types/posts'
import OptionsDropdown from './post/post-options-dropdown'
import CommentsModal from './comments-modal/comments-modal'
import RetweetButton from './retweet-button'
import LikeButton from './like-button'

type CommentProps = {
  comment: CommentType
  user?: User
  isFollowing: boolean
  isLiked?: boolean
  isRetweeted?: boolean
  toggleFollow: (authorId: string) => Promise<void>
  handleLike: (isLiked: boolean, postId: string) => void
  handleRetweet: (isRetweeted: boolean, postId: string) => void
  handleBlock: (authorId: string) => void
}

export default function CommentCard({
  comment,
  user,
  isFollowing,
  toggleFollow,
  handleLike,
  handleRetweet,
  handleBlock,
  isLiked = false,
  isRetweeted = false,
}: CommentProps) {
  return (
    <div className="grid grid-cols-12 p-4 relative">
      <Link
        href={`/${comment.author?.user_name}`}
        className="col-span-1 z-30 place-self-start mt-2"
      >
        <Avatar
          src={comment.author?.avatar_url}
          className="w-8 h-8 md:h-10 md:w-10"
        />
      </Link>
      <div className="col-span-11 px-4">
        <div className="flex justify-between items-center">
          <Link
            href={`/${comment.author?.user_name}`}
            className="flex gap-4 z-30"
          >
            <h4 className="text-white text-xs sm:text-sm md:text-base">
              {comment.author?.name}
            </h4>
            <h5 className="text-gray-500 text-xs sm:text-sm md:text-base">
              {comment.author?.user_name}
            </h5>
          </Link>
          {comment.author && (
            <OptionsDropdown
              author={comment.author}
              isFollowing={isFollowing}
              toggleFollow={toggleFollow}
              showPublicButtons={user?.id !== comment.author?.id}
              handleBlock={handleBlock}
            />
          )}
        </div>
        <div className="w-full ">
          <p className="truncate max-w-full text-xs sm:text-sm md:text-base">
            {comment.text}
          </p>
        </div>

        {comment.image && (
          <Image
            key={comment.image.id}
            isZoomed
            width={240}
            alt={comment.image.url}
            src={comment.image.url}
          />
        )}

        <div className="flex justify-evenly py-2">
          <CommentsModal
            commentsCount={comment.comments?.length}
            author_avatarUrl={comment.author?.avatar_url}
            author_name={comment.author?.name}
            author_username={comment.author?.user_name}
            post_description={comment.text}
            created_at={comment.createdAt}
          />
          <RetweetButton
            onClick={() => handleRetweet(isRetweeted, comment.id)}
            retweetsCount={comment.retweets?.length}
            isRetweeted={isRetweeted}
            isLoading={false}
          />
          <LikeButton
            onClick={() => handleLike(isLiked, comment.id)}
            likesCount={comment.likes?.length}
            isLiked={isLiked}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  )
}
