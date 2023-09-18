'use client'

import { Avatar } from '@nextui-org/avatar'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'
import { Link } from '@nextui-org/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

import usePostActions from '@/hooks/use-post-actions'
import CommentsModal from '../comments-modal/comments-modal'
import LikeButton from '../like-button'
import RetweetButton from '../retweet-button'
import OptionsDropdown from './post-options-dropdown'

import type { RootState } from '@/app/store'
import type { PostType } from '@/types/posts'
import type { User } from '@supabase/supabase-js'

type PostProps = {
  post: PostType
  postType: string
  user?: User
  toggleFollow: (authorId: string) => Promise<void>
}

export default function PostCard({
  post,
  postType,
  user,
  toggleFollow,
}: PostProps) {
  const following = useSelector((state: RootState) => state.auth.following)

  const [isRetweetLoading, setIsRetweetLoading] = useState(false)
  const [isLikedloading, setIsLikedLoading] = useState(false)

  const likesCount = post.likes.length

  const isFollowing = following.some((follow) => follow.id === post.author.id)
  const isLiked = post.likes.some((like) => like.id === user?.id)
  const isRetweeted = post.retweets.some(
    (retweet) => retweet.authorId === user?.id
  )

  const [isLikedLocal, setIsLikedLocal] = useState(isLiked)
  const [isRetweetedLocal, setIsRetweetedLocal] = useState(isRetweeted)

  const {
    addLikeMutation,
    deleteLikeMutation,
    deleteRetweetMutation,
    addRetweetMutation,
    blockMutation,
  } = usePostActions(postType, user)

  const handleLike = async (isLiked: boolean, postId: string) => {
    try {
      if (!user) return toast.error('You must be logged in to block a user')
      setIsLikedLocal(!isLikedLocal)
      setIsLikedLoading(true)
      if (isLiked) {
        await deleteLikeMutation.mutateAsync(postId)
      } else {
        await addLikeMutation.mutateAsync(postId)
      }
    } catch (err) {
      console.error(err)
      setIsLikedLocal(!isLikedLocal)
    } finally {
      setIsLikedLoading(false)
    }
  }

  const handleRetweet = async (isRetweeted: boolean, postId: string) => {
    try {
      if (!user) return toast.error('You must be logged in to block a user')
      setIsRetweetedLocal(!isRetweetedLocal)
      setIsRetweetLoading(true)
      if (isRetweeted) {
        await deleteRetweetMutation.mutateAsync(postId)
      } else {
        await addRetweetMutation.mutateAsync(postId)
      }
    } catch (e) {
      console.error(e)
      setIsRetweetedLocal(!isRetweetedLocal)
    } finally {
      setIsRetweetLoading(false)
    }
  }

  const handleBlock = async (authorId: string) => {
    try {
      if (!user) return toast.error('You must be logged in to block a user')

      await blockMutation.mutateAsync({
        userId: user?.id,
        blockedUserId: authorId,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <li key={post.id} className="relative">
      <Link
        href={`/${post.author.user_name}/status/${post.id}`}
        className="w-full h-full absolute inset-0 z-20"
      />
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
            <Link
              href={`/${post.author.user_name}`}
              className="flex gap-4 z-30"
            >
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

          {post.images && (
            <Image
              key={post.images.id}
              isZoomed
              width={240}
              alt={post.images.url}
              src={post.images.url}
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
              isRetweeted={isRetweetedLocal}
              isLoading={isRetweetLoading}
            />
            <LikeButton
              onClick={() => handleLike(isLiked, post.id)}
              likesCount={likesCount}
              isLiked={isLikedLocal}
              isLoading={isLikedloading}
            />
          </div>
        </div>
      </div>
      <Divider />
    </li>
  )
}
