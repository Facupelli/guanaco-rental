/*
  Warnings:

  - You are about to drop the column `quantity` on the `Equipment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "quantity",
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 1;
