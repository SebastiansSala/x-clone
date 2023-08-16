import Post from "@/components/Post"
import prisma from "@/utils/prisma"
import { Tabs, Tab } from "@nextui-org/tabs"

const Home = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      likes: true,
      retweets: true,
      comments: true,
    },
  })

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
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  )
}

export default Home
