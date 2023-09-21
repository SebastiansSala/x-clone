'use client'

import { useSelector } from 'react-redux'

import PostCard from './post/post-card'

import useCommentsActions from '@/hooks/use-comments-actions'
import useFollow from '@/hooks/use-follow'

import type { RootState } from '@/app/store'

type Props = {
  post: any
}

export default function PostMain({ post }: Props) {
  const userData = useSelector((state: RootState) => state.auth.userData)

  const { getIsFollowing, toggleFollow } = useFollow()

  const isLiked = post.likes.some((like: any) => like.id === userData?.id)
  const isRetweeted = post.retweets.some(
    (retweet: any) => retweet.authorId === userData?.id
  )

  const {
    addCommentMutation,
    addLikeMutation,
    addRetweetMutation,
    deleteRetweetMutation,
    deleteLikeMutation,
    blockMutation,
  } = useCommentsActions()

  const isFollowing = getIsFollowing(post.author.id)

  return (
    <PostCard
      post={post}
      user={userData}
      isFollowing={isFollowing}
      isRetweeted={isRetweeted}
      isLiked={isLiked}
      toggleFollow={toggleFollow}
      addLikeMutation={addLikeMutation}
      deleteLikeMutation={deleteLikeMutation}
      addRetweetMutation={addRetweetMutation}
      deleteRetweetMutation={deleteRetweetMutation}
      blockMutation={blockMutation}
      addCommentMutation={addCommentMutation}
    />
  )
}
