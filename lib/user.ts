import prisma from "@/utils/prisma";

export async function getOrCreateUser(clerkUserId: string, email: string) {
  if (!clerkUserId) {
    throw new Error("clerkUserId is required");
  }

  // 1. Try to find the user in our database
  let user = await prisma.user.findUnique({
    where: { id: clerkUserId },
  });

  // 2. If the user doesn't exist, create a new record
  if (!user) {
    try {
      user = await prisma.user.create({
        data: {
          id: clerkUserId,
          email: email || `${clerkUserId}@usesmartflex.com`,
          isPro: false,
          credits: 10, // 10 free credits initially
        },
      });
      console.log(`[getOrCreateUser] Created new user: ${clerkUserId}`);
    } catch (error) {
      console.error("[getOrCreateUser] Error creating user:", error);
      // Fallback: search again in case of concurrent requests
      user = await prisma.user.findUnique({
        where: { id: clerkUserId },
      });
      if (!user) throw error;
    }
  }

  return user;
}
