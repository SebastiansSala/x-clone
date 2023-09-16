import { createSlice } from '@reduxjs/toolkit'

import type { UserType } from '@/types/posts'
import type { PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  userData: UserType | null
  following: UserType[]
  followers: UserType[]
  blockedUsers: UserType[]
}

const initialState: AuthState = {
  userData: null,
  following: [],
  followers: [],
  blockedUsers: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    setFollowing: (state, action) => {
      state.following = action.payload
    },
    setFollowers: (state, action) => {
      state.followers = action.payload
    },
    setBlockedUsers: (state, action) => {
      state.blockedUsers = action.payload
    },
    unfollow: (state, action: PayloadAction<string>) => {
      state.following = state.following.filter(
        (user) => user.id !== action.payload
      )
    },
    follow: (state, action: PayloadAction<UserType>) => {
      state.following.push(action.payload)
    },
  },
})

export const { setFollowing, setFollowers, setBlockedUsers, unfollow, follow } =
  authSlice.actions

export default authSlice.reducer
