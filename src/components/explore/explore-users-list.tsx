'use client'

import FollowingCard from '../following-card'

import useFollow from '@/hooks/use-follow'
import useInfiniteUsers from '@/hooks/use-infinite-users'
import { Spinner } from '@nextui-org/spinner'

export default function UsersList({
  username,
  fetchType,
}: {
  username: string
  fetchType: string
}) {
  const { users, isLoading, isError, error } = useInfiniteUsers(
    fetchType,
    username
  )

  const { toggleFollow, getIsFollowing } = useFollow()

  if (isLoading)
    return (
      <div className="h-full w-full grid place-content-center min-h-screen">
        <Spinner color="default" size="lg" className="text-center mx-auto" />
      </div>
    )

  if (isError) return <div>Error! {JSON.stringify(error)}</div>

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
