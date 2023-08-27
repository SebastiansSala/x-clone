import { useState } from "react"
import { toast } from "react-hot-toast"

import { followUser, unfollowUser } from "@/services/users-services"

import { UserType } from "@/types/posts"

export default function useFollow(following: UserType[]) {
  const initalFollowingState = following?.map((follow) => follow.id)

  const [followingMap, setFollowingMap] = useState(initalFollowingState)
  const [loading, setLoading] = useState(false)

  const toggleFollow = async (authorId: string) => {
    setFollowingMap((prevMap) => {
      if (prevMap?.includes(authorId)) {
        return prevMap?.filter((id) => id !== authorId)
      } else {
        return [...prevMap, authorId]
      }
    })

    const isFollowing = followingMap?.includes(authorId)

    if (isFollowing) {
      setLoading(true)
      toast
        .promise(unfollowUser(authorId), {
          loading: "Unfollowing...",
          success: "Unfollowed",
          error: "Error unfollowing user",
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(true)
      toast
        .promise(followUser(authorId), {
          loading: "Following...",
          success: "Followed",
          error: "Error following user",
        })
        .finally(() => setLoading(false))
    }
  }

  return {
    followingMap,
    toggleFollow,
  }
}
