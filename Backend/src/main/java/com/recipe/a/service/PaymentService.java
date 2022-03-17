package com.recipe.a.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.PaymentDao;
import com.recipe.a.dao.PaymentListDao;

@Service
@Transactional
public class PaymentService {

	@Autowired
	PaymentDao paymentDao;
	
	@Autowired
	PaymentListDao paymentListDao;
	
	public int countPayment() {
		System.out.println("PaymentService");
		return paymentDao.countPayment();
	}
}
