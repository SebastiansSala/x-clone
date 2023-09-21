import { NextResponse } from 'next/server'

import { deleteFollow, addFollow } from '@/actions/users-update-actions'
import { getUserFollowData } from '@/actions/users-get-actions'

export const dynamic = 'force-dynamic'

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId

    if (!userId) return NextResponse.json('No session')

    const userData = await getUserFollowData(userId)

    return NextResponse.json(userData)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false })
  }
}

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId

  if (!userId) return NextResponse.json('Missing userId, not logged in')

  const res = await req.json()

  const { authorId } = res

  const followedUser = await addFollow(authorId, userId)

  return NextResponse.json(followedUser)
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId

    if (!userId) return NextResponse.json('No session')

    const res = await req.json()

    const { authorId } = res

    if (!authorId) return NextResponse.json('Missing authorId')

    await deleteFollow(authorId, userId)

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ success: false })
  }
}
