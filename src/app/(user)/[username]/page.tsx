import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

import ProfileSection from "@/components/profile-section"

type ProfilePageProps = {
  params: {
    username: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const supabase = createServerActionClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main className='text-white relative'>
      <div></div>
      <ProfileSection username={params.username} user={session?.user} />
    </main>
  )
}
