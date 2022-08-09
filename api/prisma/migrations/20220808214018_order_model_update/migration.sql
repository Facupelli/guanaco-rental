-- CreateTable
CREATE TABLE "_EquipmentToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToOrder_AB_unique" ON "_EquipmentToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToOrder_B_index" ON "_EquipmentToOrder"("B");

-- AddForeignKey
ALTER TABLE "_EquipmentToOrder" ADD CONSTRAINT "_EquipmentToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToOrder" ADD CONSTRAINT "_EquipmentToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
