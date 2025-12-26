/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `video` table. All the data in the column will be lost.
  - The `originalSize` column on the `video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `compressedSize` column on the `video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `duration` column on the `video` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "video" DROP COLUMN "updatedAt",
ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "originalSize",
ADD COLUMN     "originalSize" INTEGER,
DROP COLUMN "compressedSize",
ADD COLUMN     "compressedSize" INTEGER,
DROP COLUMN "duration",
ADD COLUMN     "duration" DOUBLE PRECISION;
