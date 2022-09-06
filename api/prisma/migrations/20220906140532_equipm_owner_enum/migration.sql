/*
  Warnings:

  - The `owner` column on the `Equipment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Owner" AS ENUM ('FEDERICO', 'OSCAR', 'BOTH');

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "owner",
ADD COLUMN     "owner" "Owner" NOT NULL DEFAULT 'FEDERICO';
