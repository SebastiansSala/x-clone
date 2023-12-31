'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import useInfinite from './use-infinite'

import { fetchPosts } from '@/services/posts-services'
import type { PostTypeWithAllActions } from '@/types/posts'

export default function useInfinitePosts(postType: string, username?: string) {
  const { ref, inView } = useInView()

  const {
    data,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinite(['posts', postType], (pageParam) =>
    fetchPosts(postType, pageParam, username)
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const posts = data?.pages?.flatMap(
    (page) => page.posts
  ) as PostTypeWithAllActions[]

  return {
    posts,
    isError,
    isLoading,
    isFetchingNextPage,
    error,
    ref,
  }
}
