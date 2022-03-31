package com.recipe.a.service;

import com.recipe.a.dto.MembersDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.MembersDao;
import com.recipe.a.dto.MembersDto;

@Service
@Transactional
public class MembersService {

	@Autowired
	private MembersDao dao;

	public MembersService(MembersDao dao) {
		this.dao = dao;
	}

	public int countMembers() {
		System.out.println("MembersService");
		return dao.countMembers();
	}
	
	// 회원가입 - 노승현
	public boolean regist(MembersDto dto) {	
		int b = dao.idCheck(dto);
		
		if(b == 1) {
			return false;
		} else {
			int n = dao.regist(dto);
			
			return n>0? true:false;
		}
	}

	public MembersDto login(String memberId, String memberPwd) {
		return dao.login(memberId, memberPwd);
	}
}
