import prisma from "@/utils/prisma";

export const getUsers = async () => {
  try {
    return await prisma.users.findMany({
      take: 5,
    });
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getAllUsers = async (
  skip: number,
  take: number,

  cursorObj?: { id: string }
) => {
  return await prisma.users.findMany({
    skip,
    take,
    cursor: cursorObj ? { id: cursorObj.id } : undefined,
  });
};

export const getAllUsers_sessionRequest = async (
  skip: number,
  take: number,
  userId: string,
  cursorObj?: { id: string }
) => {
  return await prisma.users.findMany({
    where: {
      NOT: {
        id: userId,
      },
      OR: [
        {
          followers: {
            none: {
              id: userId,
            },
          },
        },
        {
          following: {
            some: {
              id: userId,
            },
          },
        },
      ],
    },
    skip,
    take,
    cursor: cursorObj ? { id: cursorObj.id } : undefined,
  });
};

export const getFollowing = async (
  skip: number,
  take: number,
  userId: string,
  cursorObj?: { id: string }
) => {
  return await prisma.users.findMany({
    where: {
      NOT: {
        id: userId,
      },
      AND: [
        {
          followers: {
            some: {
              id: userId,
            },
          },
        },
      ],
    },
    skip,
    take,
    cursor: cursorObj ? { id: cursorObj.id } : undefined,
  });
};

export const getFollowers = async (
  skip: number,
  take: number,
  userId: string,
  cursorObj?: { id: string }
) => {
  return await prisma.users.findMany({
    where: {
      NOT: {
        id: userId,
      },
      AND: [
        {
          following: {
            some: {
              id: userId,
            },
          },
        },
      ],
    },
    skip,
    take,
    cursor: cursorObj ? { id: cursorObj.id } : undefined,
  });
};

export const getUsersNotFollowing = async (currentUserId: string) => {
  try {
    return await prisma.users.findMany({
      where: {
        NOT: {
          followers: {
            some: {
              id: currentUserId,
            },
          },
        },
      },
      take: 5,
    });
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getUserFollowData = async (currentUserId: string) => {
  return await prisma.users.findUnique({
    where: {
      id: currentUserId,
    },
    include: {
      followers: true,
      following: true,
    },
  });
};
