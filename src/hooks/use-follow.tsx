import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { follow, unfollow } from '@/features/auth-slice'
import { followUser, unfollowUser } from '@/services/users-services'

import type { RootState } from '@/app/store'
import type { UserType } from '@/types/posts'

export default function useFollow() {
  const dispatch = useDispatch()
  const following = useSelector((state: RootState) => state.auth.following)
  const userData = useSelector((state: RootState) => state.auth.userData)

  const toggleFollow = async (authorId: string) => {
    const isFollowing = getIsFollowing(authorId)

    if (!userData) {
      toast.error('You must be logged in to follow users')
      return
    }
    try {
      if (isFollowing) {
        const res = await unfollowUser(authorId)
        dispatch(unfollow(res))
        toast.success('Unfollowed')
      } else {
        await followUser(authorId)
        dispatch(follow(userData))
        toast.success('Followed')
      }
    } catch (e) {
      console.error(e)
      toast.error('Error following user')
    }
  }

  const getIsFollowing = (authorId: string) => {
    const followingIds = following?.map((user: UserType) => user.id)
    const isFollowing = followingIds?.includes(authorId)
    return isFollowing
  }

  return {
    toggleFollow,
    getIsFollowing,
  }
}
