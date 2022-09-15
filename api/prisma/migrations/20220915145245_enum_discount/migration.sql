/*
  Warnings:

  - Changed the type of `minPrice` on the `FixedDiscount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `minDates` on the `FixedDiscount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `minUserOrders` on the `FixedDiscount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Discount" AS ENUM ('Int', 'null');

-- AlterTable
ALTER TABLE "FixedDiscount" DROP COLUMN "minPrice",
ADD COLUMN     "minPrice" "Discount" NOT NULL,
DROP COLUMN "minDates",
ADD COLUMN     "minDates" "Discount" NOT NULL,
DROP COLUMN "minUserOrders",
ADD COLUMN     "minUserOrders" "Discount" NOT NULL;
