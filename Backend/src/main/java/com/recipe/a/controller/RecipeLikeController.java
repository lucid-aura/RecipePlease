package com.recipe.a.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.a.service.RecipeLikeService;

@RestController // @Controller + @ResponseBody -> Restful
public class RecipeLikeController {
	
	@Autowired
	RecipeLikeService service;
	
	@RequestMapping(value = "/countRecipeLike", method = {RequestMethod.GET, RequestMethod.POST})
	public String countRecipeLike() {
		System.out.println("RecipeLikeController countRecipeLike()");
		int res = service.countRecipeLike();
		System.out.println(res);
		return "개수는: " + res;
	}
}
