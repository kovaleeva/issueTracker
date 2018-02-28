-- ----___ISSUES___---- --
CREATE TABLE if not exists `issues` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`statusID` INT(4) unsigned DEFAULT 1,
	`typeID` INT(4) unsigned,
	`title` VARCHAR(256),
	`description` VARCHAR(256),
	`assignedBy` INT(4) unsigned,
	`last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
  	KEY `idx_fk_typeID` (`typeID`),
  	KEY `idx_fk_statusID` (`statusID`),
  	KEY `idx_fk_assignedBy` (`assignedBy`),
  	CONSTRAINT `fk_issues_assignedBy` FOREIGN KEY (`assignedBy`) REFERENCES `users` (`id`)  ON UPDATE cascade,
  	CONSTRAINT `fk_issues_issueType` FOREIGN KEY (`typeID`) REFERENCES `issueType` (`id`)  ON UPDATE cascade,
  	CONSTRAINT `fk_issues_issueStatus` FOREIGN KEY (`statusID`) REFERENCES `issueStatus` (`id`)  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `issues` (`title`, `description`, `assignedBy`, `typeID`, `statusID`) values
	('First', 'First issue ever', 1, 2, 2 ),
	('Second', 'Second issue', 1, 2, 4 ),
	('Third', 'Third issue', 1, 1, 3 );


select * from `issue_tracker`.`users`;

-- ----___ISSUE TYPE___---- --
CREATE TABLE if not exists `issueType` (
	`id` INT(4) unsigned NOT NULL AUTO_INCREMENT,
	`type` VARCHAR(256) UNIQUE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `issueType` (`type`) values ('Task'), ('Bug');

-- ----___ISSUE STATUS___---- --
CREATE TABLE if not exists `issueStatus` (
	`id` INT(4) unsigned NOT NULL AUTO_INCREMENT,
	`status` VARCHAR(256) UNIQUE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `issueStatus` (`status`) values ('New'), ('Active'), ('Closed'), ('Reactivated'), ('Resolved');

-- ----___USERS___---- --
CREATE TABLE if not exists `users` (
	`id` INT unsigned not null AUTO_INCREMENT,
	`login` VARCHAR(256) UNIQUE,
	`username` VARCHAR(256),
	`password` VARCHAR(256),
	`email` VARCHAR(256) UNIQUE,
	`groupID` INT(4) unsigned,
	primary key (`id`),
	KEY `idx_fk_groupID` (`groupID`),
  	CONSTRAINT `fk_users_userGroup` FOREIGN KEY (`groupID`) REFERENCES `userGroup` (`id`)  ON UPDATE cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `users` (`login`, `password`, `username`, `email`, `groupID`)
		values ('login1', 'password', 'John Dou', 'qw1@gmail.com', 1),
				('login2', 'password2', 'John Dou2', 'qw2@gmail.com', 3);

-- ----___USER GROUP___---- --
CREATE TABLE if not exists `userGroup` (
	`id` INT(4) unsigned NOT NULL AUTO_INCREMENT,
	`group` VARCHAR(256) UNIQUE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `userGroup` (`group`) values ('Admin'), ('PM'), ('Dev'), ('QA');

-- ----___HISTORY___---- --
CREATE TABLE if not exists `history` (
	`id` INT unsigned not null AUTO_INCREMENT,
	`issueID` INT(4) unsigned,
	`changerID` INT(4) unsigned,
	`assignedNewID` INT(4) unsigned,
	`assignedOldID` INT(4) unsigned,
	`statusNewID` INT(4) unsigned,
	`statusOldID` INT(4) unsigned,
	`last_update` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
	KEY `idx_fk_history_IssueID` (`issueID`),
	KEY `idx_fk_history_ChangerID` (`changerID`),
	KEY `idx_fk_history_AssignedNewID` (`assignedNewID`),
	KEY `idx_fk_history_AssignedOldID` (`assignedOldID`),
	KEY `idx_fk_history_StatusNewID` (`statusNewID`),
	KEY `idx_fk_history_StatusOldID` (`statusOldID`),
  	CONSTRAINT `fk_history_issue` FOREIGN KEY (`issueID`) REFERENCES `issues` (`id`)  ON UPDATE cascade,
  	CONSTRAINT `fk_history_changer` FOREIGN KEY (`changerID`) REFERENCES `users` (`id`)  ON UPDATE cascade,
  	CONSTRAINT `fk_history_assignedNew` FOREIGN KEY (`assignedNewID`) REFERENCES `users` (`id`)  ON UPDATE cascade,
  	CONSTRAINT `fk_history_assignedOld` FOREIGN KEY (`assignedOldID`) REFERENCES `users` (`id`)  ON UPDATE cascade,
  	CONSTRAINT `fk_history_statusNew` FOREIGN KEY (`statusNewID`) REFERENCES `issueStatus` (`id`)  ON UPDATE cascade,
  	CONSTRAINT `fk_history_statusOld` FOREIGN KEY (`statusOldID`) REFERENCES `issueStatus` (`id`)  ON UPDATE cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO history (issueID, changerID, assignedNewID, assignedOldID,
					statusNewID, statusOldID)
	VALUES (1, 2, 1, 2, 2, 1);


drop table if exists history;
drop table if exists issues;
drop table if exists users;
drop table if exists issueType;
drop table if exists issueStatus;
drop table if exists userGroup;

CREATE TABLE if not exists `issues` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`status` VARCHAR(256) DEFAULT 'New',
	`title` VARCHAR(256),
	`description` VARCHAR(256),
	`type` VARCHAR(256),
	`last_update` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO issues (title, description, type) values
	('First', 'First issue ever', 'Task' ),
	('Second', 'Second issue', 'Bug' ),
	('Third', 'Third issue', 'Bug' );




