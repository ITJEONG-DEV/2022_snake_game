### SNAKE GAME

- 뱀 게임 개발
- 랭킹 서버 구현
- DB 구축

<br>

## 기술 스택

| js | MySql |
| :--------: | :--------: |
|   <img src="https://raw.githubusercontent.com/ITJEONG-DEV/README/main/.images/js.png" width="200" height="180"/>   |   <img src="https://raw.githubusercontent.com/ITJEONG-DEV/README/cd763909be113b37c44ab5490a4e9007e2c00920/.images/mysql.svg" width="200" height="200"/>    |

<br>

#### 1 게임 설명
- [뱀 게임](https://namu.wiki/w/%EB%B1%80%20%EA%B2%8C%EC%9E%84)을 구현함

![게임](https://github.com/ITJEONG-DEV/2022_snake_game/blob/main/images/game.gif?raw=true)

![ranking](./images/rank.png)

<br>

#### 2 구현

##### 2.1 client단
- html + js + css
- [mdn web docs](https://developer.mozilla.org/ko/docs/Learn/Getting_started_with_the_web/JavaScript_basics)에서 학습한 내용들을 활용하여 개발함
- canvas 사용


##### 2.2 server단
- nodejs + express
- GET request 사용
- 어려웠던 점: 비동기 처리..


##### 2.3 db
- mysql 사용

- 게임 플레이가 끝날 때마다 db를 추가
- 상위 5등 이내 && 10인 이하의 순위를 가져와서 보여 줌
- 본인의 점수와 등수를 보여 줌

<br>

#### 3 출처 표기
- bgm 출처: [CLOUDY DAY](https://www.youtube.com/channel/UCKd4Bp5ngWpPrGjTrROBFoQ)에서 무료 제공하는 [레트로 게임브금](https://hypeddit.com/track/nt42fj) 사용함

<br>

## 라이센스

MIT &copy; [ITJEONG](mailto:derbana1027@gmail.com)
