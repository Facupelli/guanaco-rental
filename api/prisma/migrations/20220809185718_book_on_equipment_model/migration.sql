/*
  Warnings:

  - Added the required column `quantity` to the `BookOnEquipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookOnEquipment" ADD COLUMN     "quantity" INTEGER NOT NULL;
