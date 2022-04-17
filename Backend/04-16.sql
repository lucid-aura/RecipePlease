use mysql;


select * from recipe;
select * from photo;
select * from rating;
select * from members;
select * from sequences;
SELECT * FROM GOODS;
update recipe set recipebigcategory='seafood', recipesmallcategory='personal' where recipeseq=4;
update sequences set CURRVAL=19 where name='photoseq';
update sequences set CURRVAL=5 where name='recipeseq';


DELETE FROM recipe WHERE recipeseq>4;
DELETE FROM photo WHERE docsseq>4;
DELETE FROM rating WHERE docsseq>4;

delete from goods;

SELECT * FROM SEQUENCES;
UPDATE SEQUENCES SET CURRVAL=0 WHERE NAME='GOODSSEQ';

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명듀헨 2인조 홈세트 11p',
45900,
'식기세트',
0,
0,
0,
'../assets/goodsdetail/main/sk1.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명스텐/이중/진공/식기/면기/그릇/컵/물컵/세트/주방용',
3600,
'식기세트',
0,
0,
0,
'../assets/goodsdetail/main/sk2.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명꼼플 심플 도자기식기 스페인하숙 옳음 4인 26P홈세트',
130000,
'식기세트',
0,
0,
0,
'../assets/goodsdetail/main/sk3.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명도자기 그릇세트 식기세트 밥그릇 대접 홈세트 14p',
18600,
'식기세트',
0,
0,
0,
'../assets/goodsdetail/main/sk4.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'실리콘 주방 조리도구 키친툴 9P 세트 ',
40000,
'조리도구세트',
0,
0,
0,
'../assets/goodsdetail/main/jr1.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'인블룸 안심실리콘 키친툴 조리기구 5개세트',
17010,
'조리도구세트',
0,
0,
0,
'../assets/goodsdetail/main/jr2.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'키친블루밍 조리도구 7종 세트 (국내산)',
30000,
'조리도구세트',
0,
0,
0,
'../assets/goodsdetail/main/jr3.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명실리콘 조리도구 키친툴 주방용품',
2900,
'조리도구세트',
0,
0,
0,
'../assets/goodsdetail/main/jr4.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'홈쇼핑상품상품명 램프쿡 만능 자동회전냄비',
89000,
'인덕션전용',
0,
0,
0,
'../assets/goodsdetail/main/id1.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'해피콜상품명 해피콜 에고 블랙에디션 IH 전골 냄비 인덕션 24cm',
30900,
'인덕션전용',
0,
0,
0,
'../assets/goodsdetail/main/id2.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'키친웰상품명 인덕션용 훠궈 샤브샤브 마라탕 세라믹 반반냄비 전골',
24600,
'인덕션전용',
0,
0,
0,
'../assets/goodsdetail/main/id3.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'디토상품명 디토 매직홀더 주물 IH 인덕션 후라이팬 냄비 세트',
89000,
'인덕션전용',
0,
0,
0,
'../assets/goodsdetail/main/id4.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명키친 접시 정리대 2p',
7200,
'주방정리소품',
0,
0,
0,
'../assets/goodsdetail/main/jj1.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명데이앤데이 주방 스탠드 선반 330',
12900,
'주방정리소품',
0,
0,
0,
'../assets/goodsdetail/main/jj2.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'360도회전 원형선반 주방양념선반 화장품소품정리(중)',
12900,
'주방정리소품',
0,
0,
0,
'../assets/goodsdetail/main/jj3.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'다다리빙상품명 기둥식 식기건조대 800 2단 골드 /주방 싱크대 선반',
33070,
'주방정리소품',
0,
0,
0,
'../assets/goodsdetail/main/jj4.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'대한상품명 사진 촬영 배경 소품 보헤미안 패브릭 배경천 BF-025',
6800,
'기타주방잡화',
0,
0,
0,
'../assets/goodsdetail/main/gt1.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'북유럽풍 테이블매트 조약돌 식탁매트 방수 식탁보',
2750,
'기타주방잡화',
0,
0,
0,
'../assets/goodsdetail/main/gt2.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명조화꽃장식 제비꽃화분 주방화분 인테리어화분',
11760,
'기타주방잡화',
0,
0,
0,
'../assets/goodsdetail/main/gt3.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명(3호) 짚받침 쌀독 인테리어매트 그릇 항아리',
26130,
'기타주방잡화',
0,
0,
0,
'../assets/goodsdetail/main/gt4.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명벅칼 악어집게 중 230mm 스텐 주방 고기 업소용 집게',
1400,
'주방집게',
0,
0,
0,
'../assets/goodsdetail/main/jz1.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명벅칼 숯 집게 BBQ 바베큐 스텐 캠핑 화로 장작',
3000,
'주방집게',
0,
0,
0,
'../assets/goodsdetail/main/jz2.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명스텐 주방 캠핑 바베큐 고기 집게',
7900,
'주방집게',
0,
0,
0,
'../assets/goodsdetail/main/jz3.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명벅칼 다용도 집게 대 225mm 주방 고기 업소용 치킨',
1600,
'주방집게',
0,
0,
0,
'../assets/goodsdetail/main/jz4.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명다용도 일회용 포장용기(믿음인터내셔널)',
25000,
'일회용품',
0,
0,
0,
'../assets/goodsdetail/main/ly1.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'크린랲상품명 크린랩 지퍼백 고무장갑 크린백 위생장갑 호일 롤백',
4000,
'일회용품',
0,
0,
0,
'../assets/goodsdetail/main/ly2.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'에콜그린상품명 못난이 개별포장 요쿠르트빨대 35개입 특가판매 국산',
1000,
'일회용품',
0,
0,
0,
'../assets/goodsdetail/main/ly3.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명750cc 기본종이용기 1박스 1000개',
73000,
'일회용품',
0,
0,
0,
'../assets/goodsdetail/main/ly4.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명아이템톡 오븐렌지대선반 / 다용도 선반 / 국내생산',
24900,
'주방아이템',
0,
0,
0,
'../assets/goodsdetail/main/ji1.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명아이템톡 싱크대하부수납정리대 길이조절 국내생산',
16000,
'주방아이템',
0,
0,
0,
'../assets/goodsdetail/main/ji2.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명아이템톡 큐브 멀티 정리 선반 길이조절형 국내생산 1p',
12900,
'주방아이템',
0,
0,
0,
'../assets/goodsdetail/main/ji3.jpg',
0
);

INSERT INTO GOODS(GOODSSEQ, GOODSNAME, GOODSPRICE, GOODSCATEGORY, GOODSCOUNT, GOODSVIEW, GOODSRATING, GOODSCONTENT, GOODSREADCOUNT)
VALUES(
NEXTVAL('GOODSSEQ'),
'상품명아이템톡 오븐렌지대 선반 2단 / 국내생산',
32930,
'주방아이템',
0,
0,
0,
'../assets/goodsdetail/main/ji4.jpg',
0
);

DELETE FROM GOODS;

select * from goods;