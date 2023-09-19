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
  author: UserType
  authorId: string
  retweets?: RetweetType[]
  createdAt: Date
  image?: ImageType | null
  updatedAt: Date | null
  likes: UserType[]
  comments: CommentType[]
}

export type CommentType = {
  id: string
  text: string
  author: UserType
  authorId: string
  retweets: RetweetType[]
  createdAt: Date
  image?: ImageType | null
  updatedAt?: string
  likes: UserType[]
  comments: CommentType[]
  post: PostType
  postId?: string | null
  parent?: CommentType
  parentId?: string | null
}

type RetweetType = {
  id: string
  created_at: Date
  text: string
  author?: UserType
  authorId: string
  post?: PostType
  postId?: string | null
  comment?: CommentType
  commentId?: string | null
}

export type ItemType = {
  id: string
  text: string
  author: UserType
  authorId: string
  retweets: RetweetType[]
  createdAt: Date
  image?: ImageType | null
  updatedAt?: string
  likes: UserType[]
  comments: CommentType[]
  post: PostType
  postId?: string | null
  parent?: CommentType
  parentId?: string | null
}

type ImageType = {
  id: string
  createdAt: Date
  url: string
  post?: PostType
  postId?: string | null
  message?: CommentType
  messageId?: string | null
  comment?: CommentType
  commentId?: string | null
}
