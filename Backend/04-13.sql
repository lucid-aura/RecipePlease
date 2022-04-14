use mysql;

select * from recipe;
select * from cointransaction;
select * from members;  
select * from photo;
select * from rating;
SELECT * FROM PAYMENT;
update cointransaction set memberid='qqq';
update members set membercoin=800 where memberid='Qqq';

delete from members where MEMBERID='2200039450';
delete from recipe;
delete from cointransaction;

ALTER TABLE `MEMBERS` MODIFY `MEMBERID` VARCHAR(40);
ALTER TABLE `PAYMENT` MODIFY `MEMBERID` VARCHAR(40);
ALTER TABLE `PAYMENTLIST` MODIFY `MEMBERID` VARCHAR(40);
ALTER TABLE `RECIPE` MODIFY `MEMBERID` VARCHAR(40);
ALTER TABLE `RATING` MODIFY `MEMBERID` VARCHAR(40);
ALTER TABLE `RECIPELIKE` MODIFY `MEMBERID` VARCHAR(40);
ALTER TABLE `COINTRANSACTION` MODIFY `MEMBERID` VARCHAR(40);

		SELECT COUNT(*)
		FROM MEMBERS
		WHERE MEMBERID = '2200039450';