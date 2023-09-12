"use client";

import Link from "next/link";
import FollowingCard from "./following-card";

import type { UserType } from "@/types/posts";
import useFollow from "@/hooks/use-auth";

export default function FollowingList({ users }: { users: UserType[] }) {
  const { toggleFollow, isLoading, followingMap } = useFollow(users);

  return (
    <ul className="bg-[#16181c] text-[#676b70] rounded-xl">
      <li className="text-xl text-white p-4 font-black">
        What&apos;s happening
      </li>
      {users?.map(({ id, name, user_name, avatar_url }) => (
        <FollowingCard
          key={id}
          id={id}
          avatar_url={avatar_url}
          name={name}
          user_name={user_name}
          isLoading={isLoading}
          toggleFollow={toggleFollow}
          isFollowing={!followingMap?.includes(id)}
        />
      ))}
      <li className="hover:bg-[#1d1f23] cursor-pointer transition duration-250 text-xl text-white p-4 rounded-b-xl font-black">
        <Link href="/explore">Show More</Link>
      </li>
    </ul>
  );
}
