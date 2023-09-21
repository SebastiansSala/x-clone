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
  createdAt: Date
  image: ImageType | null
  updatedAt: Date | null
}

export type PostTypeWithCounts = PostType & {
  _count: {
    likes: number
    comments: number
    retweets: number
  }
}

export type PostTypeWithAllActions = PostType & {
  likes: UserType[]
  comments: CommentTypeWithActions[]
  retweets: RetweetType[]
}

export type PostTypeWithMinimalActions = PostType & {
  likes: UserType[]
  comments: CommentType[]
  retweets: RetweetType[]
}

export type CommentType = {
  id: string
  text: string
  authorId: string
  createdAt: Date
  updatedAt?: string | null
  postId: string | null
  parentId: string | null
}

export type CommentTypeFull = CommentType & {
  author: UserType
  image: ImageType | null
}

export type CommentTypeWithMinimalActions = CommentTypeFull & {
  likes: UserType[]
  comments: CommentType[]
  retweets: RetweetType[]
}

export type CommentTypeWithActions = CommentTypeFull & {
  likes: UserType[]
  comments: CommentTypeWithActions[]
  retweets: RetweetType[]
}

export type ReplyType = {
  id: string
  text: string
  author?: UserType
  authorId: string
  retweets?: RetweetType[]
  createdAt: Date
  image?: ImageType | null
  updatedAt?: string | null
  likes?: UserType[]
  comments?: ReplyType[]
  post?: PostType
  postId?: string | null
  parent?: ReplyType
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

export type ImageType = {
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
