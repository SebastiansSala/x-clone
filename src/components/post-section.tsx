"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"

import PostList from "./post-list"
import Tabs from "@/components/tabs"

import { TabsType } from "@/types"

type PostSectionProps = {
  username?: string
  user?: User
  initialState: string
  tabs: TabsType[]
}

export default function PostSection({
  user,
  username,
  initialState,
  tabs,
}: PostSectionProps) {
  const [tab, setTab] = useState(initialState)

  const handleTabChange = (tab: string) => {
    setTab(tab)
  }

  return (
    <>
      <Tabs tabs={tabs} postType={tab} handleTabChange={handleTabChange} />
      <PostList postType={tab} user={user} username={username} />
    </>
  )
}
