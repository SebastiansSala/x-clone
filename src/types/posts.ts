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
}

export type PostType = {
  id: string
  text: string
  authorId: string
  createdAt: Date
  updatedAt: Date | null
  publicVisible: boolean
  author: UserType
  comments: CommentType[]
  retweets: RetweetType[]
  likes: UserType[]
  images: ImageType[]
}

type CommentType = {
  id: string
  createdAt: string
  updatedAt: string
  postId: string
  authorId: string
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

export type PostImage = {
  url: string
}
