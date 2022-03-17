package com.recipe.a.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.a.service.GoodsService;
import com.recipe.a.service.PaymentService;


@RestController // @Controller + @ResponseBody -> Restful
public class PaymentController {
	
	@Autowired
	PaymentService service;
	
	@RequestMapping(value = "/countPayment", method = {RequestMethod.GET, RequestMethod.POST})
	public String countMembers() {
		System.out.println("PaymentController countPayment()");
		int res = service.countPayment();
		System.out.println(res);
		return "개수는: " + res;
	}
}
