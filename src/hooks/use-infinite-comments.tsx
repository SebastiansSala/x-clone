import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import useInfinite from './use-infinite'

import { fetchComments } from '@/services/comments-services'
import { CommentType } from '@/types/posts'

export default function useInfiniteComments(postId: string) {
  const { ref, inView } = useInView()

  const {
    data,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinite(['comments'], (pageParam) => fetchComments(postId, pageParam))

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const comments = data?.pages.flatMap((page) => page.comments) as CommentType[]

  return {
    comments,
    isError,
    isLoading,
    isFetchingNextPage,
    error,
    ref,
  }
}
