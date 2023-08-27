"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"

import PostList from "./post-list"
import Tabs from "@/components/post/post-tabs"

import { TabsType } from "@/types"
import { redirect } from "next/navigation"

type PostSectionProps = {
  initialState: string
  tabs: TabsType[]
  isSticky: boolean
  user?: User
  username?: string
}

export default function PostSection({
  user,
  username,
  initialState,
  tabs,
  isSticky,
}: PostSectionProps) {
  const [tab, setTab] = useState(initialState)

  const handleTabChange = (tab: string) => {
    setTab(tab)
  }

  if (!user && tab === "following") {
    return redirect("/")
  }

  return (
    <>
      <Tabs
        tabs={tabs}
        isSticky={isSticky}
        postType={tab}
        handleTabChange={handleTabChange}
      />
      <PostList postType={tab} user={user} username={username} />
    </>
  )
}
