"use client"

import { useEffect } from "react"
import { useInfiniteQuery } from "react-query"
import { useInView } from "react-intersection-observer"

import Post from "@/components/post-card"

import { fetchPosts } from "@/services/posts-services"

type Props = {
  postType: string
  username?: string
}

export default function PostList({ postType, username }: Props) {
  const {
    data: posts,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["posts", postType],
    ({ pageParam }: { pageParam?: string }) =>
      fetchPosts(postType, pageParam ?? "0", username),
    {
      getNextPageParam: (lastPage) => lastPage?.nextId ?? false,
    }
  )

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  if (isLoading) return <p>Loading...</p>
  if (isError) return <div>Error! {JSON.stringify(error)}</div>

  return (
    <>
      {posts &&
        posts.pages
          ?.flatMap((page) => page.posts)
          .map((post) => <Post key={post.id} post={post} />)}

      {isFetchingNextPage ? <div className='loading'>Loading...</div> : null}

      <span style={{ visibility: "hidden" }} ref={ref}>
        intersection observer marker
      </span>
    </>
  )
}
