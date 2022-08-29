/*
  Warnings:

  - You are about to drop the column `customerAproved` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `customerAprovedAt` on the `users` table. All the data in the column will be lost.
  - The `petitionSent` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Petition" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "customerAproved",
DROP COLUMN "customerAprovedAt",
ADD COLUMN     "customerApproved" BOOLEAN,
ADD COLUMN     "customerApprovedAt" TIMESTAMP(3),
ADD COLUMN     "role" "Role",
DROP COLUMN "petitionSent",
ADD COLUMN     "petitionSent" "Petition";
