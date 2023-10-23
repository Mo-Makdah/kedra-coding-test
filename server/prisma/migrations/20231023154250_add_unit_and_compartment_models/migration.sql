-- CreateTable
CREATE TABLE "Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "macAddress" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    CONSTRAINT "Unit_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Compartment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "macAddress" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,
    CONSTRAINT "Compartment_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_macAddress_key" ON "Unit"("macAddress");
