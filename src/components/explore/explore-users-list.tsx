"use client"

import useFollowData from "@/hooks/use-follow-data"
import FollowingCard from "../following-card"

import useInfiniteUsers from "@/hooks/use-infinite-users"
import useFollow from "@/hooks/use-follow"

export default function UsersList() {
  const { users } = useInfiniteUsers()

  const { following } = useFollowData()
  const { toggleFollow } = useFollow(following)

  return (
    <ul>
      {users?.map(({ id, name, user_name, avatar_url }) => (
        <FollowingCard
          key={id}
          id={id}
          avatar_url={avatar_url}
          name={name}
          toggleFollow={toggleFollow}
          user_name={user_name}
        />
      ))}
    </ul>
  )
}
