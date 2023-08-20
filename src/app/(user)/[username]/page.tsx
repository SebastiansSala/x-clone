import {
  getPostsByUsername,
  getRetweetedPostsByUsername,
  getLikedPostsByUsername,
} from "@/actions/posts"
import TabPosts from "@/components/Tabs/tabs-username"

type ProfilePageProps = {
  params: {
    username: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const posts = await getPostsByUsername(params.username)
  const retweetedPosts = await getRetweetedPostsByUsername(params.username)
  const likedPosts = await getLikedPostsByUsername(params.username)

  return (
    <div className='text-white relative'>
      <header className='p-4 backdrop-blur-sm sticky inset-0 z-50'>
        <h3>Home</h3>
        <nav className='p-4'>
          <ul className='grid grid-cols-2 text-center'></ul>
        </nav>
      </header>
      <nav>
        <li></li>
      </nav>
      <section>
        <TabPosts
          posts={posts}
          likedPosts={likedPosts}
          retweetedPosts={retweetedPosts}
        />
      </section>
    </div>
  )
}
