import { HomeIcon, HomeFilledIcon } from "@/components/Icons/utility/home-icon"
import {
  MessagesFilledIcon,
  MessagesIcon,
} from "@/components/Icons/utility/message-icon"
import {
  ProfileFilledIcon,
  ProfileIcon,
} from "@/components/Icons/utility/profile-icon"
import {
  SearchFilledIcon,
  SearchIcon,
} from "@/components/Icons/utility/search-icon"

export const navigationLinks = [
  {
    text: "Home",
    href: "home",
    icon: <HomeIcon className='h-8' />,
    filledIcon: <HomeFilledIcon className='h-8' />,
  },
  {
    text: "Explore",
    href: "explore",
    icon: <SearchIcon className='h-8' />,
    filledIcon: <SearchFilledIcon className='h-8 fill-white' />,
  },
  {
    text: "Messages",
    href: "messages",
    icon: <MessagesIcon className='h-8' />,
    filledIcon: <MessagesFilledIcon className='h-8 fill-white' />,
  },
  {
    text: "Profile",
    href: "profile",
    icon: <ProfileIcon className='h-8' />,
    filledIcon: <ProfileFilledIcon className='h-8 fill-white' />,
  },
]
