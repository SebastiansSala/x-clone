"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"

import Tabs from "./tabs"
import PostList from "./post-list"

import { profileTabs } from "@/data/tabs"

type ProfileSectionProps = {
  username: string
  user?: User
}

export default function ProfileSection({
  username,
  user,
}: ProfileSectionProps) {
  const [tab, setTab] = useState("posts")

  const handleTabChange = (tab: string) => {
    setTab(tab)
  }

  return (
    <>
      <Tabs
        tabs={profileTabs}
        postType={tab}
        handleTabChange={handleTabChange}
      />
      <PostList postType={tab} username={username} user={user} />
    </>
  )
}
