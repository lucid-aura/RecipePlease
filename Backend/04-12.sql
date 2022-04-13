use mysql;

select * from recipe;
select * from photo;
select * from rating;
select * from members;
select * from sequences;
update recipe set recipebigcategory='seafood', recipesmallcategory='personal' where recipeseq=4;
update sequences set CURRVAL=19 where name='photoseq';
update sequences set CURRVAL=5 where name='recipeseq';
DELETE FROM recipe WHERE recipeseq>4;
DELETE FROM photo WHERE docsseq>4;
DELETE FROM rating WHERE docsseq>4;