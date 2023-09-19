import type { UserFollowDataType, UserType } from '@/types/posts'

export const createUser = async (
  id: string,
  user_name: string,
  name: string,
  avatar_url: string
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        user_name,
        avatar_url,
      }),
    })
    if (!res.ok) {
      throw new Error(res.statusText)
    }
  } catch (e) {
    console.error(e)
  }
}

export const followUser = async (
  userId: string,
  authorId: string
): Promise<UserType | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/follow`,
      {
        method: 'POST',
        body: JSON.stringify({
          authorId,
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

export const unfollowUser = async (userId: string, authorId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/follow`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          authorId,
        }),
      }
    )
    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
    return false
  }
}

export const fetchUserFollowData = async (
  userId: string
): Promise<UserFollowDataType | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/follow`
    )
    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const fetchUsers = async (
  pageParam: number,
  fetchType: string,
  username: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${pageParam}&fetchType=${fetchType}&username=${username}`
    )
    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const fetchBlockedUsers = async (
  pageParam: number,
  fetchType: string,
  username: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${pageParam}&fetchType=${fetchType}&username=${username}`
    )
    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const blockUser = async ({
  user,
  blockedUserId,
}: {
  user: UserType
  blockedUserId: string
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/block`,
    {
      method: 'PUT',
      body: JSON.stringify({
        blockedUserId,
      }),
    }
  )

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res.json()
}
