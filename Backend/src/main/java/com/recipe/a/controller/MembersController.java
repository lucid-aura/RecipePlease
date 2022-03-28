package com.recipe.a.controller;

import com.recipe.a.dto.MembersDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.a.service.MembersService;
import com.recipe.a.service.RecipeLikeService;

@RestController // @Controller + @ResponseBody -> Restful
public class MembersController {
	
	private MembersService memberService;
	private RecipeLikeService recipeLikeService;

	public MembersController(MembersService memberService) {
		this.memberService = memberService;
	}

	@RequestMapping(value = "/countMembers", method = {RequestMethod.GET, RequestMethod.POST})
	public String countMembers() {
		System.out.println("MembersController countMembers()");
		int res = memberService.countMembers();
		System.out.println(res);
		return "개수는: " + res;
	}

	@PostMapping("/login")
	public MembersDto login(String memberId, String memberPwd) {
		return memberService.login(memberId, memberPwd);
	}
}
