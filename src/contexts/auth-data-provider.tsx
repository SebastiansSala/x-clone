"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { fetchUserFollowData } from "@/services/users-services";
import { UserFollowDataType, UserType } from "@/types/posts";

type FollowDataContextType = {
  following: UserType[];
  followers: UserType[];
  blockedUsers: UserType[];
};

export const AuthDataContext = createContext<FollowDataContextType | null>(
  null
);

export default function AuthDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [following, setFollowing] = useState<UserType[]>([]);
  const [followers, setFollowers] = useState<UserType[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<UserType[]>([]);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchFollowData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const followData = await fetchUserFollowData(session.user.id);

      if (!followData) return;

      setFollowing(followData.following);
      setFollowers(followData.followers);
      setBlockedUsers(followData.blockedUsers);
    };

    fetchFollowData();
  }, [supabase.auth]);

  return (
    <AuthDataContext.Provider value={{ following, followers, blockedUsers }}>
      {children}
    </AuthDataContext.Provider>
  );
}
