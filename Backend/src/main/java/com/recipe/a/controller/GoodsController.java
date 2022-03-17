package com.recipe.a.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.a.service.GoodsService;


@RestController // @Controller + @ResponseBody -> Restful
public class GoodsController {
	
	@Autowired
	GoodsService goodsService;
	
	@RequestMapping(value = "/countGoods", method = {RequestMethod.GET, RequestMethod.POST})
	public String countMembers() {
		System.out.println("GoodsController countGoods()");
		int res = goodsService.countGoods();
		System.out.println(res);
		return "개수는: " + res;
	}
}
