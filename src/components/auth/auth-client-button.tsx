'use client'

import { Button } from '@nextui-org/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import GithubIcon from '../Icons/social/github-icon'

const AuthClientButton = () => {
  const supabase = createClientComponentClient()
  const handleSignIn = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    })
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => handleSignIn('github')}
        className="text-white bg-[#24292F] hover:bg-white/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
      >
        <GithubIcon className="h-4 w-4 mr-2" />
        Sign in with Github
      </Button>
    </>
  )
}

export default AuthClientButton
