import {
  getFollowingPosts,
  getLikedPostsById,
  getPostsById,
  getRetweetedPostsByUsername,
} from '@/actions/posts-get-actions'

type FetchFunction = (
  userId: string,
  skip: number,
  take: number,
  cursor: { id: string } | undefined
) => Promise<any[]>

type PostTypeFunctions = {
  [key: string]: FetchFunction
}

const postTypeFunctions: PostTypeFunctions = {
  following: getFollowingPosts,
  posts: getPostsById,
  retweets: getRetweetedPostsByUsername,
  likes: getLikedPostsById,
}

export const fetchPostFunctions = async (
  postType: string,
  userId: string,
  skip: number,
  take: number,
  cursorObj: { id: string } | undefined
) => {
  const fetchFunction = postTypeFunctions[postType]

  if (!fetchFunction) {
    throw new Error('Invalid post type')
  }

  return fetchFunction(userId, skip, take, cursorObj)
}
