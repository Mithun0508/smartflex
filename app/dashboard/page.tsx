import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "@/lib/user";
import prisma from "@/utils/prisma";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // 🔒 Fetch Clerk auth details
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress || `${userId}@usesmartflex.com`;

  // Lazily sync the user to Neon DB
  const user = await getOrCreateUser(userId, email);

  // Fetch real-time statistics from Neon DB
  const videosCount = await prisma.video.count({
    where: { clerkUserId: userId },
  });

  const imagesCount = await prisma.image.count({
    where: { clerkUserId: userId },
  });

  return (
    <DashboardClient
      isPro={user.isPro}
      credits={user.credits}
      videosCount={videosCount}
      imagesCount={imagesCount}
    />
  );
}
