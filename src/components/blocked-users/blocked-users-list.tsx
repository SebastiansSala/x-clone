'use client'

import BlockedUsersCard from './blocked-users-card'

import useFollow from '@/hooks/use-follow'

import useInfiniteUsers from '@/hooks/use-infinite-users'

export default function BlockedUsersList({ username }: { username: string }) {
  const { users } = useInfiniteUsers('blocked', username)

  const { toggleFollow, getIsFollowing } = useFollow()

  return (
    <ul>
      {users?.map(({ id, name, user_name, avatar_url }) => (
        <BlockedUsersCard
          key={id}
          id={id}
          avatar_url={avatar_url}
          name={name}
          user_name={user_name}
          isFollowing={getIsFollowing(id)}
          toggleFollow={toggleFollow}
        />
      ))}
    </ul>
  )
}
