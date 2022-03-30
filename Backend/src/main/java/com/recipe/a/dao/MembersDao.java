package com.recipe.a.dao;

import java.util.List;

import com.recipe.a.dto.MembersDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.MembersDto;

@Mapper
@Repository
public interface MembersDao {

	public int countMembers();
	
	// 아이디 체크
	public int idCheck(MembersDto dto);
	// 회원가입 - 노승현
	public int regist(MembersDto dto);	// 회원가입 - 노승현
	

	MembersDto login(String memberId, String memberPwd);
}
