/*
  Warnings:

  - You are about to drop the column `orderId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `BookOnOrder` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_orderId_fkey";

-- DropForeignKey
ALTER TABLE "BookOnOrder" DROP CONSTRAINT "BookOnOrder_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookOnOrder" DROP CONSTRAINT "BookOnOrder_equipmentId_fkey";

-- DropIndex
DROP INDEX "Book_orderId_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "orderId",
DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "bookingId" TEXT NOT NULL;

-- DropTable
DROP TABLE "BookOnOrder";

-- CreateTable
CREATE TABLE "BookOnEquipment" (
    "equipmentId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookOnEquipment_pkey" PRIMARY KEY ("equipmentId","bookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_bookingId_key" ON "Order"("bookingId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnEquipment" ADD CONSTRAINT "BookOnEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnEquipment" ADD CONSTRAINT "BookOnEquipment_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
