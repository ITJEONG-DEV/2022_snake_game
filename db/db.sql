#DROP DATABASE SNAKEGAME;
#CREATE DATABASE snakegame;
USE snakegame;

CREATE TABLE rankdata(
	_id CHAR(10) NOT NULL,
	_username VARCHAR(10) NOT NULL,
    _score INT NOT NULL,
    _time DATETIME NOT NULL,
    PRIMARY KEY(_ID)
);

INSERT INTO rankdata (_id, _username, _score, _time) VALUES('220919abcd', 'itjeong', 30, NOW());

use snakegame;

select * from rankdata;