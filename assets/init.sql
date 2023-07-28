CREATE TABLE IF NOT EXISTS `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `events` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `body` text NOT NULL,
  `dateEnd` timestamp NULL DEFAULT NULL,
  `dateStart` timestamp NOT NULL,
  `image` text CHARACTER SET utf8mb4 NOT NULL,
  `imageAlt` text CHARACTER SET utf8mb4 NOT NULL,
  `name` text CHARACTER SET utf8mb4 NOT NULL,
  `slug` varchar(512) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `links` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `name` varchar(256) CHARACTER SET utf8mb4 NOT NULL,
  `position` int NOT NULL,
  `show_on` datetime DEFAULT NULL,
  `url` varchar(2048) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
