export type User = {
  id: string
  username: string
  screen_name: string
  email: string
  avatar: string
  location: string
  url: string
  description: string
  followersCount: number
  listedCount: number
  createdAt: Date
  updatedAt?: Date
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
  name: string
  text: string
  author: User
  authorId: string
  retweets_count: number
  createdAt: Date
  updatedAt: Date | null
  likes_count: number
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
