package com.recipe.a.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.RecipeLikeDao;
import com.recipe.a.dto.RecipeLikeDto;

@Service
@Transactional
public class RecipeLikeService {

	@Autowired
	RecipeLikeDao dao;
	
	public int countRecipeLike() {
		System.out.println("countRecipeLike");
		return dao.countRecipeLike();
	}

	public int likeRecipe(RecipeLikeDto recipeLikeDto) {
		return dao.likeRecipe(recipeLikeDto);
	}
	
	public int unLikeRecipe(RecipeLikeDto recipeLikeDto) {
		return dao.unLikeRecipe(recipeLikeDto);
	}
}
