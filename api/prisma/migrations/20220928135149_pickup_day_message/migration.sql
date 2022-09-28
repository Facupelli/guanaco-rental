-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "pickupDay" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "message" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "thumbPic" TEXT;
