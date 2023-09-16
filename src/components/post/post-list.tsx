'use client'

import { Divider } from '@nextui-org/divider'
import { Spinner } from '@nextui-org/spinner'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

import PostCard from '@/components/post/post-card'

import useFollow from '@/hooks/use-follow'
import useInfinitePosts from '@/hooks/use-infinite-posts'
import usePostActions from '@/hooks/use-post-actions'

import type { RootState } from '@/app/store'
import type { User } from '@supabase/supabase-js'

type Props = {
  postType: string
  username?: string
  user?: User
}

export default function PostList({ postType, username, user }: Props) {
  const { posts, isLoading, isError, ref, isFetchingNextPage, error } =
    useInfinitePosts(postType, username)

  const {
    addLikeMutation,
    deleteLikeMutation,
    deleteRetweetMutation,
    addRetweetMutation,
    blockMutation,
  } = usePostActions(postType, user)

  const following = useSelector((state: RootState) => state.auth.following)
  const userData = useSelector((state: RootState) => state.auth.userData)

  const { toggleFollow } = useFollow()

  const handleLike = async (isLiked: boolean, postId: string) => {
    try {
      if (isLiked) {
        await deleteLikeMutation.mutateAsync(postId)
      } else {
        await addLikeMutation.mutateAsync(postId)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleRetweet = async (isRetweeted: boolean, postId: string) => {
    try {
      if (isRetweeted) {
        await deleteRetweetMutation.mutateAsync(postId)
      } else {
        await addRetweetMutation.mutateAsync(postId)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleBlock = async (authorId: string) => {
    try {
      if (!userData) return toast.error('You must be logged in to block a user')
      await blockMutation.mutateAsync({
        userId: userData?.id,
        blockedUserId: authorId,
      })
    } catch (e) {
      console.error(e)
    }
  }

  if (isLoading)
    return (
      <div className="h-full w-full grid place-content-center min-h-screen">
        <Spinner color="default" size="lg" className="text-center mx-auto" />
      </div>
    )
  if (isError) return <div>Error! {JSON.stringify(error)}</div>

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id} className="relative">
          <Link
            href={`/${post.author.user_name}/${post.id}}`}
            className="w-full h-full absolute inset-0 z-20"
          />
          <PostCard
            post={post}
            user={user}
            isFollowing={following.includes(post.author)}
            toggleFollow={toggleFollow}
            handleLike={handleLike}
            handleRetweet={handleRetweet}
            handleBlock={handleBlock}
          />
          <Divider />
        </li>
      ))}

      {isFetchingNextPage ? (
        <div className="py-14 grid place-content-center">
          <Spinner color="default" size="lg" />
        </div>
      ) : null}

      <span style={{ visibility: 'hidden' }} ref={ref}>
        intersection observer marker
      </span>
    </ul>
  )
}
