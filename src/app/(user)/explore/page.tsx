import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Divider } from "@nextui-org/divider"
import { Input } from "@nextui-org/input"

import UsersList from "@/components/users-list"
import { SearchIcon } from "@/components/Icons/utility/search-icon"
import { getUsers, getUsersNotFollowing } from "@/actions/users-get-actions"

export default async function ExplorePage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const users = session?.user
    ? await getUsersNotFollowing(session.user.id)
    : await getUsers()

  return (
    <main>
      <div className={`w-full sticky inset-0 z-50 backdrop-blur-sm `}>
        <div className='w-full p-4'>
          <Input
            type='text'
            placeholder='Search'
            startContent={
              <SearchIcon className=' fill-inherit h-6 absolute inset-0 left-4 top-2' />
            }
          />
        </div>
        <Divider />
      </div>
      <UsersList users={users} />
    </main>
  )
}
