package com.recipe.a.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.MembersDto;

@Mapper
@Repository
public interface MembersDao {

	public int countMembers();
	
	public int regist(MembersDto dto);	// 회원가입 - 노승현
}
