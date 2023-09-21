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

export type PostTypeWithAll = {
  id: string
  text: string
  author: UserType
  authorId: string
  retweets?: RetweetType[]
  createdAt: Date
  image?: ImageType | null
  updatedAt: Date | null
  likes: UserType[]
  comments: PostCommentType[]
}

export type PostCommentType = {
  id: string
  text: string
  authorId: string
  createdAt: Date
  updatedAt?: string | null
  postId: string | null
  parentId: string | null
}

export type ReplyType = {
  id: string
  text: string
  author: UserType
  authorId: string
  retweets: RetweetType[]
  createdAt: Date
  image?: ImageType | null
  updatedAt?: string | null
  likes: UserType[]
  comments: ReplyType[]
  post?: PostType
  postId?: string | null
  parent?: ReplyType
  parentId?: string | null
}

export type CommentType = {
  id: string
  text: string
  author: UserType
  authorId: string
  retweets: RetweetType[]
  createdAt: Date
  image?: ImageType | null
  updatedAt?: Date | null
  likes: UserType[]
  comments: CommentType[]
  post: PostType
  postId?: string | null
  parent?: CommentType
  parentId?: string | null
  _count: {
    likes: number
    comments: number
    retweets: number
  }
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
