import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import PostSection from "@/components/post-section"
import Tabs from "@/components/tabs"

import { profileTabs } from "@/data/tabs"

type ProfilePageProps = {
  params: {
    username: string
  }
  searchParams: {
    postType: string
  }
}

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageProps) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main className='text-white relative'>
      <Tabs tabs={profileTabs} postType={searchParams.postType} />
      <PostSection
        username={params.username}
        postType={searchParams.postType}
      />
    </main>
  )
}
