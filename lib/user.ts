import prisma from "@/utils/prisma";

export async function getOrCreateUser(clerkUserId: string, email: string) {
  if (!clerkUserId) {
    throw new Error("clerkUserId is required");
  }

  // 1. Try to find by Clerk User ID (primary key)
  let user = await prisma.user.findUnique({
    where: { id: clerkUserId },
  });
  if (user) return user;

  // 2. Try to find by email (handles local vs production Clerk ID mismatch)
  const existingByEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingByEmail) {
    // Update the record to use the new Clerk User ID
    console.log(`[getOrCreateUser] Migrating user email ${email} to new Clerk ID: ${clerkUserId}`);
    user = await prisma.user.update({
      where: { email },
      data: { id: clerkUserId },
    });
    return user;
  }

  // 3. Create brand new user
  try {
    user = await prisma.user.create({
      data: {
        id: clerkUserId,
        email: email || `${clerkUserId}@usesmartflex.com`,
        isPro: false,
        credits: 10,
      },
    });
    console.log(`[getOrCreateUser] Created new user: ${clerkUserId}`);
    return user;
  } catch (error: any) {
    // Race condition fallback
    if (error.code === "P2002") {
      user = await prisma.user.findUnique({ where: { id: clerkUserId } });
      if (user) return user;
      user = await prisma.user.findUnique({ where: { email } });
      if (user) return user;
    }
    console.error("[getOrCreateUser] Error creating user:", error);
    throw error;
  }
}
