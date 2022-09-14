-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "fixedDiscountId" TEXT;

-- CreateTable
CREATE TABLE "FixedDiscount" (
    "id" TEXT NOT NULL,
    "minPrice" INTEGER NOT NULL,
    "minDates" INTEGER NOT NULL,
    "minUserOrders" INTEGER NOT NULL,

    CONSTRAINT "FixedDiscount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fixedDiscountId_fkey" FOREIGN KEY ("fixedDiscountId") REFERENCES "FixedDiscount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
