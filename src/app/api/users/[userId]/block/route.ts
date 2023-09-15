import { NextResponse } from "next/server";

import { getIsBlockedUser } from "@/actions/users-get-actions";
import { blockUser, unblockUser } from "@/actions/users-update-actions";

import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  const { blockedUserId } = JSON.parse(await req.json());

  const res = {
    userId,
    blockedUserId,
  };

  return NextResponse.json(res);
}

export async function PUT(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  if (!userId) return NextResponse.json("Missing userId", { status: 400 });

  const { blockedUserId } = await req.json();

  console.log("blockedUserId", blockedUserId);

  if (!blockedUserId)
    return NextResponse.json("Missing blockedUserId", { status: 400 });

  const isBlocked = await getIsBlockedUser(userId, blockedUserId);

  if (isBlocked) {
    await unblockUser(userId, blockedUserId);
  } else {
    await blockUser(userId, blockedUserId);
  }

  return NextResponse.json({
    message: "User blocked succesfully",
    status: 200,
  });
}
