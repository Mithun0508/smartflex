/*
  Warnings:

  - You are about to drop the column `totalWatchTime` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "totalWatchTime",
DROP COLUMN "views",
ADD COLUMN     "compressedUrl" TEXT;

-- CreateIndex
CREATE INDEX "Video_clerkUserId_idx" ON "Video"("clerkUserId");

-- CreateIndex
CREATE INDEX "Video_createdAt_idx" ON "Video"("createdAt");
