package com.recipe.a.service;

import com.recipe.a.dto.PaymentDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.PaymentDao;
import com.recipe.a.dao.PaymentListDao;

import java.util.List;

@Service
@Transactional
@Slf4j
//@RequiredArgsConstructor
public class PaymentService {

	// 필드에 생성자를 직접 주입하여 사용
	private final PaymentDao paymentDao;

	public PaymentService(PaymentDao paymentDao) {
		this.paymentDao = paymentDao;
	}

	// 로거 사용
	private Logger logger = LoggerFactory.getLogger(PaymentService.class);

	// 카운트(테스트용)
	public int countPayment() {
		System.out.println("PaymentService");
		return paymentDao.countPayment();
	}

	// 결제 성공시 db에 구매품 추가
	public int addGoodsShoppingList(PaymentDto dto) {
		boolean b = paymentDao.addGoodsShoppingList(dto);
		return b ? 1 : 0;
	}

	// 환불시 db에 반품관련 컬럼 업데이트
	public boolean refundGoods(String memberId, int paymentSeq) {
		return paymentDao.refundGoods(memberId, paymentSeq);
	}

	// 구매 목록
	public List<PaymentDto> goodsPurchaseList(String memberId) {
		
		List<PaymentDto> testList = paymentDao.goodsPurchaseList(memberId);
		logger.info(""+testList);
		return testList;
		
	}

	// 구매목록 디테일
	public PaymentDto getGoodsPurchaseDetail(int paymentSeq) {
		return paymentDao.getGoodsPurchaseDetail(paymentSeq);
	}

	// 코인 충전
	public boolean chargeCoin(PaymentDto dto) {
		return paymentDao.chargeCoin(dto);
	}
}

