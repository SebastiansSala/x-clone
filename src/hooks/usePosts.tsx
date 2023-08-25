"use client"

import { useEffect } from "react"
import { useInfiniteQuery } from "react-query"
import { useInView } from "react-intersection-observer"

import { fetchPosts } from "@/services/posts-services"

export default function usePosts(postType: string, username?: string) {
  const { ref, inView } = useInView()

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
    ({ pageParam = 0 }) => {
      return fetchPosts(postType, pageParam, username)
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId,
    }
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const posts = data?.pages.flatMap((page) => page.posts)

  return {
    posts,
    isError,
    isLoading,
    isFetchingNextPage,
    error,
    ref,
  }
}
