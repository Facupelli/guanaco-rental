/*
  Warnings:

  - You are about to drop the `_BookToEquipment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookToEquipment" DROP CONSTRAINT "_BookToEquipment_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToEquipment" DROP CONSTRAINT "_BookToEquipment_B_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "orderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "dates" TEXT[];

-- DropTable
DROP TABLE "_BookToEquipment";

-- CreateTable
CREATE TABLE "BookOnOrder" (
    "equipmentId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookOnOrder_pkey" PRIMARY KEY ("equipmentId","bookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_orderId_key" ON "Book"("orderId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnOrder" ADD CONSTRAINT "BookOnOrder_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnOrder" ADD CONSTRAINT "BookOnOrder_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
