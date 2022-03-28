use mysql;

select * from recipe ORDER BY RECIPERATING DESC LIMIT 2;

select * from photo;
update photo set docsseq=0;

select * from recipe;
select * from rating;

INSERT INTO PHOTO(PHOTOSEQ, DOCSSEQ, PHOTOTITLE, PHOTOCONTENT, PHOTOCATEGORY, PHOTOURL)
    VALUES(NEXTVAL('PHOTOSEQ'), 1, 'thumbnail', '두번째 레시피 사진입니다.', 'recipe', 'https://source.unsplash.com/1024x768/?food');

INSERT INTO PHOTO(PHOTOSEQ, DOCSSEQ, PHOTOTITLE, PHOTOCONTENT, PHOTOCATEGORY, PHOTOURL)
    VALUES(NEXTVAL('PHOTOSEQ'), 1, 'cookOrder', '두번째 레시피 설명입니다.', 'recipe', 'https://source.unsplash.com/1024x768/?fire');
    
INSERT INTO PHOTO(PHOTOSEQ, DOCSSEQ, PHOTOTITLE, PHOTOCONTENT, PHOTOCATEGORY, PHOTOURL)
    VALUES(NEXTVAL('PHOTOSEQ'), 2, 'thumbnail', '세번째 레시피 썸넬 사진입니다.', 'recipe', 'https://source.unsplash.com/1024x768/?sun');
    
INSERT INTO PHOTO(PHOTOSEQ, DOCSSEQ, PHOTOTITLE, PHOTOCONTENT, PHOTOCATEGORY, PHOTOURL)
    VALUES(NEXTVAL('PHOTOSEQ'), 2, 'cookOrder', '세번째 레시피 설명입니다.', 'recipe', 'https://source.unsplash.com/1024x768/?moon');

select DOCSSEQ, photoseq from photo where docsseq in (3, 2, 1, 0) and phototitle='thumbnail';

select * from recipe;

UPDATE RECIPE SET RECIPERATING=IFNULL(0,( SELECT ROUND(AVG(RATINGSCORE), 2) FROM RATING GROUP BY DOCSSEQ HAVING DOCSSEQ=0 )) WHERE RECIPESEQ=0;



SELECT ROUND(AVG(RATINGSCORE), 2) FROM RATING GROUP BY DOCSSEQ HAVING DOCSSEQ=0;

SELECT ROUND(AVG(RATINGSCORE), 2) FROM RATING GROUP BY DOCSSEQ HAVING DOCSSEQ=1;