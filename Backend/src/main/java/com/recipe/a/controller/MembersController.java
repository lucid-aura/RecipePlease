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
	public MembersDto regist(MembersDto dto) {
		System.out.println("MembersController regist()");
		MembersDto result = memberService.regist(dto);
		System.out.println("result: " + result.toString());
		return result;
		
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
	
	// 내가 쓴 레시피 가져오기
	@RequestMapping(value = "/myUploadedRecipe", method = {RequestMethod.GET})
	public List<RecipeDto> myUploadedRecipe(String memberId) {
		System.out.println("MemberController myUploadedRecipe");
		System.out.println("memberId: " + memberId);
		
		List<RecipeDto> result = memberService.myUploadedRecipe(memberId);
		System.out.println(result.toString());
		
		return result;
	}
		
	
	//이메일 업데이트
	@RequestMapping(value = "/updateEmail", method = {RequestMethod.POST})
	public String updateEmail(String memberId, String memberEmail) {
		System.out.println("MemberController updateEmail");
		System.out.println("memberId: " + memberId + " memberEmail" + memberEmail);
		
		boolean b = memberService.updateEmail(memberId, memberEmail);
		
		if(b) {
			return "fail";
		}		
		
		return "success";
	}
	
	//닉네임 업데이트
	@RequestMapping(value = "/updateNickname", method = {RequestMethod.POST})
	public String updateNickname(String memberId, String memberNickname) {
		System.out.println("MemberController updateEmail");
		System.out.println("memberId: " + memberId + " memberEmail" + memberNickname);
		
		boolean b = memberService.updateNickname(memberId, memberNickname);
		
		if(b) {
			return "fail";
		}		
		return "success";
	}
	
	// 전화번호 업데이트
	@RequestMapping(value = "/updatePhone", method = {RequestMethod.POST})
	public String updatePhone(String memberId, String memberPhone) {
		System.out.println("MemberController updateEmail");
		System.out.println("memberId: " + memberId + " memberEmail: " + memberPhone);
		
		boolean b = memberService.updateNickname(memberId, memberPhone);
		
		if(b) {
			return "fail";
		}		
		return "success";
	}
	
	// 주소 업데이트
	@RequestMapping(value = "/updateAddr", method = {RequestMethod.POST})
	public String updateAddr(MembersDto dto) {
		System.out.println("MemberController updateAddr");
		System.out.println("MembersDto: " + dto.toString());
		
		boolean b = memberService.updateAddr(dto);
		System.out.println("updateAddr result: " +b);
		if(b) {
			return "fail";
		}		
		return "success";
	}
	
	
	
	//테스트용
	@RequestMapping(value = "/test1", method = {RequestMethod.GET})
	public List<RecipeDto> test1() {
		System.out.println("test");
		
		return memberService.test1();
	}
}
