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

	private final PaymentDao paymentDao;
	
	
	
	
	public PaymentService(PaymentDao paymentDao) {

		this.paymentDao = paymentDao;
	
	}

	private Logger logger = LoggerFactory.getLogger(PaymentService.class);
	
	public int countPayment() {
		System.out.println("PaymentService");
		return paymentDao.countPayment();
	}

	public int addGoodsShoppingList(PaymentDto dto) {
		boolean b = paymentDao.addGoodsShoppingList(dto);
		return b ? 1 : 0;
	}

	public boolean refundGoods(PaymentDto dto) {
		return paymentDao.refundGoods(dto);
	}

	public List<PaymentDto> goodsPurchaseList(String memberId) {
		
		List<PaymentDto> testList = paymentDao.goodsPurchaseList(memberId);
		logger.info(""+testList);
		return testList;
		
	}
	
	public boolean chargeCoin(PaymentDto dto) {
		return paymentDao.chargeCoin(dto);
	}
	
	public PaymentDto getGoodsPurchaseDetail(int paymentSeq) {
		return paymentDao.getGoodsPurchaseDetail(paymentSeq);
	}
}

