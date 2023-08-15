import { ImageIcon } from "../Icons/PostActionsIcons"
import ImageUploading from "react-images-uploading"
import { Button } from "@nextui-org/button"
import { MAX_NUMBER_OF_IMAGES_ON_POSTS } from "@/const/posts"
import { PostImage } from "@/types/posts"

type PostModalFooterProps = {
  images: PostImage[]
  handleImageUpload: (imagesList: PostImage[], addUpdatedIndex: number) => void
  handleSubmit: () => void
}

const PostModalFooter = ({
  images,
  handleImageUpload,
  handleSubmit,
}: PostModalFooterProps) => {
  return (
    <div className='flex justify-between w-full border-t-1 border-[#2f3336] pt-4'>
      <div className='flex flex-1 gap-2 items-center'>
        <ImageUploading
          multiple
          onChange={handleImageUpload}
          value={images}
          acceptType={["jpg", "png", "webp", "jpeg"]}
          maxNumber={MAX_NUMBER_OF_IMAGES_ON_POSTS}
        >
          {({ onImageUpload }) => (
            <ImageIcon
              className='text-blue-500 h-6 cursor-pointer'
              onClick={onImageUpload}
            />
          )}
        </ImageUploading>
      </div>
      <div>
        <Button color='primary' onPress={handleSubmit}>
          Post
        </Button>
      </div>
    </div>
  )
}

export default PostModalFooter
