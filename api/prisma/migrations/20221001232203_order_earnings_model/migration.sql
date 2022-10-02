-- CreateTable
CREATE TABLE "OrderEarnings" (
    "id" TEXT NOT NULL,
    "federico" INTEGER NOT NULL,
    "oscar" INTEGER NOT NULL,
    "sub" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderEarnings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderEarnings_orderId_key" ON "OrderEarnings"("orderId");

-- AddForeignKey
ALTER TABLE "OrderEarnings" ADD CONSTRAINT "OrderEarnings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
