package com.recipe.a.dao;

import java.util.List;

import com.recipe.a.dto.MembersDto;
import com.recipe.a.dto.PhotoDto;
import com.recipe.a.dto.RecipeDto;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.MembersDto;

@Mapper
@Repository
public interface MembersDao {

	public int countMembers();
	
	// 아이디 체크
	public int idCheck(MembersDto dto);
	// 회원가입 
	public int regist(MembersDto dto);	// 회원가입 
	
	// 로그인
	public MembersDto getSalt(String memberId, String memberPwd);
	public MembersDto login(String memberPwd);
	
	//레시피 시퀀스 받아오기
	public List<RecipeDto> getRecipeSeq(String memberId);
	public List<RecipeDto> getRecipeInfo(List<RecipeDto> recipeSeqList);
	public List<PhotoDto> getThumbnail(List<RecipeDto> recipeSeqList);
	
}
