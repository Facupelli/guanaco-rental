/*
  Warnings:

  - You are about to drop the column `date` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "date",
ADD COLUMN     "dates" TEXT[];
