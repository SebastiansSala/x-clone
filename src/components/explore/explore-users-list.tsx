"use client"

import useFollowData from "@/hooks/use-follow-data"
import FollowingCard from "../following-card"

import useInfiniteUsers from "@/hooks/use-infinite-users"
import useFollow from "@/hooks/use-follow"
import { type User } from "@supabase/supabase-js"

type UsersListProps = {
  user?: User 
}


export default function UsersList({ user}: UsersListProps) {
  const { users } = useInfiniteUsers()

  const { following } = useFollowData()
  const { toggleFollow, isLoading } = useFollow(following)

  return (
    <ul>
      {users?.map(({ id, name, user_name, avatar_url }) => (
        <FollowingCard
          key={id}
          id={id}
          avatar_url={avatar_url}
          name={name}
          user_name={user_name}
          toggleFollow={toggleFollow}
          isLoading={isLoading}
          isFollowing={following?.includes(id)}
        />
      ))}
    </ul>
  )
}
