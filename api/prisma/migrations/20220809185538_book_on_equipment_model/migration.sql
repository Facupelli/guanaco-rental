/*
  Warnings:

  - You are about to drop the `_BookToEquipment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToEquipment" DROP CONSTRAINT "_BookToEquipment_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToEquipment" DROP CONSTRAINT "_BookToEquipment_B_fkey";

-- DropTable
DROP TABLE "_BookToEquipment";

-- CreateTable
CREATE TABLE "BookOnEquipment" (
    "bookId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookOnEquipment_pkey" PRIMARY KEY ("bookId","equipmentId")
);

-- AddForeignKey
ALTER TABLE "BookOnEquipment" ADD CONSTRAINT "BookOnEquipment_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnEquipment" ADD CONSTRAINT "BookOnEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
