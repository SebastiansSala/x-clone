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
