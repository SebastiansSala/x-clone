import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Input } from '@nextui-org/input'

import NavigationAside from '@/components/navigation/navigation-aside'
import FollowingList from '@/components/following-list'
import { SearchIcon } from '@/components/Icons/utility/search-icon'

import { getUsers, getUsersNotFollowing } from '@/actions/users-get-actions'

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
    <div className="bg-black">
      <div className="sm:grid sm:grid-cols-10 container mx-auto relative h-auto md:px-10">
        <NavigationAside />
        <section className="sm:col-span-9 lg:col-span-5 border-x-1 border-[#2f3336] min-h-screen">
          {children}
        </section>
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 px-10 relative space-y-4 py-4">
          <FollowingList users={users} />
        </aside>
      </div>
    </div>
  )
}
