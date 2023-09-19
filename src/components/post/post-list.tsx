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
  username?: string
}

export default function PostList({ postType, username }: Props) {
  const { posts, isLoading, isError, ref, isFetchingNextPage, error } =
    useInfinitePosts(postType, username)

  const {
    addLikeMutation,
    addRetweetMutation,
    blockMutation,
    deleteLikeMutation,
    deleteRetweetMutation,
  } = usePostActions(postType)

  const { getIsFollowing, toggleFollow } = useFollow()

  const userData = useSelector((state: RootState) => state.auth.userData)

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
          userData && post.retweets
            ? post.retweets.some((retweet) => retweet.authorId === userData.id)
            : false

        const isLiked = userData
          ? post.likes.some((like) => like.id === userData.id)
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
