import { Input } from "@nextui-org/input"
import AsideNav from "@/components/AsideNav"
import MailFilledIcon from "@/components/Icons/MailFilledIcon"
import { SearchIcon } from "@/components/Icons/NavbarIcons"
import FollowingCard from "@/components/Card"

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-black'>
      <div className='grid grid-cols-10 container mx-auto relative h-auto'>
        <aside className='px-10 col-span-2'>
          <AsideNav />
        </aside>
        <main className='col-span-5 border-x-1 border-[#2f3336] min-h-screen'>
          {children}
        </main>
        <aside className='col-span-3 px-10 relative space-y-4'>
          <div className='sticky inset-0 bg-black z-50 py-2'>
            <div className='relative w-full text-[#71767b] fill-transparent focus:fill-[#1d9bf0]'>
              <SearchIcon className=' fill-inherit h-6 absolute inset-0 left-4 top-2' />
              <input
                placeholder='Search'
                className='outline-none bg-[#2f3336] text-white rounded-full focus:bg-black  placeholder:text-[#71767b] py-2 px-3 pl-12 w-full focus:outline-1 focus:outline-[#1d9bf0]'
              />
            </div>
          </div>
          <ul className='bg-[#16181c] text-[#676b70] p-4 rounded-xl space-y-6'>
            <FollowingCard
              id='oinarstoarust'
              avatar='arostenrat'
              name='pedro'
              username='pedro'
            />
            <FollowingCard
              id='oinarstoarust'
              avatar='arostenrat'
              name='pedro'
              username='pedro'
            />
            <FollowingCard
              id='oinarstoarust'
              avatar='arostenrat'
              name='pedro'
              username='pedro'
            />
            <FollowingCard
              id='oinarstoarust'
              avatar='arostenrat'
              name='pedro'
              username='pedro'
            />
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default UserLayout
