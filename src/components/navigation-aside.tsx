import Link from "next/link"
import NavbarLink from "./navigation-link"
import { navigationLinks } from "@/data/links"

import Logo from "@/components/Icons/Logo"
import PostModal from "./PostModal/PostModal"
import SignOutClientButton from "./Buttons/signOut-client-button"

const NavigationAside = () => {
  return (
    <nav className='sticky space-y-6 w-full inset-0 min-h-screen'>
      <Link href='home'>
        <Logo className='h-8 fill-white font-black' />
      </Link>
      {navigationLinks.map(({ text, href, icon, filledIcon }) => (
        <NavbarLink
          key={href}
          text={text}
          href={href}
          icon={icon}
          filledIcon={filledIcon}
        />
      ))}
      <PostModal />
      <div className='absolute bottom-0 color-white'>
        <SignOutClientButton />
      </div>
    </nav>
  )
}

export default NavigationAside
