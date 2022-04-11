package com.recipe.a.controller;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.recipe.a.dto.MembersDto;
import com.recipe.a.dto.MyFavoriteDto;
import com.recipe.a.dto.RecipeDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCrypt;

import com.recipe.a.dto.MembersDto;
import com.recipe.a.service.MembersService;
import com.recipe.a.service.RecipeLikeService;

@RestController // @Controller + @ResponseBody -> Restful
public class MembersController {
	
	@Autowired
	private MembersService memberService;
	
	@Autowired
	private RecipeLikeService recipeLikeService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
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
		String salt = BCrypt.gensalt(10);	// 임의의 솔트값 생성
		dto.setSalt(salt);	// 솔트값 Dto 에 담기
		dto.setMemberPwd(BCrypt.hashpw(dto.getMemberPwd(), salt));	//솔트값과 비밀번호 합쳐서 암호화후 Dto에 담기
		System.out.println("dto.getMember_pwd: " + dto.getMemberPwd() );
		
		boolean b = memberService.regist(dto);
		if (b) {
			return "yes";	// 회원가입 실패
		} else {
			return "no";	// 회원가입 성공
		}
		
	}
	
	//로그인
	@PostMapping("/login")
	public MembersDto login(String memberId, String memberPwd) {
		System.out.println("login");
		System.out.println("memberId: " + memberId + " " + "memberPwd: " + memberPwd);
		MembersDto result = memberService.login(memberId, memberPwd);
		System.out.println("result: " + result.toString());
		
		return result;
	}
	
	// 아이디 중복 체크
	//@RequestMapping(value = "/idCheck", method = RequestMethod.POST)
	@PostMapping("/idCheck")
	public String idCheck(MembersDto dto) {
		System.out.println("MemberController idCheck");
		
		boolean b = memberService.idCheck(dto);
		if(b) {
			return "yes";	// 중복
		}	
		return "no";		// 중복X
	}
	
	//내가 좋아하는 레시피
	@GetMapping("/myFavoriteRecipe")
	public List<MyFavoriteDto> myFavoriteRecipe(String memberId) {
		System.out.println("MemberController myFavoriteRecipe");
		System.out.println("memberId: " + memberId);
		List<MyFavoriteDto> result = memberService.myFavoriteRecipe(memberId);
		System.out.println(result.toString());
		
		return result;
	}
	
	//테스트용
	@RequestMapping(value = "/test1", method = {RequestMethod.GET})
	public List<RecipeDto> test1() {
		System.out.println("test");
		
		return memberService.test1();
	}
}
