import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

import PostSection from "@/components/post-section"
import Tabs from "@/components/tabs"

import { postTabs } from "@/data/tabs"

export default async function Home({
  searchParams,
}: {
  searchParams: { postsType: string }
}) {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <main className='text-white relative'>
      <Tabs tabs={postTabs} postType={searchParams.postsType} />
      <PostSection postType={searchParams.postsType} />
    </main>
  )
}
