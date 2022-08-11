-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "addressLocation" TEXT,
ADD COLUMN     "addressProvince" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "bussinessName" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "cuit" TEXT,
ADD COLUMN     "customerAproved" BOOLEAN,
ADD COLUMN     "customerAprovedAt" TIMESTAMP(3),
ADD COLUMN     "employee" BOOLEAN,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "student" BOOLEAN;
