import {
  HomeIcon,
  HomeFilledIcon,
  SearchIcon,
  SearchFilledIcon,
  MessagesIcon,
  MessagesFilledIcon,
  ProfileIcon,
  ProfileFilledIcon,
} from "../components/Icons/navigation-icons"

export const navigationLinks = [
  {
    text: "Home",
    href: "/home/fyp",
    icon: <HomeIcon className='h-8' />,
    filledIcon: <HomeFilledIcon className='h-8' />,
  },
  {
    text: "Explore",
    href: "/explore",
    icon: <SearchIcon className='h-8' />,
    filledIcon: <SearchFilledIcon className='h-8 fill-white' />,
  },
  {
    text: "Messages",
    href: "/messages",
    icon: <MessagesIcon className='h-8' />,
    filledIcon: <MessagesFilledIcon className='h-8 fill-white' />,
  },
  {
    text: "Profile",
    href: "/profile",
    icon: <ProfileIcon className='h-8' />,
    filledIcon: <ProfileFilledIcon className='h-8 fill-white' />,
  },
]
