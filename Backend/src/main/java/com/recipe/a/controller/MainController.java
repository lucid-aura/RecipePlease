package com.recipe.a.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController // @Controller + @ResponseBody -> Restful
public class MainController {
	@RequestMapping(value = "/main", method = {RequestMethod.GET, RequestMethod.POST})
	public String Hello() {
		System.out.println("MainController main()");
		return "Hello World!";
	}
}
