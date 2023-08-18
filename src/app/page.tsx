import { getServerSession } from "@/utils/supabase-server"
import LoginModal from "@/components/LoginModal"
import Logo from "@/components/Icons/Logo"
import { redirect } from "next/navigation"
import AuthClientButton from "@/components/Buttons/auth-client-button"

export default async function Page() {
  const session = await getServerSession()

  if (session) {
    redirect("/home")
  }

  return (
    <div className='bg-black'>
      <main className='container mx-auto min-h-screen grid md:grid-cols-2 place-content-center'>
        <section className='h-full'>
          <Logo className='lg:max-h-unit-7xl fill-white' fill='currentColor' />
        </section>
        <section>
          <div>
            <h1 className='text-white text-6xl font-black'>Happening now</h1>
          </div>
          <div className='mt-6'>
            <p className='text-white text-3xl font-black'>Join today</p>
          </div>
          <div className='mt-4 grid gap-y-3 w-72'>
            <AuthClientButton />
          </div>
          <div className='mt-20 w-72'>
            <p className='text-white text font-bold'>
              Already have an account?
            </p>
            <LoginModal />
          </div>
        </section>
      </main>
    </div>
  )
}
