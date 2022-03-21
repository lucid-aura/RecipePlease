package com.recipe.a.controller;

import com.recipe.a.dto.PaymentDto;
import com.recipe.a.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class PaymentController {
	
	
	private final Logger logger = LoggerFactory.getLogger(PaymentController.class);
	
	@Autowired
	PaymentService service;

	@PostMapping("/addGoodsShoppingList")
	public String addGoodsShoppingList(PaymentDto dto) {
		logger.info("PaymentController addGoodsShoopingList()");
		int res = service.addGoodsShoppingList(dto);
		if (res > 0) {
			return "추가됨";
		}
		return "추가되지 않음";
	}
}
