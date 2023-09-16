"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setBlockedUsers,
  setFollowers,
  setFollowing,
} from "@/features/auth-slice";
import { fetchUserFollowData } from "@/services/users-services";

const InitialDataContext = createContext(null);

export const useInitialData = () => {
  return useContext(InitialDataContext);
};

export default function InitialDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClientComponentClient();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFollowData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const followData = await fetchUserFollowData(session.user.id);

      if (!followData) return;

      dispatch(setFollowing(followData.following));
      dispatch(setFollowers(followData.followers));
      dispatch(setBlockedUsers(followData.blockedUsers));
    };

    fetchFollowData();
  }, [supabase.auth, dispatch]);

  return (
    <InitialDataContext.Provider value={null}>
      {children}
    </InitialDataContext.Provider>
  );
}
