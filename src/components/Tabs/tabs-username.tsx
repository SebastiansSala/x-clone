"use client"

import { Tabs, Tab } from "@nextui-org/tabs"
import Post from "@/components/Post"
import type { Post as PostType } from "@/types/posts"

type TabPostsProps = {
  posts: PostType[]
  likedPosts: PostType[]
  retweetedPosts: PostType[]
}

export default function TabPosts({
  posts,
  likedPosts,
  retweetedPosts,
}: TabPostsProps) {
  let tabs = [
    {
      id: "posts",
      label: "Posts",
      content: posts,
    },
    {
      id: "retweets",
      label: "Retweets",
      content: likedPosts,
    },
    {
      id: "likes",
      label: "Likes",
      content: retweetedPosts,
    },
  ]

  return (
    <Tabs
      aria-label='Dynamic tabs'
      variant='underlined'
      items={tabs}
      classNames={{
        tabList: "",
        tab: "w-full",
        cursor: "w-full bg-[#22d3ee]",
        tabContent: "group-data-[selected=true]:text-[#06b6d4]",
      }}
    >
      {(item) => (
        <Tab key={item.id} title={item.label}>
          <ul>
            {item.content.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </ul>
        </Tab>
      )}
    </Tabs>
  )
}
