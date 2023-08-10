import MailFilledIcon from "@/components/Icons/MailFilledIcon"
import NavbarLink from "@/components/NavbarButton"
import { Input } from "@nextui-org/input"
import {
  SearchIcon,
  NotificationsIcon,
  ProfileIcon,
  MessagesIcon,
  BookmarkIcon,
  HomeIcon,
} from "@/components/Icons/NavbarIcons"
import Logo from "@/components/Icons/Logo"

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-black'>
      <div className='grid grid-cols-6 container mx-auto relative'>
        <aside className='sticky px-10 left-0 top-0 col-span-1 h-full'>
          <nav className='space-y-3'>
            <NavbarLink
              href='home'
              icon={<Logo className='h-8 fill-white' />}
            />
            <NavbarLink
              text='Home'
              href='home'
              icon={<HomeIcon className='h-8' />}
            />
            <NavbarLink
              text='Explore'
              href='explore'
              icon={<SearchIcon className='h-8' />}
            />
            <NavbarLink
              text='Notifications'
              href='notifications'
              icon={<NotificationsIcon className='h-8' />}
            />
            <NavbarLink
              text='Messages'
              href='messages'
              icon={<MessagesIcon className='h-8' />}
            />
            <NavbarLink
              text='Bookmarks'
              href='bookmarks'
              icon={<BookmarkIcon className='h-8' />}
            />
            <NavbarLink
              text='Profile'
              href='profile'
              icon={<ProfileIcon className='h-8' />}
            />
          </nav>
          <div className='absolute bottom-0 color-white'>
            <span className='text-white'>Oliwis</span>
          </div>
        </aside>
        <main className='col-span-3 border min-h-screen'>{children}</main>
        <aside className='col-span-2 px-10'>
          <Input
            type='email'
            label='Email'
            placeholder='you@example.com'
            labelPlacement='outside'
            startContent={
              <MailFilledIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
            }
          />
        </aside>
      </div>
    </div>
  )
}

export default UserLayout
