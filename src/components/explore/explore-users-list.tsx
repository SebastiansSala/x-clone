"use client";

import FollowingCard from "../following-card";

import useInfiniteUsers from "@/hooks/use-infinite-users";
import useFollow from "@/hooks/use-auth";
import useAuthData from "@/hooks/use-auth-data";

export default function UsersList({ fetchType }: { fetchType: string }) {
  const { users } = useInfiniteUsers(fetchType);

  const { following } = useAuthData();
  const { toggleFollow, isLoading } = useFollow(following);

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
  );
}
