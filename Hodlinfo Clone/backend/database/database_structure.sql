DROP TABLE IF EXISTS `Trading_info`;

CREATE TABLE `Trading_info` (
  `id` varchar(150) NOT NULL DEFAULT (uuid()),
  `name` varchar(50) NOT NULL,
  `last` varchar(50) NOT NULL,
  `buy` double NOT NULL,
  `sell` float NOT NULL,
  `volume` float DEFAULT NULL,
  `base_unit` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
)

USE `Trading_info`;