/*
  Warnings:

  - Added the required column `couponId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "couponId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "maxOrders" INTEGER,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
