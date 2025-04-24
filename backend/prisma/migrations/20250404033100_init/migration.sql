-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "informId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "photoUrl" TEXT,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inform" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "oa_id" TEXT NOT NULL,
    "org_name" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "Inform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" TEXT NOT NULL,
    "uuid_qr" TEXT NOT NULL,
    "org_name" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_informId_fkey" FOREIGN KEY ("informId") REFERENCES "Inform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_id_fkey" FOREIGN KEY ("id") REFERENCES "Inform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
