package com.recipe.a.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.a.service.RecipeService;

@RestController // @Controller + @ResponseBody -> Restful
public class RecipeController {
	
	@Autowired
	RecipeService service;
	
	
	@RequestMapping(value = "/main", method = {RequestMethod.GET, RequestMethod.POST})
	public String main() {
		System.out.println("RecipeController main()");
		
		return "Hello World!";
	}
	
	
	@RequestMapping(value = "/countRecipe", method = {RequestMethod.GET, RequestMethod.POST})
	public String countRecipe() {
		System.out.println("RecipeController countRecipe()");
		int res = service.countRecipe();
		System.out.println(res);
		return "개수는: " + res;
	}
}
