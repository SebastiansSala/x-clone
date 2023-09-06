import { useState } from "react"
import { toast } from "react-hot-toast"

import { followUser, unfollowUser } from "@/services/users-services"

import { UserType } from "@/types/posts"

export default function useFollow(following: UserType[]) {
  
  const initalFollowingState = following?.map((follow) => follow.id)
  
  const [followingMap, setFollowingMap] = useState(initalFollowingState)
  const [isLoading, setIsLoading] = useState(false)
  

  const toggleFollow = async (authorId: string) => {

    if(isLoading) return
    
    setFollowingMap((prev) => {
      if (prev?.includes(authorId)) {
        return prev?.filter((id) => id !== authorId)
      } else {
        return [...prev, authorId]
      }
    })

    const isFollowing = followingMap?.includes(authorId)

    if (isFollowing) {
      setIsLoading(true)
      toast
        .promise(unfollowUser(authorId), {
          loading: "Unfollowing...",
          success: "Unfollowed",
          error: "Error unfollowing user",
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(true)
      toast
        .promise(followUser(authorId), {
          loading: "Following...",
          success: "Followed",
          error: "Error following user",
        })
        .finally(() => setIsLoading(false))
    }
  }

  return {
    isLoading,
    followingMap,
    toggleFollow,
  }
}
