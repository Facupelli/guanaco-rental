/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Coupon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coupon_name_key" ON "Coupon"("name");
