'use client'

import { redirect } from 'next/navigation'
import { useState } from 'react'

import Tabs from '@/components/post/post-tabs'
import PostList from './post-list'

import { TabsType } from '@/types'
import type { User } from '@supabase/supabase-js'

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

  if (!user && tab === 'following') {
    return redirect('/')
  }

  return (
    <>
      <Tabs
        tabs={tabs}
        isSticky={isSticky}
        postType={tab}
        handleTabChange={handleTabChange}
      />
      <PostList postType={tab} username={username} />
    </>
  )
}
