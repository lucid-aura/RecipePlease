package com.recipe.a.dao;

import java.util.List;

import com.recipe.a.dto.MembersDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MembersDao {

	int countMembers();

	MembersDto login(String memberId, String memberPwd);
}
