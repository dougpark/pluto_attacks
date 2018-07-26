CREATE TABLE IF NOT EXISTS `highscore` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Game` varchar(20) COLLATE utf8_unicode_ci NOT NULL  DEFAULT '', 
  `Date` varchar(30) COLLATE utf8_unicode_ci NOT NULL  DEFAULT '',
  `WinHeight` int(5) NOT NULL DEFAULT 0,
  `WinWidth` int(5) NOT NULL DEFAULT 0,
  `GameLevel` int(3) NOT NULL DEFAULT 0,
  `GameMode` int(3) NOT NULL DEFAULT 0,
  `Score` int(10) NOT NULL DEFAULT 0,
  `Browser` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

