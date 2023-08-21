import TabsUsername from "@/components/Tabs/tabs-username"
import PostSection from "@/components/post-section"
import { profileTabs } from "@/data/tabs"
import { serverSession } from "@/utils/supabase-server"

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
  return (
    <main className='text-white relative'>
      <TabsUsername
        tabs={profileTabs}
        postType={searchParams.postType}
        username={params.username}
      />
      <PostSection
        username={params.username}
        postType={searchParams.postType}
      />
    </main>
  )
}
