'use client'

import { Avatar } from '@nextui-org/avatar'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'

import useActionHandlers from '@/hooks/use-actions-handlers'

import OptionsDropdown from './options-dropdown'
import CommentsModal from './comments-modal'
import RetweetButton from './retweet-button'
import LikeButton from './like-button'

import type { CommentTypeWithActions, UserType } from '@/types/posts'

type PostProps = {
  comment: CommentTypeWithActions
  user?: UserType | null
  isFollowing: boolean
  isRetweeted: boolean
  isLiked: boolean
  toggleFollow: (authorId: string) => Promise<void>
  addLikeMutation: any
  deleteLikeMutation: any
  addRetweetMutation: any
  deleteRetweetMutation: any
  blockMutation: any
  addCommentMutation: any
}

export default function CommentCard({
  comment,
  user,
  isFollowing,
  isRetweeted,
  isLiked,
  toggleFollow,
  addLikeMutation,
  deleteLikeMutation,
  addRetweetMutation,
  deleteRetweetMutation,
  blockMutation,
  addCommentMutation,
}: PostProps) {
  const {
    handleBlock,
    handleLike,
    handleRetweet,
    isLikedLocal,
    isLikedloading,
    isRetweetLoading,
    isRetweetedLocal,
    handleAddComment,
  } = useActionHandlers(isLiked, isRetweeted)

  const handleReply = async (text: string) => {
    try {
      await handleAddComment(comment.id, text, addCommentMutation)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <li key={comment.id} className="relative">
      <Link
        href={`/${comment.author?.user_name}/replies/${comment.id}`}
        className="w-full h-full absolute inset-0 z-20"
      />
      <article className="grid grid-cols-12 p-4 relative">
        <Link
          href={`/${comment.author?.user_name}`}
          className="col-span-1 z-30 place-self-start mt-2"
        >
          <Avatar
            src={comment.author ? comment.author.avatar_url : ''}
            className="w-8 h-8 md:h-10 md:w-10"
          />
        </Link>
        <header className="col-span-11 px-4">
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

            <OptionsDropdown
              author={comment.author}
              isFollowing={isFollowing}
              toggleFollow={toggleFollow}
              showPublicButtons={user?.id === comment.authorId}
              handleBlock={() => handleBlock(comment.author?.id, blockMutation)}
            />
          </div>
          <section className="w-full ">
            <p className="truncate max-w-full text-xs sm:text-sm md:text-base">
              {comment.text}
            </p>
            {comment.image && (
              <Image
                key={comment.image.id}
                isZoomed
                width={240}
                alt={comment.image.url}
                src={comment.image.url}
              />
            )}
          </section>
          <footer className="flex justify-evenly py-2">
            <CommentsModal
              commentsCount={comment.comments ? comment.comments.length : 0}
              author_avatarUrl={comment.author ? comment.author.avatar_url : ''}
              author_name={comment.author ? comment.author.name : ''}
              author_username={comment.author ? comment.author.user_name : ''}
              post_description={comment.text}
              created_at={comment.createdAt}
              handleSubmit={handleReply}
            />
            <RetweetButton
              onClick={() =>
                handleRetweet(
                  comment.id,
                  addRetweetMutation,
                  deleteRetweetMutation
                )
              }
              retweetsCount={comment.retweets ? comment.retweets.length : 0}
              isRetweeted={isRetweetedLocal}
              isLoading={isRetweetLoading}
            />
            <LikeButton
              onClick={() =>
                handleLike(comment.id, addLikeMutation, deleteLikeMutation)
              }
              likesCount={comment.likes?.length}
              isLiked={isLikedLocal}
              isLoading={isLikedloading}
            />
          </footer>
        </header>
      </article>
      <Divider />
    </li>
  )
}
