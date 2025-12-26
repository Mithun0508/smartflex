/*
  Warnings:

  - Added the required column `format` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "publicId" TEXT NOT NULL;
