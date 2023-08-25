"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"

import PostCard from "@/components/post-card"

import usePosts from "@/hooks/usePosts"
import useLike from "@/hooks/useLike"
import useFollowData from "@/hooks/useFollowData"
import { followUser, unfollowUser } from "@/services/users-services"
import { toast } from "react-hot-toast"

type Props = {
  postType: string
  username?: string
  user?: User
}

export default function PostList({ postType, username, user }: Props) {
  const { posts, isLoading, isError, ref, isFetchingNextPage, error } =
    usePosts(postType, username)

  const { following } = useFollowData()

  const followingInitial = following?.map((follow) => follow.id)

  const [followingMap, setFollowingMap] = useState(followingInitial)

  const onFollowChange = async (authorId: string) => {
    setFollowingMap((prevMap) => {
      if (prevMap?.includes(authorId)) {
        return prevMap?.filter((id) => id !== authorId)
      } else {
        return [...prevMap, authorId]
      }
    })
    if (following) {
      toast.promise(unfollowUser(authorId), {
        loading: "Unfollowing...",
        success: "Unfollowed",
        error: "Error unfollowing user",
      })
    } else {
      toast.promise(followUser(authorId), {
        loading: "Following...",
        success: "Followed",
        error: "Error following user",
      })
    }
  }

  const { likeMutation } = useLike(postType)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <div>Error! {JSON.stringify(error)}</div>

  return (
    <>
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          user={user}
          likeMutation={likeMutation}
          isFollowing={followingMap?.includes(post.author.id)}
          onFollowChange={onFollowChange}
        />
      ))}

      {isFetchingNextPage ? <div className='loading'>Loading...</div> : null}

      <span style={{ visibility: "hidden" }} ref={ref}>
        intersection observer marker
      </span>
    </>
  )
}
