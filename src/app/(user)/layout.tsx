import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Input } from "@nextui-org/input"

import NavigationAside from "@/components/navigation/navigation-aside"
import FollowingList from "@/components/following-list"
import { SearchIcon } from "@/components/Icons/utility/search-icon"

import { getUsers, getUsersNotFollowing } from "@/actions/users-get-actions"
import FollowDataProvider from "@/contexts/follow-data-context"


export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if(!session){
    redirect("/")
  }

  const users = session?.user
    ? await getUsersNotFollowing(session.user.id)
    : await getUsers()

  return (
    <FollowDataProvider>
      <div className='bg-black'>
        <div className='grid grid-cols-10 container mx-auto relative h-auto'>
          <aside className='px-10 col-span-2'>
            <NavigationAside />
          </aside>
          <section className='col-span-5 border-x-1 border-[#2f3336] min-h-screen'>
            {children}
          </section>
          <aside className='col-span-3 px-10 relative space-y-4'>
            <div className='sticky inset-0 bg-black z-50 py-2'>
              <div className='relative w-full text-[#71767b] fill-transparent focus:fill-[#1d9bf0]'>
                <Input
                  type='text'
                  placeholder='you@example.com'
                  startContent={
                    <SearchIcon className=' fill-inherit h-6 absolute inset-0 left-4 top-2' />
                  }
                />
              </div>
            </div>
            <FollowingList users={users} />
          </aside>
        </div>
      </div>
    </FollowDataProvider>
  )
}
