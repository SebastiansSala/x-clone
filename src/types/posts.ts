export type UserType = {
  id: string
  user_name: string
  name: string
  avatar_url: string
  description?: string | null
}

export type UserFollowDataType = UserType & {
  followers: UserType[]
  following: UserType[]
  blockedUsers: UserType[]
}

export type PostType = {
  id: string
  text: string
  authorId: string
  createdAt: Date
  updatedAt: Date | null
  author: UserType
  comments: CommentType[]
  retweets: RetweetType[]
  likes: UserType[]
  image?: ImageType
}

export type CommentType = {
  id: string
  text: string
  createdAt: Date
  updatedAt: Date | null
  likes: UserType[]
  post: PostType
  postId: string
  author: UserType
  authorId: string
  image?: ImageType
}

type RetweetType = {
  id: string
  created_at: string
  text: string
  authorId: string
  postId: string
}

type ImageType = {
  id: string
  createdAt: Date
  url: string
  postId: string | null
  messageId: string | null
  commentId: string | null
}
