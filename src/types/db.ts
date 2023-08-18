export type User = {
  id: string
  user_name: string
  name: string
  avatar_url: string
  description: string | null
}

export type UserWithPosts = User & {
  posts: Post[]
}

export type UserWithRetweets = User & {
  retweets: Retweet[]
}

export type UserWithComments = User & {
  comments: Comment[]
}

export type UserWithLikedPosts = User & {
  likedPosts: Post[]
}

export type UserWithLikedComments = User & {
  likedComments: Comment[]
}

export type UserWithMessages = User & {
  recievedMessages: Messages[]
  sentMessages: Messages[]
}

export type Messages = {
  id: string
  text: string
  image?: string
  sender: User
  senderId: string
  recipient: User
  recipientId: string
  createdAt: Date
}

export type Post = {
  id: string
  text: string
  author: User
  authorId: string

  createdAt: Date
  updatedAt: Date | null

  publicVisible: boolean
}

export type PostWithLikes = Post & {
  likes: User[]
}

export type PostWithComments = Post & {
  comments: Comment[]
}

export type PostWithRetweets = Post & {
  retweets: Retweet[]
}

export type PostWithAll = Post & {
  comments: Comment[]
  retweets: Retweet[]
  likes: User[]
}

export type Comment = {
  id: string
  createdAt: Date
  updatedAt: Date
  likes: User[]
  likes_count: number
  postId: string
  author: User
  authorId: string
}

export type Retweet = {
  id: string
  created_at: Date
  text: string
  author: User
  authorId: string
  post: Post
  postId: string
}
