package com.recipe.a.dao;

import java.util.List;

import com.recipe.a.dto.MembersDto;
import com.recipe.a.dto.MyFavoriteDto;
import com.recipe.a.dto.PhotoDto;
import com.recipe.a.dto.RecipeDto;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.MembersDto;

@Mapper
@Repository
public interface MembersDao {

	
	// 아이디 체크
	public int idCheck(MembersDto dto);
	// 회원가입 
	public int regist(MembersDto dto);	// 회원가입 
	// 아이디 체크후 Salt반환
	public String idCheckGetSalt(MembersDto dto);
	
	// 로그인
	public MembersDto getSalt(String memberId, String memberPwd);
	public MembersDto login(String memberPwd);
	
	//레시피 시퀀스 받아오기
	public List<RecipeDto> test1();
	
	// 이메일 수정
	public int updateEmail(String memberId, String memberEmail);
	// 닉네임 수정
	public int updateNickname(String memberId, String memberNickname);
	// 전화번호 수정
	public int updatePhone(String memberId, String memberPhone);
	// 주소 수정
	public int updateAddr(MembersDto dto);

	/****************** 웹 업데이트를 위한 Dao 기능 *********************/
	public int updatePersonalInfo(MembersDto dto);

	public int updatePaymentInfo(MembersDto dto);
	
	public MembersDto updateLoggedInfo(String memberId);
}
