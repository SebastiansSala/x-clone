'use client'

import FollowingCard from '../following-card'

import useFollow from '@/hooks/use-follow'
import useInfiniteUsers from '@/hooks/use-infinite-users'

export default function UsersList({
  fetchType,
  username,
}: {
  fetchType: string
  username: string
}) {
  const { users } = useInfiniteUsers(fetchType, username)

  const { toggleFollow, getIsFollowing } = useFollow()

  return (
    <ul>
      {users?.map(({ id, name, user_name, avatar_url }) => (
        <FollowingCard
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
