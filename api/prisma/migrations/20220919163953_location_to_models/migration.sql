/*
  Warnings:

  - The `location` column on the `Equipment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `location` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Location" AS ENUM ('SAN_JUAN', 'MENDOZA');

-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "location" "Location" NOT NULL DEFAULT 'SAN_JUAN';

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "location",
ADD COLUMN     "location" "Location" NOT NULL DEFAULT 'SAN_JUAN';

-- AlterTable
ALTER TABLE "FixedDiscount" ADD COLUMN     "location" "Location" NOT NULL DEFAULT 'SAN_JUAN';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "location",
ADD COLUMN     "location" "Location" NOT NULL DEFAULT 'SAN_JUAN';
