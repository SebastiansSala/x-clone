import { UserType } from '@/types/posts'

export const fetchComments = async (postId: string, pageParam: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/comments?cursor=${pageParam}`
    )

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const createComment = async ({
  postId,
  user,
  text,
}: {
  postId: string
  user: UserType
  text: string
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/comments`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
          text,
        }),
      }
    )

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const likeComment = async ({
  postId,
  user,
}: {
  postId: string
  user: UserType
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postId}/likes`,
      {
        method: 'PUT',
        body: JSON.stringify({
          userId: user.id,
        }),
      }
    )

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const unlikeComment = async ({
  postId,
  user,
}: {
  postId: string
  user: UserType
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postId}/likes`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          userId: user.id,
        }),
      }
    )

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const createCommentRetweet = async ({
  postId,
  user,
}: {
  postId: string
  user: UserType
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postId}/retweets`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId: user.id,
        }),
      }
    )

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const deleteCommentRetweet = async ({
  postId,
  user,
}: {
  postId: string
  user: UserType
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postId}/retweets`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          userId: user.id,
        }),
      }
    )

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}
