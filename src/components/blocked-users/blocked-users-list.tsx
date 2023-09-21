'use client'

import { useSelector } from 'react-redux'

import BlockedUsersCard from './blocked-users-card'

import useInfiniteUsers from '@/hooks/use-infinite-users'
import useBlockedUsersActions from '@/hooks/use-blocked-users-actions'

import type { RootState } from '@/app/store'

import type { User } from '@supabase/auth-helpers-nextjs'

export default function BlockedUsersList({ user }: { user: User }) {
  const { user_name } = user.user_metadata

  const { users } = useInfiniteUsers('blocked', user_name)

  const userData = useSelector((state: RootState) => state.auth.userData)

  const { blockMutation } = useBlockedUsersActions()

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
            blockMutation={blockMutation}
            user={userData}
          />
        )
      })}
    </ul>
  )
}
