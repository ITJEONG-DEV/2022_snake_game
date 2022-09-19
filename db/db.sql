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
INSERT INTO rankdata (_username, _score, _time) VALUES('itjeong', 20, NOW());
INSERT INTO rankdata (_username, _score, _time) VALUES('itjeong', 60, NOW());
INSERT INTO rankdata (_username, _score, _time) VALUES('bob', 60, NOW());

use snakegame;

SELECT * FROM rankdata;

SELECT * FROM rankdata ORDER BY _score DESC LIMIT 3;

SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata;

# 상위 5개 점수만 가져옴
SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata LIMIT 5;

# 1-5등의 점수만 가져옴
SELECT * FROM (SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata) ranked WHERE ranked._rank<=5;

# 선택한 유저의 점수가 몇 등인지 가져옴
SELECT * FROM (SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata) ranked WHERE ranked._username = 'itjeong' and ranked._score=60;
SELECT _rank FROM (SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata) ranked WHERE ranked._username = 'itjeong' and ranked._score=60;

# 최대 등수
SELECT MAX(ranked._rank) FROM (SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata) ranked;

# 전체 인원
SELECT COUNT(*) _count FROM rankdata;

# 나의 위에 몇 명이 있는지
SELECT COUNT(*) FROM (SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata) ranked WHERE ranked._score>50;

# 나의 아래에 몇 명이 있는지
SELECT COUNT(*) FROM (SELECT _username, _score, DENSE_RANK() OVER (ORDER BY _score DESC) _rank FROM rankdata) ranked WHERE ranked._score<50;