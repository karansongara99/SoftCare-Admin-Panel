-- CreateTable
CREATE TABLE `mst_diagnosis_type` (
    `DiagnosisTypeID` INTEGER NOT NULL AUTO_INCREMENT,
    `DiagnosisTypeName` VARCHAR(250) NOT NULL,
    `DiagnosisTypeShortName` VARCHAR(50) NULL,
    `IsActive` BIT(1) NOT NULL,
    `HospitalID` INTEGER NOT NULL,
    `Description` VARCHAR(250) NULL,
    `UserID` INTEGER NOT NULL,
    `Created` DATETIME(0) NOT NULL,
    `Modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`DiagnosisTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mst_doctor` (
    `DoctorID` INTEGER NOT NULL AUTO_INCREMENT,
    `DoctorName` VARCHAR(250) NOT NULL,
    `HospitalID` INTEGER NOT NULL,
    `Description` VARCHAR(250) NULL,
    `UserID` INTEGER NOT NULL,
    `Created` DATETIME(0) NOT NULL,
    `Modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`DoctorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mst_hospital` (
    `HospitalID` INTEGER NOT NULL AUTO_INCREMENT,
    `HospitalName` VARCHAR(250) NOT NULL,
    `DefaultPaymentModeID` INTEGER NULL,
    `RegistrationCharge` DECIMAL(10, 2) NULL,
    `RegistrationValidityMonths` INTEGER NULL,
    `OpeningDate` DATE NOT NULL,
    `OpeningPatientNo` INTEGER NOT NULL,
    `OpeningOPDNo` INTEGER NOT NULL,
    `OpeningReceiptNo` INTEGER NOT NULL,
    `Description` VARCHAR(250) NULL,
    `UserID` INTEGER NOT NULL,
    `Created` DATETIME(0) NOT NULL,
    `Modified` DATETIME(0) NOT NULL,
    `Address` VARCHAR(500) NULL,
    `IsRateEnableInReceipt` BIT(1) NULL,
    `IsRegistrationFeeEnableInOPD` BIT(1) NULL,

    PRIMARY KEY (`HospitalID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mst_opd` (
    `OPDID` INTEGER NOT NULL AUTO_INCREMENT,
    `OPDNo` VARCHAR(250) NULL,
    `OPDDateTime` DATETIME(0) NOT NULL,
    `PatientID` INTEGER NOT NULL,
    `IsFollowUpCase` BIT(1) NOT NULL,
    `TreatedByDoctorID` INTEGER NOT NULL,
    `RegistrationFee` DECIMAL(10, 2) NOT NULL,
    `Description` VARCHAR(250) NULL,
    `UserID` INTEGER NOT NULL,
    `Created` DATETIME(0) NOT NULL,
    `Modified` DATETIME(0) NOT NULL,
    `OLDOPDNo` VARCHAR(250) NULL,

    PRIMARY KEY (`OPDID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mst_opd_diagnosis_type` (
    `OPDDiagnosisTypeID` INTEGER NOT NULL AUTO_INCREMENT,
    `OPDID` INTEGER NOT NULL,
    `DiagnosisTypeID` INTEGER NOT NULL,
    `Description` VARCHAR(250) NULL,
    `UserID` INTEGER NOT NULL,
    `Created` DATETIME(0) NOT NULL,
    `Modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`OPDDiagnosisTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mst_patient` (
    `PatientID` INTEGER NOT NULL AUTO_INCREMENT,
    `PatientName` VARCHAR(250) NOT NULL,
    `PatientNo` INTEGER NOT NULL,
    `RegistrationDateTime` DATETIME(0) NOT NULL,
    `Age` INTEGER NULL,
    `BloodGroup` VARCHAR(20) NULL,
    `Gender` VARCHAR(10) NOT NULL,
    `Occupation` VARCHAR(100) NULL,
    `Address` VARCHAR(250) NULL,
    `HospitalID` INTEGER NOT NULL,
    `State` VARCHAR(50) NULL,
    `City` VARCHAR(50) NULL,
    `PinCode` VARCHAR(10) NULL,
    `MobileNo` VARCHAR(20) NOT NULL,
    `ReferredBy` VARCHAR(250) NULL,
    `Description` VARCHAR(250) NULL,
    `UserID` INTEGER NOT NULL,
    `Created` DATETIME(0) NOT NULL,
    `Modified` DATETIME(0) NOT NULL,
    `EmergencyContactNo` VARCHAR(20) NULL,

    PRIMARY KEY (`PatientID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mst_receipt` (
    `ReceiptID` INTEGER NOT NULL AUTO_INCREMENT,
    `ReceiptNo` VARCHAR(250) NULL,
    `ReceiptDate` DATETIME(0) NOT NULL,
    `OPDID` INTEGER NOT NULL,
    `AmountPaid` DECIMAL(10, 2) NOT NULL,
    `Description` VARCHAR(250) NULL,
    `UserID` INTEGER NOT NULL,
    `Created` DATETIME(0) NOT NULL,
    `Modified` DATETIME(0) NOT NULL,
    `PaymentModeID` INTEGER NOT NULL,
    `ReferenceNo` VARCHAR(250) NULL,
    `ReferenceDate` DATETIME(0) NULL,
    `cancellationDateTime` DATETIME(0) NULL,
    `CancellationByUserID` INTEGER NULL,
    `CancellationRemarks` VARCHAR(500) NULL,

    PRIMARY KEY (`ReceiptID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mst_sub_treatment_type` (
    `SubTreatmentTypeID` INTEGER NOT NULL AUTO_INCREMENT,
    `SubTreatmentTypeName` VARCHAR(250) NOT NULL,
    `TreatmentTypeID` INTEGER NOT NULL,
    `Rate` DECIMAL(10, 2) NOT NULL,
    `IsActive` BIT(1) NOT NULL,
    `Description` VARCHAR(250) NULL,
    `UserID` INTEGER NOT NULL,
    `Created` DATETIME(0) NOT NULL,
    `Modified` DATETIME(0) NOT NULL,
    `AccountID` INTEGER NULL,

    PRIMARY KEY (`SubTreatmentTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mst_treatment_type` (
    `TreatmentTypeID` INTEGER NOT NULL AUTO_INCREMENT,
    `TreatmentTypeName` VARCHAR(250) NOT NULL,
    `TreatmentTypeShortName` VARCHAR(50) NULL,
    `HospitalID` INTEGER NOT NULL,
    `Description` VARCHAR(250) NULL,
    `UserID` INTEGER NOT NULL,
    `Created` DATETIME(0) NOT NULL,
    `Modified` DATETIME(0) NOT NULL,

    PRIMARY KEY (`TreatmentTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mst_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `password` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
