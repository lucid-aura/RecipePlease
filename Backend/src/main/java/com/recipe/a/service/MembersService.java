package com.recipe.a.service;

import com.recipe.a.dto.MembersDto;

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
}
