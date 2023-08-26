import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import PostSection from "@/components/post/post-section"
import ArrowBackButton from "@/components/navigation/navigation-back-button"

import prisma from "@/utils/prisma"
import { profileTabs } from "@/data/tabs"
import { Avatar } from "@nextui-org/avatar"

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
      <section className='relative p-4'>
        <div className='w-full h-40 bg-[#333639] z-0' />
        <Avatar className='absolute z-0' />
        <div className='p-4'>
          {user?.name}
          {user?.name}
          {user?.description}
        </div>
      </section>
      <PostSection
        username={params.username}
        user={session?.user}
        initialState='posts'
        tabs={profileTabs}
      />
    </main>
  )
}
