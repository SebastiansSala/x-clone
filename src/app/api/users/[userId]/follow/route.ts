import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import {
  deleteFollow,
  addFollow,
  deleteFollower,
  addFollower,
} from "@/actions/users-update-actions";
import { getUserFollowData } from "@/actions/users-get-actions";

export async function GET() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return NextResponse.json("No session");

  const userId = session.user.id;
  const userData = await getUserFollowData(userId);

  return NextResponse.json(userData);
}

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  if (!userId) return NextResponse.json("Missing userId");

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return NextResponse.json("No session");

  const sessionUserId = session.user.id;

  try {
    await addFollow(userId, sessionUserId);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }

  try {
    await addFollower(userId, sessionUserId);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  if (!userId) return NextResponse.json("Missing userId");

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return NextResponse.json("No session");

  const sessionUserId = session.user.id;

  try {
    await deleteFollow(userId, sessionUserId);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }

  try {
    await deleteFollower(userId, sessionUserId);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }

  return NextResponse.json({ success: true });
}
