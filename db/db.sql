#DROP DATABASE SNAKEGAME;
#CREATE DATABASE snakegame;
USE snakegame;

DROP TABLE rankdata;

CREATE TABLE rankdata(
	_username VARCHAR(10) NOT NULL,
    _score INT NOT NULL,
    _time DATETIME NOT NULL,
    PRIMARY KEY(_username, _time)
);

INSERT INTO rankdata (_username, _score, _time) VALUES('itjeong', 30, NOW());

use snakegame;

select * from rankdata;