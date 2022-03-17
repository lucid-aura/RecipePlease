package com.recipe.a.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.RecipeLikeDao;

@Service
@Transactional
public class RecipeLikeService {

	@Autowired
	RecipeLikeDao dao;
	
	public int countRecipeLike() {
		System.out.println("countRecipeLike");
		return dao.countRecipeLike();
	}
}
