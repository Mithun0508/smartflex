/*
  Warnings:

  - You are about to alter the column `duration` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `originalSize` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `compressedSize` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- DropIndex
DROP INDEX "Video_clerkUserId_idx";

-- DropIndex
DROP INDEX "Video_createdAt_idx";

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "duration" SET DATA TYPE INTEGER,
ALTER COLUMN "originalSize" SET DATA TYPE INTEGER,
ALTER COLUMN "compressedSize" SET DATA TYPE INTEGER;
