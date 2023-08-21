import {
  getPublicPosts,
  getFollowingPosts,
  getPublicPosts_withCursor,
  getFollowingPosts_withCursor,
  getLikedPostsByUsername_WithCursor,
  getLikedPostsByUsername,
  getPostsByUsername_WithCursor,
  getPostsByUsername,
  getRetweetedPostsByUsername,
  getRetweetedPostsByUsername_WithCursor,
} from "@/actions/posts-get-actions"

export const postTypeFunctions = {
  fyp: {
    withoutCursor: (userId: string, skip: number, take: number) =>
      getPublicPosts(skip, take),
    withCursor: (
      userId: string,
      skip: number,
      take: number,
      cursorObj: { id: string }
    ) => getPublicPosts_withCursor(skip, take, cursorObj),
  },
  following: {
    withoutCursor: (userId: string, skip: number, take: number) =>
      getFollowingPosts(userId, skip, take),
    withCursor: (
      userId: string,
      skip: number,
      take: number,
      cursorObj: { id: string }
    ) => getFollowingPosts_withCursor(userId, skip, take, cursorObj),
  },
  posts: {
    withoutCursor: (username: string, skip: number, take: number) =>
      getPostsByUsername(username, skip, take),
    withCursor: (
      username: string,
      skip: number,
      take: number,
      cursorObj: { id: string }
    ) => getPostsByUsername_WithCursor(username, skip, take, cursorObj),
  },
  retweets: {
    withoutCursor: (username: string, skip: number, take: number) =>
      getRetweetedPostsByUsername(username, skip, take),
    withCursor: (
      username: string,
      skip: number,
      take: number,
      cursorObj: { id: string }
    ) =>
      getRetweetedPostsByUsername_WithCursor(username, skip, take, cursorObj),
  },
  likes: {
    withoutCursor: (username: string, skip: number, take: number) =>
      getLikedPostsByUsername(username, skip, take),
    withCursor: (
      username: string,
      skip: number,
      take: number,
      cursorObj: { id: string }
    ) => getLikedPostsByUsername_WithCursor(username, skip, take, cursorObj),
  },
}
