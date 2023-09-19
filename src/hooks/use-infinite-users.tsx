'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import useInfinite from './use-infinite'

import { fetchUsers } from '@/services/users-services'

export default function useInfiniteUsers(fetchType: string, username: string) {
  const { ref, inView } = useInView()

  const {
    data,
    isError,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinite([fetchType], (pageParam) =>
    fetchUsers(pageParam, fetchType, username)
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const users = data?.pages.flatMap((page) => page.users)

  return {
    users,
    isError,
    isLoading,
    isFetchingNextPage,
    error,
    ref,
  }
}
