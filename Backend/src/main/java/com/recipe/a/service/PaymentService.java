package com.recipe.a.service;

import com.recipe.a.dto.PaymentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.PaymentDao;
import com.recipe.a.dao.PaymentListDao;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentService {

	private final PaymentDao paymentDao;
	private final PaymentListDao paymentListDao;
	
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

	public List<PaymentDto> goodsPurchaseList(PaymentDto dto) {
		return paymentDao.goodsPurchaseList(dto);
	}
}
