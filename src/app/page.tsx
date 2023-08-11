import Logo from "@/components/Icons/Logo"
import Link from "next/link"
import { Divider } from "@nextui-org/divider"
import LoginModal from "@/components/LoginModal"

export default function Login() {
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
            <button className='bg-white w-full max-w-xl py-2 rounded-full text-center'>
              Sign up with Google
            </button>
            <button className='bg-white w-full max-w-xl py-2 rounded-full text-center font-bold'>
              Sign up with Apple
            </button>
          </div>
          <Divider className='bg-gray-600 w-72 mt-8' />
          <div className='w-72 mt-8'>
            <button className='py-2 rounded-full w-full max-w-xl bg-[#1d9bf0] text-center text-white'>
              Create Account
            </button>
            <p className='text-gray-600 text-xs mt-2'>
              By signing up, you agree to the{" "}
              <Link href={"/terms"}>Terms of Service</Link> and{" "}
              <Link href={"/terms"}>Privacy Policy</Link>, including{" "}
              <Link href={"/terms"}>Cookie Use.</Link>
            </p>
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
