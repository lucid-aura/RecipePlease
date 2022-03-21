use mysql;

select * from recipe;

--CREATE PROCEDURE create_sequence(IN the_name text)
--MODIFIES SQL DATA
--DETERMINISTIC
--BEGIN
--    DELETE FROM sequences WHERE name=the_name;
--    INSERT INTO sequences VALUES (the_name, 0)
--END

INSERT INTO sequences 
VALUES('LIKESEQ', 0);

INSERT INTO sequences 
VALUES('RECIPESEQ', 0);

INSERT INTO sequences 
VALUES('PHOTOSEQ', 0);

INSERT INTO sequences 
VALUES('PAYMENTSEQ', 0);

INSERT INTO sequences 
VALUES('GOODSSEQ', 0);

INSERT INTO sequences 
VALUES('PAYMENTLISTSEQ', 0);

INSERT INTO sequences 
VALUES('RATINGSEQ', 0);


select NEXTVAL('LIKESEQ') as LIKESEQ 
from dual;

select NEXTVAL('RECIPESEQ') as RECIPESEQ 
from dual;

select NEXTVAL('PHOTOSEQ') as PHOTOSEQ 
from dual;

select NEXTVAL('PAYMENTSEQ') as PAYMENTSEQ 
from dual;

select NEXTVAL('GOODSSEQ') as GOODSSEQ 
from dual;

select NEXTVAL('PAYMENTLISTSEQ') as PAYMENTLISTSEQ 
from dual;

select NEXTVAL('RATINGSEQ') as RATINGSEQ 
from dual;

select * from SEQUENCES;

delete from SEQUENCES where name='LIKESEQ';
DELETE FROM SEQUENCES;

commit;