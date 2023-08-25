import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import PostSection from "@/components/post-section"
import ArrowBackButton from "@/components/arrow-back-button"

import prisma from "@/utils/prisma"
import { profileTabs } from "@/data/tabs"

type ProfilePageProps = {
  params: {
    username: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  const user = await prisma.users.findFirst({
    where: {
      user_name: params.username,
    },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  })

  return (
    <main className='text-white relative'>
      <div className='w-full flex items-center gap-4 sticky inset-0 px-2 py-1'>
        <ArrowBackButton />

        <div>
          <h5 className='uppercase text-xl'>{params.username}</h5>
          <p className='text-gray-'>{user?._count.posts}</p>
        </div>
      </div>
      <PostSection
        username={params.username}
        user={session?.user}
        initialState='fyp'
        tabs={profileTabs}
      />
    </main>
  )
}
