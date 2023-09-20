'use client'

import { Spinner } from '@nextui-org/spinner'

import PostCard from '@/components/post/post-card'

import useFollow from '@/hooks/use-follow'
import useInfinitePosts from '@/hooks/use-infinite-posts'
import usePostActions from '@/hooks/use-post-actions'

import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

type Props = {
  postType: string
  userId?: string
}

export default function PostList({ postType, userId }: Props) {
  const userData = useSelector((state: RootState) => state.auth.userData)

  const { posts, isLoading, isError, ref, isFetchingNextPage, error } =
    useInfinitePosts(postType, userId)

  const {
    addLikeMutation,
    addRetweetMutation,
    blockMutation,
    deleteLikeMutation,
    deleteRetweetMutation,
  } = usePostActions(postType)

  const { getIsFollowing, toggleFollow } = useFollow()

  if (isLoading)
    return (
      <div className="h-full w-full grid place-content-center min-h-screen">
        <Spinner color="default" size="lg" className="text-center mx-auto" />
      </div>
    )
  if (isError) return <div>Error! {JSON.stringify(error)}</div>

  return (
    <ul>
      {posts?.map((post) => {
        const isFollowing = getIsFollowing(post.author.id)

        const isRetweeted =
          userId && post.retweets
            ? post.retweets.some((retweet) => retweet.authorId === userId)
            : false

        const isLiked = userId
          ? post.likes.some((like) => like.id === userId)
          : false

        return (
          <PostCard
            key={post.id}
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
          />
        )
      })}

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
