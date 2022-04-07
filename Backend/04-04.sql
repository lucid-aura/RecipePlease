use mysql;

select *  from recipe;

select * from rating;

update recipe set recipeprice=200 where recipeseq=2;

select * from cointransaction;

SELECT * FROM COINTRANSACTION
    	WHERE MEMBERID='test' AND DOCSSEQ=2;

select * from photo;

UPDATE PHOTO SET PHOTOURL = replace(PHOTOURL, '1024x768' ,'500x300');

SELECT * FROM RECIPELIKE;

select * from rating;