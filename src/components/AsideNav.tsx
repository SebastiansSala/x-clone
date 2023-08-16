import Link from "next/link"
import NavbarLink from "./NavbarButton"

import {
  BookmarkFilledIcon,
  BookmarkIcon,
  HomeFilledIcon,
  HomeIcon,
  MessagesFilledIcon,
  MessagesIcon,
  NotificationsFilledIcon,
  NotificationsIcon,
  ProfileFilledIcon,
  ProfileIcon,
  SearchFilledIcon,
  SearchIcon,
} from "@/components/Icons/NavbarIcons"

import Logo from "@/components/Icons/Logo"
import PostModal from "./PostModal/PostModal"

const AsideNav = () => {
  return (
    <nav className='sticky space-y-6 w-full inset-0 min-h-screen'>
      <Link href='home'>
        <Logo className='h-8 fill-white font-black' />
      </Link>
      <NavbarLink
        text='Home'
        href='home'
        icon={<HomeIcon className='h-8' />}
        filledIcon={<HomeFilledIcon className='h-8 fill-white' />}
      />
      <NavbarLink
        text='Explore'
        href='explore'
        icon={<SearchIcon className='h-8' />}
        filledIcon={<SearchFilledIcon className='h-8 fill-white' />}
      />
      <NavbarLink
        text='Notifications'
        href='notifications'
        icon={<NotificationsIcon className='h-8' />}
        filledIcon={<NotificationsFilledIcon className='h-8 fill-white' />}
      />
      <NavbarLink
        text='Messages'
        href='messages'
        icon={<MessagesIcon className='h-8' />}
        filledIcon={<MessagesFilledIcon className='h-8 fill-white' />}
      />
      <NavbarLink
        text='Bookmarks'
        href='bookmarks'
        icon={<BookmarkIcon className='h-8' />}
        filledIcon={<BookmarkFilledIcon className='h-8 fill-white' />}
      />
      <NavbarLink
        text='Profile'
        href='profile'
        icon={<ProfileIcon className='h-8' />}
        filledIcon={<ProfileFilledIcon className='h-8 fill-white' />}
      />

      <div className='absolute bottom-0 color-white'>
        <span className='text-white'>Oliwis</span>
      </div>
    </nav>
  )
}

export default AsideNav
