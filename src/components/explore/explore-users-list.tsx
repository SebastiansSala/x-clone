"use client"

import FollowingCard from "../following-card"

import useInfiniteUsers from "@/hooks/use-infinite-users"

export default function UsersList() {
  const { users } = useInfiniteUsers()

  return (
    <ul>
      {users?.map(({ id, name, user_name, avatar_url }) => (
        <FollowingCard
          key={id}
          id={id}
          avatar_url={avatar_url}
          name={name}
          user_name={user_name}
        />
      ))}
    </ul>
  )
}
