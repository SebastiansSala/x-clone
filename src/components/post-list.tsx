"use client"

import { useEffect } from "react"
import { QueryClient, useInfiniteQuery, useMutation } from "react-query"
import type { User } from "@supabase/supabase-js"
import { useInView } from "react-intersection-observer"

import PostCard from "@/components/post-card"

import { addLike, fetchPosts } from "@/services/posts-services"

type Props = {
  postType: string
  username?: string
  user?: User
}

export default function PostList({ postType, username, user }: Props) {
  const queryClient = new QueryClient()

  const {
    data,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["posts", postType],
    ({ pageParam = 0 }) => fetchPosts(postType, pageParam, username),
    {
      getNextPageParam: (lastPage) => lastPage?.nextId ?? false,
    }
  )

  const likeMutation = useMutation(addLike, {
    onSuccess: (data, variables, context) => {
      const postId = context
      queryClient.refetchQueries(["posts", postType, postId])
    },
  })

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  if (isLoading) return <p>Loading...</p>
  if (isError) return <div>Error! {JSON.stringify(error)}</div>

  const posts = data?.pages.flatMap((page) => page.posts)

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
