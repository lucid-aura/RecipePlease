package com.recipe.a.service;

import com.recipe.a.dto.MembersDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.MembersDao;

@Service
@Transactional
public class MembersService {

	private MembersDao dao;

	public MembersService(MembersDao dao) {
		this.dao = dao;
	}

	public int countMembers() {
		System.out.println("MembersService");
		return dao.countMembers();
	}

	public MembersDto login(String memberId, String memberPwd) {
		return dao.login(memberId, memberPwd);
	}
}
