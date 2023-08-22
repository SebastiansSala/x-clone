import Link from "next/link"

import PostModal from "./create-post-modal/create-post-modal"
import NavigationList from "./navigation-list"
import SignOutClientButton from "./signOut-client-button"
import Logo from "@/components/Icons/social/logo-icon"

const NavigationAside = () => {
  return (
    <nav className='sticky space-y-6 w-full inset-0 min-h-screen'>
      <Link href='home'>
        <Logo className='h-8 fill-white font-black' />
      </Link>
      <NavigationList />
      <PostModal />
      <div className='absolute bottom-0 color-white'>
        <SignOutClientButton />
      </div>
    </nav>
  )
}

export default NavigationAside
