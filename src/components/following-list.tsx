"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import FollowingCard from "./following-card";

import { followUser, unfollowUser } from "@/services/users-services";

import type { RootState } from "@/app/store";
import type { UserType } from "@/types/posts";

export default function FollowingList({ users }: { users: UserType[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const following = useSelector((state: RootState) => state.auth.following);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const isFollowing = userData ? following.includes(userData) : false;

  const toggleFollow = async (authorId: string) => {
    try {
      setIsLoading(true);
      if (isFollowing) {
        await unfollowUser(authorId);
        toast.success("Unfollowed");
      } else {
        await followUser(authorId);
        toast.success("Followed");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error following user");
    } finally {
      setIsLoading(false);
    }
  };

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
          isFollowing={isFollowing}
        />
      ))}
      <li className="hover:bg-[#1d1f23] cursor-pointer transition duration-250 text-xl text-white p-4 rounded-b-xl font-black">
        <Link href="/explore">Show More</Link>
      </li>
    </ul>
  );
}
