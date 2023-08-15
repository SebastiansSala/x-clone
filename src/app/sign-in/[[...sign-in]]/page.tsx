import Logo from "@/components/Icons/Logo"
import { SignIn } from "@clerk/nextjs"

export default function Login() {
  return (
    <div className='bg-black'>
      <div className='container mx-auto min-h-screen grid md:grid-cols-2 place-content-center'>
        <section className='h-full flex justify-center items-center w-full'>
          <Logo className='lg:max-h-unit-7xl fill-white' fill='currentColor' />
        </section>
        <SignIn />
      </div>
    </div>
  )
}
