use mysql;

select * from recipe;

select * from recipe WHERE RECIPETITLE LIKE '%!%';

update RECIPE SET RECIPESMALLCATEGORY = 'personal' WHERE RECIPESEQ=3;

SELECT * FROM RECIPE WHERE RECIPETITLE LIKE '%%';

select * from photo;

update PHOTO SET PHOTOURL = 'file:///storage/emulated/0/DCIM/image-s2.jpg' WHERE PHOTOSEQ=15;
/storage/emulated/0/