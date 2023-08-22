"use client"

import { useState } from "react"

import PostList from "./post-list"
import Tabs from "@/components/tabs"

import { postTabs } from "@/data/tabs"

type PostSectionProps = {
  username?: string
}

export default function PostSection({ username }: PostSectionProps) {
  const [tab, setTab] = useState("fyp")

  const handleTabChange = (tab: string) => {
    setTab(tab)
  }

  return (
    <>
      <Tabs tabs={postTabs} postType={tab} handleTabChange={handleTabChange} />
      <PostList postType={tab} username={username} />
    </>
  )
}
