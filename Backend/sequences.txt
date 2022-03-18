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
VALUES('LIKE_SEQ', 0);

INSERT INTO sequences 
VALUES('RECIPE_SEQ', 0);

INSERT INTO sequences 
VALUES('PHOTO_SEQ', 0);

INSERT INTO sequences 
VALUES('PAYMENT_SEQ', 0);

INSERT INTO sequences 
VALUES('GOODS_SEQ', 0);

INSERT INTO sequences 
VALUES('PAYMENT_LIST_SEQ', 0);

INSERT INTO sequences 
VALUES('RATING_SEQ', 0);


select NEXTVAL('LIKE_SEQ') as LIKE_SEQ 
from dual;

select NEXTVAL('RECIPE_SEQ') as RECIPE_SEQ 
from dual;

select NEXTVAL('PHOTO_SEQ') as PHOTO_SEQ 
from dual;

select NEXTVAL('PAYMENT_SEQ') as PAYMENT_SEQ 
from dual;

select NEXTVAL('GOODS_SEQ') as GOODS_SEQ 
from dual;

select NEXTVAL('PAYMENT_LIST_SEQ') as PAYMENT_LIST_SEQ 
from dual;

select NEXTVAL('RATING_SEQ') as RATING_SEQ 
from dual;

select * from SEQUENCES;

delete from SEQUENCES where name='LIKE_SEQ';

commit;