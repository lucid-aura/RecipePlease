package com.recipe.a.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.PhotoDao;
import com.recipe.a.dao.RatingDao;
import com.recipe.a.dao.RecipeDao;
import com.recipe.a.dao.RecipeLikeDao;
import com.recipe.a.dto.RecipeDto;

@Service
@Transactional
public class RecipeService {

	@Autowired
	RecipeDao recipeDao;
	
	@Autowired
	RecipeLikeDao recipeLikeDao;
	
	@Autowired
	RatingDao ratingDao;
	
	@Autowired
	PhotoDao photoDao;
	
	public int countRecipe() {
		System.out.println("RecipeService");
		return recipeDao.countRecipe();
	}

	public int insertRecipe(RecipeDto newRecipe) {
		recipeDao.insertRecipe(newRecipe);
		return 0;
	}
}
