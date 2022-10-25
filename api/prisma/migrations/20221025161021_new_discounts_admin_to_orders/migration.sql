-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "adminDiscount" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "adminDiscountValue" INTEGER;
