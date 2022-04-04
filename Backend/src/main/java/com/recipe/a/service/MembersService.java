package com.recipe.a.service;

import com.recipe.a.dto.MembersDto;
import com.recipe.a.dto.PhotoDto;
import com.recipe.a.dto.RecipeDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCrypt;

import com.recipe.a.dao.MembersDao;
import com.recipe.a.dto.MembersDto;

@Service
@Transactional
public class MembersService {
	
	static BCrypt bcr;
	
	private MembersDao dao;

	public MembersService(MembersDao dao) {
		this.dao = dao;
	}

	public int countMembers() {
		System.out.println("MembersService");
		return dao.countMembers();
	}
	
	// 아이디 중복
	public boolean idCheck(MembersDto dto) {
		int n = dao.idCheck(dto);
		
		return n>0 ? true:false;
	}
	
	// 회원가입 - 노승현
	public boolean regist(MembersDto dto) {	
		int b = dao.idCheck(dto);
		
		if(b == 1) {
			return true;
		} else {
			int n = dao.regist(dto);
			
			return n>0? true:false;
		}
	}
	
	// 로그인
	public MembersDto login(String memberId, String memberPwd) {
		
		MembersDto salt = dao.getSalt(memberId, memberPwd);
		System.out.println("memberService getSalt: " + salt.getSalt()+ " memberPwd: " + memberPwd);
		
		String encodedPassword = bcr.hashpw(memberPwd, salt.getSalt());
		System.out.println("encodedPassword: " + encodedPassword);
		
		return dao.login(encodedPassword);
	}
	
	//내가 좋아하는 레시피
	public Map<String,Object> myFavoriteRecipe(String memberId) {
		
		List<RecipeDto> recipeSeqList = dao.getRecipeSeq(memberId);
		List<RecipeDto> recipeInfo = dao.getRecipeInfo(recipeSeqList);
		
		List<String> recipeTitleList = new ArrayList<String>();
		List<Integer> recipeReadCount = new ArrayList<Integer>();
		List<Float> recipeRating = new ArrayList<Float>();
		
		for(RecipeDto recipe : recipeInfo) {
			recipeTitleList.add(recipe.getRecipeTitle());
			recipeReadCount.add(recipe.getRecipeReadcount());
			recipeRating.add(recipe.getRecipeRating());
		}
		
		List<PhotoDto> thumbnails = dao.getThumbnail(recipeSeqList);
		
		
		
		
	}
}
