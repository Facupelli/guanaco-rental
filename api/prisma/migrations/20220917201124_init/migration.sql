-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'EMPLOYEE', 'ADMIN');

-- CreateEnum
CREATE TYPE "Petition" AS ENUM ('false', 'PENDING', 'APPROVED', 'DENIED');

-- CreateEnum
CREATE TYPE "Owner" AS ENUM ('FEDERICO', 'OSCAR', 'BOTH', 'SUB');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "fullName" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "dniNumber" TEXT,
    "dni" JSONB,
    "birthDate" TIMESTAMP(3),
    "address" TEXT,
    "addressLocation" TEXT,
    "addressProvince" TEXT,
    "occupation" TEXT,
    "student" BOOLEAN,
    "employee" BOOLEAN,
    "company" TEXT,
    "cuit" TEXT,
    "bussinessName" TEXT,
    "contacts" JSONB,
    "bank" TEXT,
    "alias" TEXT,
    "cbu" TEXT,
    "petitionSent" "Petition" NOT NULL DEFAULT 'false',
    "customerApproved" BOOLEAN,
    "customerApprovedAt" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'lalala',
    "stock" INTEGER NOT NULL DEFAULT 1,
    "price" INTEGER NOT NULL,
    "accessories" TEXT[],
    "categoryId" TEXT NOT NULL,
    "owner" "Owner" NOT NULL DEFAULT 'FEDERICO',
    "location" TEXT NOT NULL DEFAULT 'San Juan',
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "number" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "bookingId" TEXT NOT NULL,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "couponId" TEXT,
    "fixedDiscountId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "dates" TEXT[],
    "pickupHour" TEXT NOT NULL DEFAULT '09:00',

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookOnEquipment" (
    "equipmentId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookOnEquipment_pkey" PRIMARY KEY ("equipmentId","bookId")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "maxOrders" INTEGER,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedDiscount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "minPrice" INTEGER,
    "minDates" INTEGER,
    "minUserOrders" INTEGER,
    "discount" INTEGER NOT NULL,

    CONSTRAINT "FixedDiscount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EquipmentToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Order_bookingId_key" ON "Order"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_name_key" ON "Coupon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToOrder_AB_unique" ON "_EquipmentToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToOrder_B_index" ON "_EquipmentToOrder"("B");

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fixedDiscountId_fkey" FOREIGN KEY ("fixedDiscountId") REFERENCES "FixedDiscount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnEquipment" ADD CONSTRAINT "BookOnEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookOnEquipment" ADD CONSTRAINT "BookOnEquipment_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToOrder" ADD CONSTRAINT "_EquipmentToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToOrder" ADD CONSTRAINT "_EquipmentToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
