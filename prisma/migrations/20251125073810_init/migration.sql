/*
  Warnings:

  - Added the required column `clerkUserId` to the `video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secureUrl` to the `video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "video" ADD COLUMN     "clerkUserId" TEXT NOT NULL,
ADD COLUMN     "secureUrl" TEXT NOT NULL;
