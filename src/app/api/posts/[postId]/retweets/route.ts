import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  createRetweet,
  deleteRetweeet,
  findRetweet,
} from '@/actions/retweet-actions'

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect('/login')
  }

  const { user } = session

  const postId = params.postId

  if (!postId) {
    return NextResponse.json({
      error: 'postId is required',
    })
  }

  console.log('prueba')

  await createRetweet(postId, user.id)

  return NextResponse.json({ message: 'Retweet added!' })
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect('/login')
  }

  const { user } = session

  const postId = params.postId

  if (!postId) {
    return NextResponse.json({
      error: 'postId is required',
    })
  }

  const retweet = await findRetweet(postId, user.id)

  if (!retweet) {
    return NextResponse.json({
      error: 'Retweet not found',
    })
  }

  await deleteRetweeet(retweet.id)

  return NextResponse.json({ message: 'Retweet deleted!' })
}
