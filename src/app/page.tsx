import Divider from '@/components/Divider';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='container mx-auto min-h-screen items-center flex flex-col md:flex-row'>
      <div className='md:flex-1 h-28 w-full'>
        <svg
          viewBox='0 0 24 24'
          aria-hidden='true'
          className='r-k200y r-1nao33i r-4qtqp9 r-yyyyoo r-5sfk15 r-dnmrzs r-kzbkwu r-bnwqim r-1plcrui r-lrvibr'
        >
          <g>
            <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'></path>
          </g>
        </svg>
      </div>
      <div>
        <div>
          <h1>Happening now</h1>
        </div>
        <div>
          <p>Join today</p>
        </div>
        <div>
          <button>Login</button>
          <button>Sign up with Apple</button>
        </div>
        <Divider />
        <div>
          <button>Login</button>
          <p>
            By signing up, you agree to the{' '}
            <Link href={'/terms'}>Terms of Service</Link> and{' '}
            <Link href={'/terms'}>Privacy Policy</Link>, including{' '}
            <Link href={'/terms'}>Cookie Use.</Link>
          </p>
        </div>
        <div></div>
      </div>
    </main>
  );
}
