-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patient` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
    `contactNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `governmentIdType` ENUM('Passport', 'DriverLicense', 'SSS', 'PhilHealth', 'Other') NULL,
    `governmentIdNumber` VARCHAR(191) NULL,
    `governmentIdFile` VARCHAR(191) NULL,

    UNIQUE INDEX `Patient_email_key`(`email`),
    UNIQUE INDEX `Patient_governmentIdNumber_key`(`governmentIdNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hospital` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `contactNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `bankAccountDetails` JSON NULL,

    UNIQUE INDEX `Hospital_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InsuranceCompany` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `contactNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,

    UNIQUE INDEX `InsuranceCompany_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Claim` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `claimAmount` DECIMAL(65, 30) NOT NULL,
    `approvedAmount` DECIMAL(65, 30) NULL,
    `approvedDate` DATETIME(3) NULL,
    `processedBy` VARCHAR(191) NULL,
    `status` ENUM('Pending', 'Approved', 'Rejected', 'Paid') NOT NULL DEFAULT 'Pending',
    `policyNumber` VARCHAR(191) NULL,
    `reasonForRejection` VARCHAR(191) NULL,
    `attachments` JSON NULL,
    `medicalAbstractFile` VARCHAR(191) NULL,
    `finalDiagnosisFile` VARCHAR(191) NULL,
    `testResultsFile` VARCHAR(191) NULL,
    `memberName` VARCHAR(191) NULL,
    `relationship` VARCHAR(191) NULL,
    `hmoProvider` VARCHAR(191) NULL,
    `otherHmoProvider` VARCHAR(191) NULL,
    `loaFile` VARCHAR(191) NULL,
    `soaFile` VARCHAR(191) NULL,
    `hospitalId` VARCHAR(191) NULL,
    `patientId` VARCHAR(191) NULL,
    `insuranceCompanyId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HospitalPatient` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `admissionDateTime` DATETIME(3) NULL,
    `dischargeDateTime` DATETIME(3) NULL,
    `patientType` VARCHAR(191) NULL,
    `hospitalId` VARCHAR(191) NULL,
    `patientId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `amountPaid` DECIMAL(65, 30) NOT NULL,
    `paymentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `claimId` VARCHAR(191) NULL,
    `hospitalId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reimbursement` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `amountReceived` DECIMAL(65, 30) NOT NULL,
    `receivedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `claimId` VARCHAR(191) NULL,
    `insuranceCompanyId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Claim` ADD CONSTRAINT `Claim_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claim` ADD CONSTRAINT `Claim_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Claim` ADD CONSTRAINT `Claim_insuranceCompanyId_fkey` FOREIGN KEY (`insuranceCompanyId`) REFERENCES `InsuranceCompany`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HospitalPatient` ADD CONSTRAINT `HospitalPatient_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HospitalPatient` ADD CONSTRAINT `HospitalPatient_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_claimId_fkey` FOREIGN KEY (`claimId`) REFERENCES `Claim`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reimbursement` ADD CONSTRAINT `Reimbursement_claimId_fkey` FOREIGN KEY (`claimId`) REFERENCES `Claim`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reimbursement` ADD CONSTRAINT `Reimbursement_insuranceCompanyId_fkey` FOREIGN KEY (`insuranceCompanyId`) REFERENCES `InsuranceCompany`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
