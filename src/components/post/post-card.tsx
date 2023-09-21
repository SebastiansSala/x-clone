'use client'

import { Avatar } from '@nextui-org/avatar'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'

import CommentsModal from '../comments-modal'
import LikeButton from '../like-button'
import RetweetButton from '../retweet-button'
import OptionsDropdown from '../options-dropdown'

import useActionHandlers from '@/hooks/use-actions-handlers'

import type { PostType, UserType } from '@/types/posts'

type PostProps = {
  post: PostType
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

export default function PostCard({
  post,
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
      await handleAddComment(post.id, text, addCommentMutation)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <li key={post.id} className="relative">
      <Link
        href={`/${post.author?.user_name}/status/${post.id}`}
        className="w-full h-full absolute inset-0 z-20"
      />
      <article className="grid grid-cols-12 p-4 relative">
        <Link
          href={`/${post.author?.user_name}`}
          className="col-span-1 z-30 place-self-start mt-2"
        >
          <Avatar
            src={post.author ? post.author.avatar_url : ''}
            className="w-8 h-8 md:h-10 md:w-10"
          />
        </Link>
        <header className="col-span-11 px-4">
          <div className="flex justify-between items-center">
            <Link
              href={`/${post.author?.user_name}`}
              className="flex gap-4 z-30"
            >
              <h4 className="text-white text-xs sm:text-sm md:text-base">
                {post.author?.name}
              </h4>
              <h5 className="text-gray-500 text-xs sm:text-sm md:text-base">
                {post.author?.user_name}
              </h5>
            </Link>

            <OptionsDropdown
              author={post.author}
              isFollowing={isFollowing}
              toggleFollow={toggleFollow}
              showPublicButtons={user?.id !== post.author?.id}
              handleBlock={() => handleBlock(post.author?.id, blockMutation)}
            />
          </div>
          <section className="w-full ">
            <p className="truncate max-w-full text-xs sm:text-sm md:text-base">
              {post.text}
            </p>
            {post.image && (
              <Image
                key={post.image.id}
                isZoomed
                width={240}
                alt={post.image.url}
                src={post.image.url}
              />
            )}
          </section>
          <footer className="flex justify-evenly py-2">
            <CommentsModal
              commentsCount={post.comments?.length}
              author_avatarUrl={post.author ? post.author.avatar_url : ''}
              author_name={post.author ? post.author.name : ''}
              author_username={post.author ? post.author.user_name : ''}
              post_description={post.text}
              created_at={post.createdAt}
              handleSubmit={handleReply}
            />
            <RetweetButton
              onClick={() =>
                handleRetweet(
                  post.id,
                  addRetweetMutation,
                  deleteRetweetMutation
                )
              }
              retweetsCount={post.retweets?.length}
              isRetweeted={isRetweetedLocal}
              isLoading={isRetweetLoading}
            />
            <LikeButton
              onClick={() =>
                handleLike(post.id, addLikeMutation, deleteLikeMutation)
              }
              likesCount={post.likes?.length}
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
