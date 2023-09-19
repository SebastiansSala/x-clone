import { Spinner } from '@nextui-org/spinner'
import { useSelector } from 'react-redux'

import PostCard from './post/post-card'

import useCommentsActions from '@/hooks/use-comments-actions'
import useFollow from '@/hooks/use-follow'
import useInfiniteComments from '@/hooks/use-infinite-comments'

import type { RootState } from '@/app/store'

export default function CommentList({ postId }: { postId: string }) {
  const { comments, isLoading, isFetchingNextPage, error, ref, isError } =
    useInfiniteComments(postId)

  const {
    addLikeMutation,
    deleteLikeMutation,
    deleteRetweetMutation,
    addRetweetMutation,
    blockMutation,
  } = useCommentsActions()

  const userData = useSelector((state: RootState) => state.auth.userData)

  const { toggleFollow, getIsFollowing } = useFollow()

  if (isLoading)
    return (
      <div className="h-full w-full grid place-content-center">
        <Spinner color="default" size="lg" className="text-center mx-auto" />
      </div>
    )
  if (isError) return <div>Error! {JSON.stringify(error)}</div>

  return (
    <ul>
      {comments?.map((comment) => {
        const isFollowing = getIsFollowing(comment.authorId)

        const isRetweeted =
          userData && comment.retweets
            ? comment.retweets?.some(
                (retweet) => retweet.authorId === userData.id
              )
            : false

        const isLiked =
          userData && comment.likes
            ? comment.likes.some((like) => like.id === userData.id)
            : false

        return (
          <article
            key={comment.id}
            className="border-y-1 border-[#71767b] px-2"
          >
            <PostCard
              key={comment.id}
              post={comment}
              toggleFollow={toggleFollow}
              isFollowing={isFollowing}
              isRetweeted={isRetweeted}
              isLiked={isLiked}
              addLikeMutation={addLikeMutation}
              deleteLikeMutation={deleteLikeMutation}
              addRetweetMutation={addRetweetMutation}
              deleteRetweetMutation={deleteRetweetMutation}
              blockMutation={blockMutation}
            />
            {comment.comments &&
              comment.comments.map((childComment) => {
                const isFollowing = getIsFollowing(comment.authorId)

                const isRetweeted =
                  userData && childComment.retweets
                    ? childComment.retweets?.some(
                        (retweet) => retweet.authorId === userData.id
                      )
                    : false

                const isLiked =
                  userData && childComment.likes
                    ? childComment.likes.some((like) => like.id === userData.id)
                    : false

                return (
                  <PostCard
                    key={childComment.id}
                    post={childComment}
                    toggleFollow={toggleFollow}
                    isFollowing={isFollowing}
                    isRetweeted={isRetweeted}
                    isLiked={isLiked}
                    addLikeMutation={addLikeMutation}
                    deleteLikeMutation={deleteLikeMutation}
                    addRetweetMutation={addRetweetMutation}
                    deleteRetweetMutation={deleteRetweetMutation}
                    blockMutation={blockMutation}
                  />
                )
              })}
          </article>
        )
      })}
      {isFetchingNextPage ? (
        <div className="py-14 grid place-content-center">
          <Spinner color="default" size="lg" />
        </div>
      ) : null}
      <span ref={ref} style={{ visibility: 'hidden' }} />
    </ul>
  )
}
