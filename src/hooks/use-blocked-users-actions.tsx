'use client'

import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

import { blockUser } from '@/services/users-services'

import type { UserType } from '@/types/posts'

type CommentsObjectType = {
  pages: PageType[]
  pageParams: pageParams[]
}

type PageType = {
  nextId?: string
  users: UserType[]
}

type pageParams = string | undefined

export default function useBlockedUsersActions() {
  const queryClient = useQueryClient()

  const blockMutation = useMutation(blockUser, {
    onMutate: async ({
      user,
      blockedUserId,
    }: {
      user: UserType | null
      blockedUserId: string
    }) => {
      if (!user) return toast.error('You must be logged in to block a users')

      await queryClient.cancelQueries(['blocked'])

      const oldData = queryClient.getQueryData<CommentsObjectType>(['blocked'])

      queryClient.setQueryData(['blocked'], (old: any) => {
        const newData = old?.pages?.map((page: PageType) => ({
          ...page,
          users: page.users.filter((user) => user.id !== blockedUserId),
        }))
        return {
          ...oldData,
          pages: newData,
        }
      })
      return { oldData }
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['blocked'], context)
      toast.error('Error blocking user')
    },
    onSettled: () => {
      queryClient.invalidateQueries(['blocked'])
      toast.success('User unblocked successfully')
    },
  })

  return {
    blockMutation,
  }
}
