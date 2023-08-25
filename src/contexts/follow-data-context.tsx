"use client"

import { createContext, useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { fetchUserFollowData } from "@/services/users-services"

import { UserFollowDataType, UserType } from "@/types/posts"

type FollowDataContextType = {
  following: UserType[]
  followers: UserType[]
}

export const FollowDataContext = createContext<FollowDataContextType | null>(
  null
)

export default function FollowDataProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [following, setFollowing] = useState<UserType[]>([])
  const [followers, setFollowers] = useState<UserType[]>([])

  useEffect(() => {
    async function fetchFollowData() {
      const supabase = createClientComponentClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) return
      const followData = (await fetchUserFollowData(
        session.user.id
      )) as UserFollowDataType

      setFollowing(followData.following)
      setFollowers(followData.followers)
    }

    fetchFollowData()
  }, [])

  return (
    <FollowDataContext.Provider value={{ following, followers }}>
      {children}
    </FollowDataContext.Provider>
  )
}
