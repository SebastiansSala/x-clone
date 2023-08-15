const PostModalTrigger = ({ onOpen }: { onOpen: () => void }) => (
  <button
    className='bg-[#1d9bf0] hover:bg-blue-500/95 w-full text-white text-center py-4 rounded-full'
    onClick={onOpen}
  >
    Post
  </button>
)

export default PostModalTrigger
