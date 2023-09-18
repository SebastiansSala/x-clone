'use client'

import { Spinner } from '@nextui-org/spinner'

import PostCard from '@/components/post/post-card'

import useFollow from '@/hooks/use-follow'
import useInfinitePosts from '@/hooks/use-infinite-posts'

import type { User } from '@supabase/supabase-js'

type Props = {
  postType: string
  username?: string
  user?: User
}

export default function PostList({ postType, username, user }: Props) {
  const { posts, isLoading, isError, ref, isFetchingNextPage, error } =
    useInfinitePosts(postType, username)

  const { toggleFollow } = useFollow()

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
        <PostCard
          key={post.id}
          post={post}
          postType={postType}
          user={user}
          toggleFollow={toggleFollow}
        />
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
