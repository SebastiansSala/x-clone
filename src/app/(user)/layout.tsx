import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Input } from "@nextui-org/input"

import NavigationAside from "@/components/navigation-aside"
import FollowingCard from "@/components/following-card"
import { SearchIcon } from "@/components/Icons/utility/search-icon"

import { getUsersNotFollowing } from "@/actions/users-get-actions"

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const users = session?.user ? await getUsersNotFollowing(session.user.id) : []

  return (
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

          <ul className='bg-[#16181c] text-[#676b70] rounded-xl'>
            <li className='text-xl text-white pt-4 px-4 font-black'>
              What&apos;s happening
            </li>
            {users?.map(({ id, name, user_name, avatar_url }) => (
              <FollowingCard
                key={id}
                avatar_url={avatar_url}
                name={name}
                user_name={user_name}
              />
            ))}
            <li className='hover:bg-[#1d1f23] cursor-pointer transition duration-250 text-xl text-white p-4 rounded-b-xl font-black'>
              <a>Show More</a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
