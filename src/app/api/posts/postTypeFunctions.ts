import {
  getFollowingPosts,
  getLikedPostsByUsername,
  getPostsByUsername,
  getRetweetedPostsByUsername,
} from "@/actions/posts-get-actions"

import type { PostType } from "@/types/posts"

type FetchFunction = (
  usernameOrUserId: string,
  skip: number,
  take: number,
  cursor: { id: string } | undefined
) => Promise<PostType[]>

type PostTypeFunctions = {
  [key: string]: FetchFunction
}

const postTypeFunctions: PostTypeFunctions = {
  following: getFollowingPosts,
  liked: getLikedPostsByUsername,
  retweeted: getRetweetedPostsByUsername,
  user: getPostsByUsername,
}

export const fetchPostFunctions = async (
  postType: string,
  usernameOruserId: string,
  skip: number,
  take: number,
  cursorObj: { id: string } | undefined
) => {
  const fetchFunction = postTypeFunctions[postType]

  if (!fetchFunction) {
    throw new Error("Invalid post type")
  }

  return fetchFunction(usernameOruserId, skip, take, cursorObj)
}
