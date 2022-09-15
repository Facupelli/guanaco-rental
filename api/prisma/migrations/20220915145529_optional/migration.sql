/*
  Warnings:

  - The `minPrice` column on the `FixedDiscount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `minDates` column on the `FixedDiscount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `minUserOrders` column on the `FixedDiscount` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FixedDiscount" DROP COLUMN "minPrice",
ADD COLUMN     "minPrice" INTEGER,
DROP COLUMN "minDates",
ADD COLUMN     "minDates" INTEGER,
DROP COLUMN "minUserOrders",
ADD COLUMN     "minUserOrders" INTEGER;

-- DropEnum
DROP TYPE "Discount";
