CREATE TABLE `user`(
    `userId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nickname` CHAR(255) NOT NULL,
    `email` CHAR(255) NOT NULL,
    `phone` CHAR(255) NOT NULL
);
ALTER TABLE
    `user` ADD PRIMARY KEY `user_userid_primary`(`userId`);
CREATE TABLE `matchRoom`(
    `matchroomId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `ottService` CHAR(255) NOT NULL,
    `ID` CHAR(255) NOT NULL,
    `password` CHAR(255) NOT NULL
);
ALTER TABLE
    `matchRoom` ADD PRIMARY KEY `matchroom_matchroomid_primary`(`matchroomId`);
CREATE TABLE `matchUser`(
    `matchuserId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `matchroomId` INT NOT NULL,
    `userId` INT NOT NULL,
    `isLeader` TINYINT(1) NOT NULL
);
ALTER TABLE
    `matchUser` ADD PRIMARY KEY `matchuser_matchuserid_primary`(`matchuserId`);
CREATE TABLE `bankAccount`(
    `bankAccountId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `bank` CHAR(255) NOT NULL,
    `account` CHAR(255) NOT NULL
);
ALTER TABLE
    `bankAccount` ADD PRIMARY KEY `bankaccount_bankaccountid_primary`(`bankAccountId`);
CREATE TABLE `bankCard`(
    `bankCardId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `bank` CHAR(255) NOT NULL,
    `card` CHAR(255) NOT NULL,
    `MM/YY` CHAR(255) NOT NULL,
    `birth` CHAR(255) NOT NULL,
    `password` CHAR(255) NOT NULL
);
ALTER TABLE
    `bankCard` ADD PRIMARY KEY `bankcard_bankcardid_primary`(`bankCardId`);
ALTER TABLE
    `bankAccount` ADD CONSTRAINT `bankaccount_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `user`(`userId`);
ALTER TABLE
    `matchUser` ADD CONSTRAINT `matchuser_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `user`(`userId`);
ALTER TABLE
    `bankCard` ADD CONSTRAINT `bankcard_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `user`(`userId`);