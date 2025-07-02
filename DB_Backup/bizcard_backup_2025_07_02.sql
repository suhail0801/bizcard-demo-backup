-- Backup of bizcard database as of 2025-07-02
-- Only structure and data for activities, cardtemplates, contacts, savedcards, usercards, users

-- Table structure for table `activities`
DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

-- Table structure for table `cardtemplates`
DROP TABLE IF EXISTS `cardtemplates`;
CREATE TABLE `cardtemplates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `htmlPreview` text DEFAULT NULL,
  `htmlData` json DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

-- Table structure for table `contacts`
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `contactUserId` int DEFAULT NULL,
  `contactName` varchar(255) DEFAULT NULL,
  `contactEmail` varchar(255) DEFAULT NULL,
  `contactPhone` varchar(255) DEFAULT NULL,
  `contactCardId` int DEFAULT NULL,
  `addedAt` datetime DEFAULT NULL,
  `sharedBack` tinyint(1) DEFAULT 0,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `businessName` varchar(255) DEFAULT NULL,
  `savedBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table structure for table `savedcards`
DROP TABLE IF EXISTS `savedcards`;
CREATE TABLE `savedcards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `config` json DEFAULT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `businessName` varchar(255) DEFAULT NULL,
  `profilePhoto` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `coverPhoto` varchar(255) DEFAULT NULL,
  `primaryBackgroundColor` varchar(255) DEFAULT NULL,
  `secondaryBackgroundColor` varchar(255) DEFAULT NULL,
  `textColor` varchar(255) DEFAULT NULL,
  `titleColor` varchar(255) DEFAULT NULL,
  `primaryActions` json DEFAULT NULL,
  `secondaryActions` json DEFAULT NULL,
  `featuredContent` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table structure for table `usercards`
DROP TABLE IF EXISTS `usercards`;
CREATE TABLE `usercards` (
  -- Please add the correct structure here based on your original table
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
);

-- Table structure for table `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `businessCode` varchar(255) UNIQUE DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `businessName` varchar(255) DEFAULT NULL,
  `profilePhoto` varchar(255) DEFAULT NULL,
  `mobile` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Data for table `activities`
-- (No data)

-- Data for table `cardtemplates`
INSERT INTO `cardtemplates` (`id`, `name`, `desc`, `htmlPreview`, `htmlData`, `isActive`, `createdAt`, `updatedAt`) VALUES
(2, 'Birthday Card', 'A cheerful birthday card template', '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"><style>body {margin: 0;font-family: "Montserrat", sans-serif;}.card {display: flex;flex-direction: column;width: 395px;height: 210px;border-radius: 10px;background-color: #1a202c;color: #cbd5e0;}.cardUpper {display: flex;height: 85%;background-color: #f7fafc;border-radius: 10px 10px 0 0;}.leftside {width: 33.33%;height: 40%;}.leftupper {width: 100%;height: 80px;border-radius: 10px 0 0 0;display: flex;justify-content: center;align-items: center;}.leftupper img {border-radius: 50%;width: 50px;margin: 8px;}.leftlower {width: 100%;height: 80%;display: flex;flex-direction: column;justify-content: center;align-items: center;padding-top: 2px;}.leftlower h1,.leftlower h4 {text-align: center;margin: 0;color: #1a202c;}.leftlower h1 {font-weight: bold;font-size: 14px;line-height: 16px;}.leftlower h4 {font-weight: light;font-size: 8px;line-height: 16px;}.rightside {width: 66.67%;height: 100%;}.header {height: 45%;background-color: #f7fafc;display: flex;justify-content: start;align-items: center;padding-right: 20px;border-radius: 0 10px 0 0;padding-left: 12px;}.company {display: flex;justify-content: start;padding-top: 1px;}.logo img {width: 40px;border-radius: 50%;margin-right: 5px;}.businessDescription {width: 24%;}.businessDescription h1 {font-weight: bold;font-size: 18px;line-height: 25px;color: #1a202c;margin: 0;padding-top: 7px;}.businessDescription h6 {font-weight: light;font-size: 8px;line-height: 4px;color: #4a5568;white-space: nowrap;text-overflow: ellipsis;}.body {height: 55%;background-color: #f7fafc;display: flex;justify-content: center;align-items: center;padding: 4px;}.b_left {height: 100%;width: 80%;display: flex;flex-direction: column;justify-content: center;align-items: flex-start;}.contactInfo {display: flex;flex-direction: column;gap: 4px;}.phone,.location,.mail,.website {display: flex;justify-content: center;align-items: center;gap: 3px;}.phone h1,.location h1,.mail h1,.website h1 {font-family: "Roboto Light", sans-serif;font-weight: light;font-size: 10px;line-height: 18px;color: #4a5568;min-width: 175px;max-width: 175px;min-height: 18px;border: none;outline: none;white-space: normal;word-break: break-all;display: flex;align-items: center;caret-color: transparent;margin-left: 3px;}.cardLower {height: 20%;}.footer {height: 100%;background-color: #48bb78;border-radius: 0 0 10px 10px;}.logos {display: flex;justify-content: space-evenly;align-items: center;padding-left: 2px;padding-right: 2px;padding-top: 6.5px;min-height: 33px;}.logos div {display: flex;width: 20px;color: #fff;}.icon {color: #1a202c;font-size: 9.5px;}.social-icons-div {margin-left: 10px;margin-right: 10px;fill: #ffffff;}.social-icon {display: block;} .social-icon.fa-spotify {fill: #ffffff; } a{text-decoration: none;display: none;}</style></head><body><div class="card"><div class="cardUpper"><div class="leftside"><div class="leftupper"><img id="profilePicture" src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg" alt="img" class="rounded-full size-[50px] m-8" /></div><div class="leftlower"><h1 id="first_name">JOHN</h1><h1 id="last_name">DOE</h1><h4 id="role">DESIGNER</h4></div></div><div class="rightside"><div class="header"><div class="company"><div class="logo"><img id="logoPicture" src="https://shorturl.at/jNY48" alt="" class="size-[40px]" /></div><div class="businessDescription"><h1 id="business_name">Business</h1><h6 id="business_description">Description</h6></div></div></div><div class="body"><div class="b_left"><div class="contactInfo"><div class="phone"><i class="fa-solid fa-phone icon "></i><h1 id="mobile">000-123-456-7890</h1></div><div class="location"><i class="fa-solid fa-location-dot icon"></i><h1 id="location">Your Address</h1></div><div class="mail"><i class="fa-solid fa-envelope icon"></i><h1 id="email">email@yourdomain.com</h1></div><div class="website"><i class="fa-solid fa-globe icon"></i><h1 id="website">www.yourwebsite.com</h1></div></div></div></div></div></div><div class="cardLower"><div class="footer"><div class="logos"><a id="facebook_link" href=""><div class="social-icons-div"><i class="fa-brands fa-facebook social-icon" ></i></div></a><a id="youtube_link" href=""><div class="social-icons-div"><i class="fa-brands fa-youtube social-icon" ></i></div></a><a id="instagram_link" href=""><div class="social-icons-div"><i class="fa-brands fa-instagram social-icon" ></i></div></a><a id="github_link" href=""><div class="social-icons-div"><i class="fa-brands fa-github social-icon" ></i></div></a><a id="snapchat_link" href=""><div class="social-icons-div"><i class="fa-brands fa-snapchat social-icon" ></i></div></a><a id="twitter_link" href=""><div class="social-icons-div"><i class="fa-brands fa-twitter social-icon" ></i></div></a><a id="linkedin_link" href=""><div class="social-icons-div"><i class="fa-brands fa-linkedin social-icon" ></i></div></a><a id="spotify_link" href=""><div class="social-icons-div"><i class="fa-brands fa-spotify social-icon" ></i></div></a></div></div></div></div></body></html>', '{"image_url": "https://example.com/birthday_image.jpg", "font_color": "#FF5733", "background_color": "#FCECDD"}', 1, '2024-04-25 06:29:28', '2024-04-25 06:29:28'),
(3, 'Birthday Card', 'A cheerful birthday card template', '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"><style>body {margin: 0;font-family: "Montserrat", sans-serif;}.card {display: flex;flex-direction: column;width: 395px;height: 210px;border-radius: 10px;background-color: #1a202c;color: #cbd5e0;}.cardUpper {display: flex;height: 85%;background-color: #f7fafc;border-radius: 10px 10px 0 0;}.leftside {width: 33.33%;height: 40%;}.leftupper {width: 100%;height: 80px;border-radius: 10px 0 0 0;display: flex;justify-content: center;align-items: center;}.leftupper img {border-radius: 50%;width: 50px;margin: 8px;}.leftlower {width: 100%;height: 80%;display: flex;flex-direction: column;justify-content: center;align-items: center;padding-top: 2px;}.leftlower h1,.leftlower h4 {text-align: center;margin: 0;color: #1a202c;}.leftlower h1 {font-weight: bold;font-size: 14px;line-height: 16px;}.leftlower h4 {font-weight: light;font-size: 8px;line-height: 16px;}.rightside {width: 66.67%;height: 100%;}.header {height: 45%;background-color: #f7fafc;display: flex;justify-content: start;align-items: center;padding-right: 20px;border-radius: 0 10px 0 0;padding-left: 12px;}.company {display: flex;justify-content: start;padding-top: 1px;}.logo img {width: 40px;border-radius: 50%;margin-right: 5px;}.businessDescription {width: 24%;}.businessDescription h1 {font-weight: bold;font-size: 18px;line-height: 25px;color: #1a202c;margin: 0;padding-top: 7px;}.businessDescription h6 {font-weight: light;font-size: 8px;line-height: 4px;color: #4a5568;white-space: nowrap;text-overflow: ellipsis;}.body {height: 55%;background-color: #f7fafc;display: flex;justify-content: center;align-items: center;padding: 4px;}.b_left {height: 100%;width: 80%;display: flex;flex-direction: column;justify-content: center;align-items: flex-start;}.contactInfo {display: flex;flex-direction: column;gap: 4px;}.phone,.location,.mail,.website {display: flex;justify-content: center;align-items: center;gap: 3px;}.phone h1,.location h1,.mail h1,.website h1 {font-family: "Roboto Light", sans-serif;font-weight: light;font-size: 10px;line-height: 18px;color: #4a5568;min-width: 175px;max-width: 175px;min-height: 18px;border: none;outline: none;white-space: normal;word-break: break-all;display: flex;align-items: center;caret-color: transparent;margin-left: 3px;}.cardLower {height: 20%;}.footer {height: 100%;background-color: #48bb78;border-radius: 0 0 10px 10px;}.logos {display: flex;justify-content: space-evenly;align-items: center;padding-left: 2px;padding-right: 2px;padding-top: 6.5px;min-height: 33px;}.logos div {display: flex;width: 20px;color: #fff;}.icon {color: #1a202c;font-size: 9.5px;}.social-icons-div {margin-left: 10px;margin-right: 10px;fill: #ffffff;}.social-icon {display: block;} a{text-decoration: none;display: none;}</style></head><body><div class="card"><div class="cardUpper"><div class="leftside"><div class="leftupper"><img id="profilePicture" src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg" alt="img" class="rounded-full size-[50px] m-8" /></div><div class="leftlower"><h1 id="first_name">JOHN</h1><h1 id="last_name">DOE</h1><h4 id="job_title">DESIGNER</h4></div></div><div class="rightside"><div class="header"><div class="company"><div class="logo"><img id="logoPicture" src="https://shorturl.at/jNY48" alt="" class="size-[40px]" /></div><div class="businessDescription"><h1 id="business_name">Business</h1><h6 id="business_description">Description</h6></div></div></div><div class="body"><div class="b_left"><div class="contactInfo"><div class="phone"><i class="fa-solid fa-phone icon "></i><h1 id="mobile">000-123-456-7890</h1></div><div class="location"><i class="fa-solid fa-location-dot icon"></i><h1 id="location">Your Address</h1></div><div class="mail"><i class="fa-solid fa-envelope icon"></i><h1 id="email">email@yourdomain.com</h1></div><div class="website"><i class="fa-solid fa-globe icon"></i><h1 id="website">www.yourwebsite.com</h1></div></div></div></div></div></div><div class="cardLower"><div class="footer"><div class="logos"><a id="facebook" href=""><div class="social-icons-div"><i class="fa-brands fa-facebook social-icon" ></i></div></a><a id="youtube" href=""><div class="social-icons-div"><i class="fa-brands fa-youtube social-icon" ></i></div></a><a id="instagram" href=""><div class="social-icons-div"><i class="fa-brands fa-instagram social-icon" ></i></div></a><a id="github" href=""><div class="social-icons-div"><i class="fa-brands fa-github social-icon" ></i></div></a><a id="snapchat" href=""><div class="social-icons-div"><i class="fa-brands fa-snapchat social-icon" ></i></div></a><a id="twitter" href=""><div class="social-icons-div"><i class="fa-brands fa-twitter social-icon" ></i></div></a><a id="linkedin" href=""><div class="social-icons-div"><i class="fa-brands fa-linkedin social-icon" ></i></div></a><a id="spotify" href=""><div class="social-icons-div"><i class="fa-brands fa-spotify social-icon" ></i></div></a></div></div></div></div></body></html>', '{"image_url": "https://example.com/birthday_image.jpg", "font_color": "#FF5733", "background_color": "#FCECDD"}', 1, '2024-04-25 06:37:03', '2024-04-25 06:37:03');

-- Data for table `contacts`
INSERT INTO `contacts` (`id`, `userId`, `contactUserId`, `contactName`, `contactEmail`, `contactPhone`, `contactCardId`, `addedAt`, `sharedBack`, `notes`, `createdAt`, `updatedAt`, `jobTitle`, `businessName`, `savedBy`) VALUES
(1, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-06-27 12:34:32', 0, '', '2025-06-27 12:34:32', '2025-06-27 12:34:32', NULL, NULL, 'by me'),
(2, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-06-27 12:34:34', 0, '', '2025-06-27 12:34:34', '2025-06-27 12:34:34', NULL, NULL, 'by me'),
(3, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-06-27 12:34:35', 0, '', '2025-06-27 12:34:35', '2025-06-27 12:34:35', NULL, NULL, 'by me'),
(4, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-06-27 12:34:35', 0, '', '2025-06-27 12:34:35', '2025-06-27 12:34:35', NULL, NULL, 'by me'),
(5, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-06-27 12:34:35', 0, '', '2025-06-27 12:34:35', '2025-06-27 12:34:35', NULL, NULL, 'by me'),
(6, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-06-27 12:34:42', 0, '', '2025-06-27 12:34:42', '2025-06-27 12:34:42', NULL, NULL, 'by me'),
(7, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-06-27 12:34:42', 0, '', '2025-06-27 12:34:42', '2025-06-27 12:34:42', NULL, NULL, 'by me'),
(8, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-06-27 12:34:42', 0, '', '2025-06-27 12:34:42', '2025-06-27 12:34:42', NULL, NULL, 'by me'),
(9, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-06-27 12:34:42', 0, '', '2025-06-27 12:34:42', '2025-06-27 12:34:42', NULL, NULL, 'by me'),
(10, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-06-27 12:34:42', 0, '', '2025-06-27 12:34:42', '2025-06-27 12:34:42', NULL, NULL, 'by me'),
(11, 3, 3, 'Jhon Doe', '', '', 7, '2025-06-30 04:44:16', 0, '', '2025-06-30 04:44:17', '2025-06-30 04:44:17', NULL, NULL, 'by me'),
(12, 3, 3, 'Jhon Doe', '', '', 7, '2025-06-30 04:44:19', 0, '', '2025-06-30 04:44:19', '2025-06-30 04:44:19', NULL, NULL, 'by me'),
(13, 3, 3, 'Jhon Doe', '', '', 7, '2025-06-30 04:44:19', 0, '', '2025-06-30 04:44:19', '2025-06-30 04:44:19', NULL, NULL, 'by me'),
(14, 3, 3, 'Jhon Doe', '', '', 7, '2025-06-30 04:44:19', 0, '', '2025-06-30 04:44:19', '2025-06-30 04:44:19', NULL, NULL, 'by me'),
(15, 3, 3, 'Jhon Doe', '', '', 7, '2025-06-30 04:44:20', 0, '', '2025-06-30 04:44:20', '2025-06-30 04:44:20', NULL, NULL, 'by me'),
(16, 3, 3, 'Jhon Doe', '', '', 7, '2025-06-30 04:45:00', 0, '', '2025-06-30 04:45:00', '2025-06-30 04:45:00', NULL, NULL, 'by me'),
(17, 3, 3, 'Jhon Doe', '', '', 7, '2025-06-30 04:46:12', 0, '', '2025-06-30 04:46:12', '2025-06-30 04:46:12', NULL, NULL, 'by me'),
(22, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-07-01 04:49:42', 0, '', '2025-07-01 04:49:42', '2025-07-01 04:49:42', NULL, NULL, 'by me'),
(23, 3, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-07-01 05:30:45', 0, '', '2025-07-01 05:30:45', '2025-07-01 05:30:45', NULL, NULL, 'by me'),
(25, 7, 7, 'Suhail', 'mohammedsuhailusman@gmail.com', '+919940624857', NULL, '2025-07-01 05:51:46', 1, '', '2025-07-01 05:51:46', '2025-07-01 05:51:46', 'Ndnejdj', NULL, 'by visitor'),
(26, 7, 2, 'Jhon Doe', 'zune@gmail.com', '9080723329', 1, '2025-07-01 05:51:52', 0, '', '2025-07-01 05:51:52', '2025-07-01 05:51:52', 'Designer', 'Onfra proptech soltuions', 'by me'),
(27, 7, 7, 'Suhail', 'mohammedsuhailusman@gmail.com', '+919940624857', NULL, '2025-07-01 05:52:45', 1, '', '2025-07-01 05:52:45', '2025-07-01 05:52:45', 'Ndnejdj', NULL, 'by visitor'),
(28, 7, 7, 'Suhail', 'mohammedsuhailusman@gmail.com', '+919940624857', NULL, '2025-07-01 05:59:40', 1, '', '2025-07-01 05:59:40', '2025-07-01 05:59:40', 'Ndnejdj', NULL, 'by visitor'),
(29, 7, 7, 'Suhail', 'mohammedsuhailusman@gmail.com', '+919940624857', NULL, '2025-07-01 05:59:43', 1, '', '2025-07-01 05:59:43', '2025-07-01 05:59:43', 'Ndnejdj', NULL, 'by visitor'),
(30, 7, 7, 'Suhail', 'mohammedsuhailusman@gmail.com', '+919940624857', NULL, '2025-07-01 05:59:43', 1, '', '2025-07-01 05:59:43', '2025-07-01 05:59:43', 'Ndnejdj', NULL, 'by visitor'),
(31, 7, 7, 'Suhail', 'mohammedsuhailusman@gmail.com', '+919940624857', NULL, '2025-07-01 05:59:44', 1, '', '2025-07-01 05:59:44', '2025-07-01 05:59:44', 'Ndnejdj', NULL, 'by visitor'),
(32, 7, 7, 'Suhail', 'mohammedsuhailusman@gmail.com', '+919940624857', NULL, '2025-07-01 05:59:44', 1, '', '2025-07-01 05:59:44', '2025-07-01 05:59:44', 'Ndnejdj', NULL, 'by visitor'),
(33, 7, 7, 'Suhail', 'mohammedsuhailusman@gmail.com', '+919940624857', NULL, '2025-07-01 05:59:44', 1, '', '2025-07-01 05:59:44', '2025-07-01 05:59:44', 'Ndnejdj', NULL, 'by visitor'),
(34, 7, 7, 'Suhail', 'mohammedsuhailusman@gmail.com', '+919940624857', NULL, '2025-07-01 05:59:44', 1, '', '2025-07-01 05:59:44', '2025-07-01 05:59:44', 'Ndnejdj', NULL, 'by visitor'),
(35, 7, 7, 'Suhail', 'mohammedsuhailusman@gmail.com', '+919940624857', NULL, '2025-07-01 05:59:44', 1, '', '2025-07-01 05:59:44', '2025-07-01 05:59:44', 'Ndnejdj', NULL, 'by visitor'),
(47, 2, 4, 'M zune', 'mohammed.zunnoon2022@vitstudent.ac.in', '+9190 80723329', NULL, '2025-07-01 08:14:27', 0, '', '2025-07-01 08:14:27', '2025-07-01 08:57:10', 'Cloud engineer', 'Onfra proptech soltuions', 'by M zune'),
(48, 4, 2, 'Jhon Doe', 'zune@gmail.com', '+919 080723329', 1, '2025-07-01 08:51:31', 0, '', '2025-07-01 08:51:31', '2025-07-01 09:48:05', 'Designer', 'Onfra proptech soltuions', 'by me');

-- Data for table `savedcards`
-- (Add INSERT statements here if you want to include data)

-- Data for table `usercards`
-- (No data)

-- Data for table `users`
INSERT INTO `users` (`id`, `username`, `email`, `password`, `isActive`, `businessCode`, `createdAt`, `updatedAt`, `jobTitle`, `businessName`, `profilePhoto`, `mobile`) VALUES
(1, 'mohammed muzammil', 'mohamedmuzamil22+1@gmail.com', '$2b$10$XdE4CVO6.u8skAzDUn0t5uyN/G9aG1susMIxhRzbWWvvZ6sHkGFGe', 1, NULL, '2024-04-25 05:54:03', '2024-04-25 05:54:03', NULL, NULL, NULL, NULL),
(2, 'Zune', 'zune@gmail.com', '$2a$10$jgGbJOBhufj6/WviDr/U8OBdQHxQd7QNggwf2w.zVPEspsMyBM6Fa', 1, NULL, '2025-06-26 16:36:56', '2025-07-02 05:12:12', 'Developer', 'Onfra proptech soltuions', '/uploads/profile_photos/2_zune/profile_2_1751433132841.jpg', '+919080723329),
(3, 'Moh Zune', 'mohammed.zunnoon.aamir.avaram@gmail.com', '$2b$10$kkYlu9Z3yJqfuWEovlCeaub8XIIBmEahmFiCJdcZH1vTl3QfCfoOu', 1, NULL, '2025-06-27 06:06:54', '2025-07-01 05:30:37', 'backend engineer', NULL, NULL, '+19894864910),
(4, 'M zune', 'mohammed.zunnoon2022@vitstudent.ac.in', '$2b$10$HlIqMwwk7bEyKPIXpPSvr.CGb61iRdQRF6ZjH8aducI5Yut7Oi9I6', 1, NULL, '2025-06-27 06:10:30', '2025-07-01 08:57:02', 'Cloud engineer', 'Onfra proptech soltuions', NULL, '+919080723329),
(5, 'zune', 'faizahamid@ifelsetech.com', '$2b$10$6Kwzi6FVDdHLaskHH5Z/pOPr8s3qqz1JOPwVjFHkItRz.Gf5q1fSC', 1, NULL, '2025-06-27 08:57:48', '2025-06-27 08:57:48', NULL, NULL, NULL, NULL),
(6, 'zune', 'procoder.net@gmail.com', '$2b$10$xY4/tHzGi6nCRaFMLOXZu.K3zmpXrE72nz1y353u94tTGR6drrpg.', 1, NULL, '2025-06-27 09:00:54', '2025-06-27 09:00:54', NULL, NULL, NULL, NULL),
(7, 'Suhail', 'mohammedsuhailusman@gmail.com', '$2b$10$uljkACUegHvxADTjpraOXuUxxjIt/eBzRCIxZM/sgpXotwnYI/oSe', 1, NULL, '2025-07-01 05:51:19', '2025-07-01 05:52:25', 'Ndnejdj', NULL, '/uploadsD:/onfra/bizcard/frontend/public/uploads/undefined_7/01-Jul-2025/images/96f7e910b7dead8b5ef791626f64015e-1000210877.jpg', '+919940624857);
