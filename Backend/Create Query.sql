CREATE TABLE `MEMBERS` (
	`MEMBER_ID`	VARCHAR(20)	PRIMARY KEY,
	`MEMBER_PWD`	VARCHAR(100)	NOT NULL,
	`MEMBER_NICKNAME`	VARCHAR(50)	NOT NULL,
	`MEMBER_EMAIL`	VARCHAR(30)	NULL,
	`MEMBER_PHONE`	VARCHAR(20)	NULL,
	`MEMBER_COIN`	INTEGER	NOT NULL,
	`MEMBER_MAIN_ADDR`	VARCHAR(100)	NULL,
	`MEMBER_DETAIL_ADDR`	VARCHAR(100)	NULL,
	`MEMBER_ZIPCODE`	INTEGER	NULL,
	`MEMBER_GENDER`	VARCHAR(10)	NULL,
	`MEMBER_NAME`	VARCHAR(20)	NULL,
	`MEMBER_GRADE`	VARCHAR(50)	NOT NULL,
	`SALT`	VARCHAR(100)	NOT NULL
);

CREATE TABLE `GOODS` (
	`GOODS_SEQ`	INTEGER	PRIMARY KEY,
	`GOODS_NAME`	VARCHAR(20)	NOT NULL,
	`GOODS_PRICE`	INTEGER	NOT NULL,
	`GOODS_CATEGORY`	VARCHAR(20)	NOT NULL,
	`GOODS_COUNT`	INTEGER	NOT NULL,
	`GOODS_VIEW`	INTEGER	NOT NULL,
	`GOODS_RATING`	FLOAT	NOT NULL,
	`GOODS_CONTENT`	TEXT	NULL
);

CREATE TABLE `RECIPE` (
	`RECIPE_SEQ`	INTEGER	PRIMARY KEY,
	`MEMBER_ID`	VARCHAR(20)	NOT NULL,
	`RECIPE_TITLE`	VARCHAR(50)	NOT NULL,
	`RECIPE_CONTENT`	TEXT	NOT NULL,
	`RECIPE_BIG_CATEGORY`	VARCHAR(20)	NOT NULL,
	`RECIPE_SMALL_CATEGORY`	VARCHAR(50)	NOT NULL,
	`RECIPE_GOODS_TAG`	VARCHAR(50)	NOT NULL,
	`RECIPE_PRICE`	INTEGER	NOT NULL,
	`RECIPE_RATING`	FLOAT	NOT NULL
);

CREATE TABLE `RECIPELIKE` (
	`LIKE_SEQ`	INTEGER	PRIMARY KEY,
	`RECIPE_SEQ`	INTEGER	NOT NULL,
	`MEMBER_ID`	VARCHAR(20)	NOT NULL
);

CREATE TABLE `RATING` (
	`RATING_SEQ`	INTEGER	PRIMARY KEY,
	`DOCS_SEQ`	INTEGER	NOT NULL,
	`RATING_CATEGORY`	VARCHAR(20)	NOT NULL,
	`RATING_SCORE`	INTEGER	NOT NULL,
	`RATING_COMMENT`	VARCHAR(1000)	NOT NULL
);

CREATE TABLE `PAYMENT` (
	`PAYMENT_SEQ`	INTEGER	PRIMARY KEY,
	`MEMBER_ID`	VARCHAR(20)	NOT NULL,
	`PAYMENT_PAY`	INTEGER	NOT NULL,
	`PAYMENT_DATE`	DATE	NOT NULL,
	`PAYMENT_DEL`	VARCHAR(50)	NULL,
	`PAYMENT_MAIN_ADDR`	VARCHAR(100)	NULL,
	`PAYMENT_DETAIL_ADDR`	VARCHAR(100)	NULL,
	`PAYMENT_ZIPCODE`	INTEGER	NULL,
	`PAYMENT_CATEGORY`	VARCHAR(20)	NOT NULL,
	`PAYMENT_COUNT`	INTEGER	NOT NULL
);

CREATE TABLE `PAYMENT_LIST` (
	`PAYMENT_LIST_SEQ`	INTEGER	PRIMARY KEY,
	`PURCHASE_PRODUCT_SEQ`	INTEGER	NOT NULL,
	`PAYMENT_LIST_CATEGORY`	VARCHAR(20)	NOT NULL,
	`PAYMENT_COUNT`	INTEGER	NOT NULL,
	`PAYMENT_LIST_PAY`	INTEGER	NOT NULL
);

CREATE TABLE `PHOTO` (
	`PHOTO_SEQ`	INTEGER	PRIMARY KEY,
	`RECIPE_SEQ`	INTEGER	NOT NULL,
	`GOODS_SEQ`	INTEGER	NOT NULL,
	`PHOTO_TITLE`	VARCHAR(100)	NULL,
	`PHOTO_CONTENT`	VARCHAR(100)	NULL,
	`PHOTO_CATEGORY`	VARCHAR(20)	NULL,
	`PHOTO_URL`	VARCHAR(100)	NULL
);

ALTER TABLE `RECIPE` ADD CONSTRAINT `FK_MEMBERS_TO_RECIPE_1` FOREIGN KEY (
	`MEMBER_ID`
)
REFERENCES `MEMBERS` (
	`MEMBER_ID`
);

ALTER TABLE `RECIPELIKE` ADD CONSTRAINT `FK_RECIPE_TO_RECIPELIKE_1` FOREIGN KEY (
	`RECIPE_SEQ`
)
REFERENCES `RECIPE` (
	`RECIPE_SEQ`
);

ALTER TABLE `RECIPELIKE` ADD CONSTRAINT `FK_RECIPE_TO_RECIPELIKE_2` FOREIGN KEY (
	`MEMBER_ID`
)
REFERENCES `RECIPE` (
	`MEMBER_ID`
);

ALTER TABLE `PAYMENT` ADD CONSTRAINT `FK_MEMBERS_TO_PAYMENT_1` FOREIGN KEY (
	`MEMBER_ID`
)
REFERENCES `MEMBERS` (
	`MEMBER_ID`
);

ALTER TABLE `PHOTO` ADD CONSTRAINT `FK_RECIPE_TO_PHOTO_1` FOREIGN KEY (
	`RECIPE_SEQ`
)
REFERENCES `RECIPE` (
	`RECIPE_SEQ`
);

ALTER TABLE `PHOTO` ADD CONSTRAINT `FK_GOODS_TO_PHOTO_1` FOREIGN KEY (
	`GOODS_SEQ`
)
REFERENCES `GOODS` (
	`GOODS_SEQ`
);



DROP TABLE `PAYMENT_LIST`;
DROP TABLE `PAYMENT`;
DROP TABLE `PHOTO`;
DROP TABLE `RATING`;
DROP TABLE `RECIPELIKE`;
DROP TABLE `RECIPE`;
DROP TABLE `MEMBERS`;
DROP TABLE `GOODS`;