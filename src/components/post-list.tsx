"use client"

import type { User } from "@supabase/supabase-js"

import PostCard from "@/components/post-card"

import usePosts from "@/hooks/usePosts"
import useLike from "@/hooks/useLike"

type Props = {
  postType: string
  username?: string
  user?: User
}

export default function PostList({ postType, username, user }: Props) {
  const { posts, isLoading, isError, ref, isFetchingNextPage, error } =
    usePosts(postType, username)

  const { likeMutation } = useLike(postType)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <div>Error! {JSON.stringify(error)}</div>

  return (
    <>
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          user={user}
          likeMutation={likeMutation}
        />
      ))}

      {isFetchingNextPage ? <div className='loading'>Loading...</div> : null}

      <span style={{ visibility: "hidden" }} ref={ref}>
        intersection observer marker
      </span>
    </>
  )
}
