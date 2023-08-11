import Post from "@/components/Post"
import { Tabs, Tab } from "@nextui-org/tabs"

const Home = () => {
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
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </ul>
    </div>
  )
}

export default Home
