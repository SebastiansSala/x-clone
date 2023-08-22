import PostSection from "@/components/post-section"

type ProfilePageProps = {
  params: {
    username: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  return (
    <main className='text-white relative'>
      <PostSection username={params.username} />
    </main>
  )
}
