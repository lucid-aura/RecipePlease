package com.recipe.a.controller;

import com.recipe.a.dto.PaymentDto;
import com.recipe.a.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class PaymentController {
	
	
	private final Logger logger = LoggerFactory.getLogger(PaymentController.class);
	
	private final PaymentService service;

	// 테스트모드 1
	@GetMapping("payment/testMode")
	public void testMode() {
		logger.info("테스트모드 접근 성공");
	}

	// 테스트모드 2
	@GetMapping("/payment/countTest")
	public String countTest() {
		logger.info("PaymentController testMode");
		int res = service.countPayment();
		if (res > 0) {
			return "bigger than 0";
		}
		return "0 or smaller than 0";
	}

	// 결제완료 후 구매내역을 테이블에 추가
	@PostMapping("/payment/addGoodsShoppingList")
	public String addGoodsShoppingList(PaymentDto dto) {
		logger.info("PaymentController addGoodsShoppingList()");
		int res = service.addGoodsShoppingList(dto);
		if (res > 0) {
			return "purchased";
		}
		return "not-purchased";
	}

	// 굿즈 환불
	@PostMapping("/payment/refundGoods")
	public String refundGoods(PaymentDto dto) {
		logger.info("PaymentController refundGoods()");
		boolean res = service.refundGoods(dto);
		if (res) {
			return "applied";
		}
		return "not-applied";
	}

	// 굿즈 반품
	@PostMapping("/payment/returnGoods")
	public String returnGoods(PaymentDto dto) {
		logger.info("PaymentController returnGoods()");

		return "";
	}

	// 결제내역 조회
	@GetMapping("/payment/goodsPurchaseList")
	public List<PaymentDto> goodsPurchaseList(PaymentDto dto) {
		logger.info("PaymentController goodsPurchaseList()");
		return service.goodsPurchaseList(dto);
	}
}
