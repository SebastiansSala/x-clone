import type { UserType } from "@/types/posts"

export const createUser = async (
  id: string,
  user_name: string,
  name: string,
  avatar_url: string
) => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export const followUser = async (authorId: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/users/${authorId}/follow`,
      {
        method: "POST",
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

export const unfollowUser = async (authorId: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/users/${authorId}/follow`,
      {
        method: "DELETE",
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

export const fetchUserFollowData = async (userId: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${userId}/follow`)
    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return res.json()
  } catch (e) {
    console.error(e)
  }
}
