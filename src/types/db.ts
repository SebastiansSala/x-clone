type PostType = {
  id: string
  name: string
  text: string
  user: UserType
  retweet_count: number
  retweeted_status: RetweetedStatusType[]
}

type RetweetedStatusType = {
  created_at: string
  id: string
  text: string
  user: UserType
}

type UserType = {
  id: string
  name: string
  screen_name: string
  avatar: string
  location: string
  favorites_count: number
  url: string
  description: string
  followers_count: number
  listed_count: number
  created_at: string
  following: UserType[]
  followers: UserType[]
  messages: MessagesType[]
  posts: PostType[]
}

type MessagesType = {
  id: string
  text: string
  image?: string
  sender: UserType
  recipient: UserType
  created_at: string
}
