/*
  Warnings:

  - You are about to drop the column `bookings` on the `Equipment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "bookings";

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

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
