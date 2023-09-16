import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Input } from '@nextui-org/input'

import NavigationAside from '@/components/navigation/navigation-aside'
import FollowingList from '@/components/following-list'
import { SearchIcon } from '@/components/Icons/utility/search-icon'

import { getUsers, getUsersNotFollowing } from '@/actions/users-get-actions'
import InitialDataProvider from '@/contexts/initial-data-provider'

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const users = session?.user
    ? await getUsersNotFollowing(session.user.id)
    : await getUsers()

  return (
    <InitialDataProvider>
      <div className="bg-black">
        <div className="sm:grid sm:grid-cols-10 container mx-auto relative h-auto md:px-10">
          <aside className="sm:p-4 z-50 xl:px-10 xl:col-span-2 sm:col-span-1 fixed w-full sm:static bottom-0">
            <NavigationAside />
          </aside>
          <section className="xl:col-span-5 sm:col-span-9 lg:col-span-6 border-x-1 border-[#2f3336] min-h-screen">
            {children}
          </section>
          <aside className="hidden lg:block col-span-3 px-10 relative space-y-4">
            <div className="sticky inset-0 bg-black z-50 py-2">
              <div className="relative w-full text-[#71767b] fill-transparent focus:fill-[#1d9bf0]">
                <Input
                  type="text"
                  placeholder="you@example.com"
                  startContent={
                    <SearchIcon className=" fill-inherit h-6 absolute inset-0 left-4 top-2" />
                  }
                />
              </div>
            </div>
            <FollowingList users={users} />
          </aside>
        </div>
      </div>
    </InitialDataProvider>
  )
}
