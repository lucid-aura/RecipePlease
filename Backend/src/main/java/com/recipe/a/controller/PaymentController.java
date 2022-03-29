package com.recipe.a.controller;

import com.recipe.a.dto.PaymentDto;
import com.recipe.a.service.PaymentService;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/payment")
public class PaymentController {
	
	private final PaymentService service;

	private final Logger logger = Logger.getLogger(PaymentController.class);

	public PaymentController(PaymentService service) {
		this.service = service;
	}

	// 테스트모드 1
	@GetMapping("/testMode")
	public void testMode() {
		logger.info("테스트모드 접근 성공");
	}

	// 테스트모드 2
	@GetMapping("/countTest")
	public String countTest() {
		logger.info("PaymentController testMode");
		int res = service.countPayment();
		if (res > 0) {
			return "bigger than 0";
		}
		return "0 or smaller than 0";
	}

	// 결제완료 후 구매내역을 테이블에 추가
	@PostMapping("/addGoodsShoppingList")
	public String addGoodsShoppingList(PaymentDto dto) {
		logger.info("PaymentController addGoodsShoppingList()");
		int res = service.addGoodsShoppingList(dto);
		if (res > 0) {
			return "purchased";
		}
		return "not-purchased";
	}

	// 굿즈 반품
	@PostMapping("/returnGoods")
	public String returnGoods(String memberId, int paymentSeq) {
		logger.info("PaymentController returnGoods()");
		boolean b = service.refundGoods(memberId, paymentSeq);
		return b ? "환불완료" : "환불실패";
	}

	// 결제내역 조회
	@GetMapping("/goodsPurchaseList")
	public List<PaymentDto> goodsPurchaseList(String memberId) {
		logger.info("PaymentController goodsPurchaseList()");
		logger.info("memberId: " + memberId);
		return service.goodsPurchaseList(memberId);
	}
	
	// 결제 내역 상세
	@GetMapping("/getPurchaseDetail")
	public PaymentDto getGoodsPurchaseDetail(int paymentSeq) {
		logger.info("PaymentController getGoodsPurchaseDetail()");
		
		return service.getGoodsPurchaseDetail(paymentSeq);
	}
	
	// 코인 구매
	@PostMapping("/chargeCoin")
	public int chargeCoin(PaymentDto dto) {
		logger.info("PaymentController chargeCoin()");
		boolean resp = service.chargeCoin(dto);
		if (resp) {
			return 200;
		}
		return 500;
	}
}

