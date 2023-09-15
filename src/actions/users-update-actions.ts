import prisma from "@/utils/prisma";

export const deleteFollow = async (authorId: string, userId: string) => {
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      following: {
        disconnect: {
          id: authorId,
        },
      },
    },
  });
};

export const deleteFollower = async (authorId: string, userId: string) => {
  return await prisma.users.update({
    where: {
      id: authorId,
    },
    data: {
      followers: {
        disconnect: {
          id: userId,
        },
      },
    },
  });
};

export const addFollow = async (authorId: string, userId: string) => {
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      following: {
        connect: {
          id: authorId,
        },
      },
    },
  });
};

export const addFollower = async (authorId: string, userId: string) => {
  return await prisma.users.update({
    where: {
      id: authorId,
    },
    data: {
      followers: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const deleteBlockedUser = async (authorId: string, userId: string) => {
  return await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      following: {
        disconnect: {
          id: authorId,
        },
      },
    },
  });
};

export const blockUser = async (authorId: string, userId: string) => {
  try {
    return await prisma.$transaction(async (tx) => {
      await tx.users.update({
        where: {
          id: authorId,
        },
        data: {
          blockedUsers: {
            connect: {
              id: userId,
            },
          },
        },
      });

      await tx.users.update({
        where: {
          id: userId,
        },
        data: {
          blockedBy: {
            connect: {
              id: authorId,
            },
          },
        },
      });
    });
  } catch (e) {
    console.error(e);
  }
};

export const unblockUser = async (authorId: string, userId: string) => {
  try {
    return await prisma.$transaction(async (tx) => {
      await tx.users.update({
        where: {
          id: authorId,
        },
        data: {
          blockedUsers: {
            disconnect: {
              id: userId,
            },
          },
        },
      });

      await tx.users.update({
        where: {
          id: userId,
        },
        data: {
          blockedBy: {
            disconnect: {
              id: authorId,
            },
          },
        },
      });
    });
  } catch (e) {
    console.error(e);
  }
};
