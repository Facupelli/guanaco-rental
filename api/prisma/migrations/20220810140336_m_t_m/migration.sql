/*
  Warnings:

  - The `date` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `BookOnEquipment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookOnEquipment" DROP CONSTRAINT "BookOnEquipment_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookOnEquipment" DROP CONSTRAINT "BookOnEquipment_equipmentId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "date",
ADD COLUMN     "date" TEXT[];

-- DropTable
DROP TABLE "BookOnEquipment";

-- CreateTable
CREATE TABLE "_BookToEquipment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToEquipment_AB_unique" ON "_BookToEquipment"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToEquipment_B_index" ON "_BookToEquipment"("B");

-- AddForeignKey
ALTER TABLE "_BookToEquipment" ADD CONSTRAINT "_BookToEquipment_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToEquipment" ADD CONSTRAINT "_BookToEquipment_B_fkey" FOREIGN KEY ("B") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
