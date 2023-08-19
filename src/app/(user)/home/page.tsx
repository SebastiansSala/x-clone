import { getPostsSortedByDate } from "@/actions/posts"
import Post from "@/components/Post"
import { getServerSession } from "@/utils/supabase-server"
import { Tabs, Tab } from "@nextui-org/tabs"
import { redirect } from "next/navigation"

const Home = async () => {
  const session = await getServerSession()

  if (!session) {
    redirect("/")
  }

  const posts = await getPostsSortedByDate()

  return (
    <div className='text-white relative'>
      <section className='p-4 backdrop-blur-sm sticky inset-0 z-50'>
        <h3>Home</h3>
        <nav className='p-4'>
          <ul className='grid grid-cols-2 text-center'>
            <Tab key='fyp' title='For you' />
            <Tab key='following' title='Following' />
          </ul>
        </nav>
      </section>
      <section>
        <div></div>
      </section>
      <ul>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
        {posts.length === 0 && <div className='text-white'>No posts yet</div>}
      </ul>
    </div>
  )
}

export default Home
