package com.recipe.a.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.MembersDao;
import com.recipe.a.dto.MembersDto;

@Service
@Transactional
public class MembersService {

	@Autowired
	MembersDao dao;
	
	public int countMembers() {
		System.out.println("MembersService");
		return dao.countMembers();
	}
	
	public boolean regist(MembersDto dto) {	// 회원가입 - 노승현
		
		int n = dao.regist(dto);
		
		return n>0? true:false;
		
	}
}
