'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const SignOutClientButton = () => {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm xl:px-5 xl:py-2.5 text-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 xl:mr-2 xl:mb-2"
    >
      Sign Out
    </button>
  )
}

export default SignOutClientButton
