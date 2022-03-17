package com.recipe.a.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.MembersDao;

@Service
@Transactional
public class MembersService {

	@Autowired
	MembersDao dao;
	public int countMembers() {
		System.out.println("MembersService");
		return dao.countMembers();
	}
}
