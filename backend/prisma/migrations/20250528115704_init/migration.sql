-- CreateTable
CREATE TABLE `Product` (
    `Product_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Product_Type` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Stock` INTEGER NOT NULL,
    `Price` INTEGER NOT NULL,
    `Discount` INTEGER NOT NULL,
    `Final_Price` INTEGER NOT NULL,
    `Image` VARCHAR(191) NOT NULL,
    `Video` VARCHAR(191) NOT NULL,
    `Certificate_Image` VARCHAR(191) NOT NULL,
    `Shape` VARCHAR(191) NOT NULL,
    `Carat` VARCHAR(191) NOT NULL,
    `Cut` VARCHAR(191) NOT NULL,
    `Polish` VARCHAR(191) NOT NULL,
    `Symmetry` VARCHAR(191) NOT NULL,
    `Girdle_Min` VARCHAR(191) NOT NULL,
    `Girdle_Max` VARCHAR(191) NOT NULL,
    `Girdle_Condition` VARCHAR(191) NOT NULL,
    `Pavilion_Depth` VARCHAR(191) NOT NULL,
    `Pavilion_Angle` VARCHAR(191) NOT NULL,
    `Hearts_Arrows` VARCHAR(191) NOT NULL,
    `Eye_Clean` VARCHAR(191) NOT NULL,
    `Type` VARCHAR(191) NOT NULL,
    `Depth_Percent` VARCHAR(191) NOT NULL,
    `Table_Percent` VARCHAR(191) NOT NULL,
    `Ratio` VARCHAR(191) NOT NULL,
    `Meas_Length` VARCHAR(191) NOT NULL,
    `Meas_Width` VARCHAR(191) NOT NULL,
    `Meas_Depth` VARCHAR(191) NOT NULL,
    `Pair` VARCHAR(191) NOT NULL,
    `Culet_Carat` VARCHAR(191) NOT NULL,
    `Culet_Condition` VARCHAR(191) NOT NULL,
    `Crown_Height` VARCHAR(191) NOT NULL,
    `Crown_Angle` VARCHAR(191) NOT NULL,
    `BGM` VARCHAR(191) NOT NULL,
    `Color` VARCHAR(191) NOT NULL,
    `Fancy_Color_Dominant_Color` VARCHAR(191) NOT NULL,
    `Fancy_Color_Overtone` VARCHAR(191) NOT NULL,
    `Clarity` VARCHAR(191) NOT NULL,
    `Fancy_Color_Secondary_Color` VARCHAR(191) NOT NULL,
    `Fancy_Color_Intensity` VARCHAR(191) NOT NULL,
    `Fluor_Color` VARCHAR(191) NOT NULL,
    `Fluor_Intensity` VARCHAR(191) NOT NULL,
    `Lab` VARCHAR(191) NOT NULL,
    `Certification` VARCHAR(191) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`Product_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `User_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `First_Name` VARCHAR(191) NOT NULL,
    `Last_Name` VARCHAR(191) NOT NULL,
    `Company_Name` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `MobileNo` VARCHAR(191) NOT NULL,
    `MobileCode` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `City` VARCHAR(191) NOT NULL,
    `State` VARCHAR(191) NOT NULL,
    `Country` VARCHAR(191) NOT NULL,
    `Pincode` VARCHAR(191) NOT NULL,
    `Gstin` VARCHAR(191) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_Email_key`(`Email`),
    UNIQUE INDEX `User_MobileNo_key`(`MobileNo`),
    PRIMARY KEY (`User_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `Order_Id` INTEGER NOT NULL AUTO_INCREMENT,
    `User_Id` INTEGER NOT NULL,
    `Product_Id` INTEGER NOT NULL,
    `Payment_Type` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Order_Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Otp` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,
    `Otp` VARCHAR(191) NOT NULL,
    `OtpExpires` DATETIME(3) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Otp_Email_key`(`Email`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_User_Id_fkey` FOREIGN KEY (`User_Id`) REFERENCES `User`(`User_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_Product_Id_fkey` FOREIGN KEY (`Product_Id`) REFERENCES `Product`(`Product_Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
