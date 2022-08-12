/*
  Warnings:

  - The `dni` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "alias" TEXT,
ADD COLUMN     "bank" TEXT,
ADD COLUMN     "cbu" TEXT,
DROP COLUMN "dni",
ADD COLUMN     "dni" JSONB;
