package com.recipe.a.controller;

import java.lang.reflect.Member;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.recipe.a.dto.MembersDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.a.dto.MembersDto;
import com.recipe.a.service.MembersService;
import com.recipe.a.service.RecipeLikeService;

@RestController // @Controller + @ResponseBody -> Restful
public class MembersController {
	
	@Autowired
	MembersService memberService;
	
	@Autowired
	RecipeLikeService recipeLikeService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

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
	
	//회원가입 - 노승현
	@RequestMapping(value = "/regist", method = {RequestMethod.GET, RequestMethod.POST})
	public String regist(MembersDto dto) {
		System.out.println("MembersController regist()");
		Random rnd = new Random();
		String str[] = new String[4];
		String salt = "";
		for (int i = 0; i < str.length; i++) {
			str[i] = String.valueOf((char) ((int) (rnd.nextInt(26)) + 97));
			salt += str[i];
		}
		dto.setSalt(salt);
		String secretNum = dto.getMemberPwd() + salt;
		System.out.println("secretNum: " + secretNum);

		String encodedPassword = passwordEncoder.encode(secretNum);
		dto.setMemberPwd(encodedPassword);
		System.out.println("dto.getMember_pwd: " + dto.getMemberPwd());

		boolean b = memberService.regist(dto);

		if (b) {
			return "yes";
		} else {
			return "no";
		}
	}

	@PostMapping("/login")
	public MembersDto login(String memberId, String memberPwd) {
		return memberService.login(memberId, memberPwd);
	}
}
