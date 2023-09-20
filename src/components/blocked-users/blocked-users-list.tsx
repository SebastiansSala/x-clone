'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import BlockedUsersCard from './blocked-users-card'

import useFollow from '@/hooks/use-follow'
import useInfiniteUsers from '@/hooks/use-infinite-users'

import type { RootState } from '@/app/store'

export default function BlockedUsersList({ username }: { username: string }) {
  const { users } = useInfiniteUsers('blocked', username)

  const { toggleFollow } = useFollow()

  const blockedUsers = useSelector(
    (state: RootState) => state.auth.blockedUsers
  )

  const blockedUsersIds = blockedUsers?.map((user) => user.id)

  return (
    <ul>
      {users?.map((author) => {
        const { id, avatar_url, name, user_name } = author

        return (
          <BlockedUsersCard
            key={id}
            id={id}
            avatar_url={avatar_url}
            name={name}
            user_name={user_name}
            isBlocked={blockedUsersIds?.includes(id)}
            toggleFollow={toggleFollow}
          />
        )
      })}
    </ul>
  )
}
