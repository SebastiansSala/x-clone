import type { PostType, UserType } from '@/types/posts'

export const createPost = async (
  text: string,
  url?: string,
  userId?: string
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        url,
        userId,
      }),
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const fetchPost = async (postId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`
  )

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}

export const fetchPosts = async (
  postType: string,
  pageParam: number,
  userId?: string
): Promise<{ posts: PostType[]; nextId: string }> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?postType=${postType}&cursor=${pageParam}&userId=${userId}`
  )
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  const data = await res.json()

  return data
}

export const likePost = async ({
  postId,
  user,
}: {
  postId: string
  user: UserType
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/likes`,
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

export const unlikePost = async ({
  postId,
  user,
}: {
  postId: string
  user: UserType
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/likes`,
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

export const createRetweet = async ({
  postId,
  user,
}: {
  postId: string
  user: UserType
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/retweets`,
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

export const deleteRetweet = async ({
  postId,
  user,
}: {
  postId: string
  user: UserType
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/retweets`,
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
