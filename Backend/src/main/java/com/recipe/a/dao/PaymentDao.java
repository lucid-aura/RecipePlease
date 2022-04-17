package com.recipe.a.dao;

import java.util.List;

import com.recipe.a.dto.PaymentDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface PaymentDao {

	// 테스터
	int countPayment();

	// 굿즈 결제 완료 시 db에 추가
	int addGoodsShoppingList(PaymentDto dto);

	// 환불요청 시 paymentDel 업데이트
	boolean refundGoods(String memberId, int paymentSeq);

	// 구매 목록 리스트 반환
	List<PaymentDto> goodsPurchaseList(String memberId);

	// 구매 상세내역 반환
	PaymentDto getGoodsPurchaseDetail(int paymentSeq);

	// 코인 충전(구매)
	boolean chargeCoin(PaymentDto dto);
}
