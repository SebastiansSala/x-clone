export type User = {
  id?: string
  user_name: string
  name: string
  avatar_url: string
  description?: string | null
}

export type Post = {
  id: string
  text: string
  authorId: string
  createdAt: Date
  updatedAt: Date | null
  publicVisible: boolean
  author: User
  comments: Comment[]
  retweets: Retweet[]
  likes: User[]
  images: Image[]
}

type Comment = {
  id: string
  createdAt: string
  updatedAt: string
  postId: string
  authorId: string
}

type Retweet = {
  id: string
  created_at: string
  text: string
  authorId: string
  postId: string
}

type Image = {
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
