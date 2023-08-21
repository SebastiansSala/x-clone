import { serverSession } from "@/utils/supabase-server"
import LoginModal from "@/components/login-modal"
import Logo from "@/components/Icons/Logo"
import { redirect } from "next/navigation"
import AuthClientButton from "@/components/Buttons/auth-client-button"

export default async function Page() {
  const session = await serverSession()

  if (session) {
    redirect("/home/fyp")
  }

  return (
    <div className='bg-black'>
      <main className='container mx-auto min-h-screen grid md:grid-cols-2 place-content-center'>
        <section className='h-full'>
          <Logo className='lg:max-h-unit-7xl fill-white' fill='currentColor' />
        </section>
        <section>
          <header>
            <h1 className='text-white text-6xl font-black'>Happening now</h1>
          </header>
          <div className='mt-6'>
            <p className='text-white text-3xl font-black'>Join today</p>
          </div>
          <div className='mt-4 grid gap-y-3 w-72'>
            <AuthClientButton />
          </div>
          <footer className='mt-20 w-72'>
            <p className='text-white text font-bold'>
              Already have an account?
            </p>
            <LoginModal />
          </footer>
        </section>
      </main>
    </div>
  )
}
