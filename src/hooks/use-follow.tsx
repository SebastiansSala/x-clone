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

    const userId = userData.id

    try {
      console.log('isFollowing', isFollowing)
      if (isFollowing) {
        await unfollowUser(userId, authorId)
        dispatch(unfollow(authorId))
        toast.success('Unfollowed')
      } else {
        const followedUser = await followUser(userId, authorId)

        console.log('followedUser', followedUser)

        if (!followedUser) {
          toast.error('Error following user')
          return
        }
        dispatch(follow(followedUser))
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
