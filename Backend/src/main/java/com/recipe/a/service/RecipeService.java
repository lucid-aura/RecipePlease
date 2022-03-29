package com.recipe.a.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.PhotoDao;
import com.recipe.a.dao.RatingDao;
import com.recipe.a.dao.RecipeDao;
import com.recipe.a.dao.RecipeLikeDao;
import com.recipe.a.dto.PhotoDto;
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

	public int uploadRecipe(RecipeDto dto) {
		return recipeDao.uploadRecipe(dto);
	}
	
	public boolean uploadRecipeImg(PhotoDto dto) {
		int p = recipeDao.uploadRecipeImg(dto);
		return p>0?true:false;
	}

	
//	public List<PhotoDto> getPhoto(PhotoDto photoDto) {
//		List<PhotoDto> dtos = photoDao.getPhoto(photoDto);
//		
//		System.out.println("PhotoDto photoDto - " + dtos.size());
//		return dtos;
//		// return photoDao.getPhoto(photoDto);
//		
//	}
	
	
	public int countPhoto() {
		return photoDao.countPhoto();
	}
	
	public List<Integer> test() {
		return photoDao.test();
	}

	public RecipeDto getOneRecipe(int recipeSeq) {
		return recipeDao.getOneRecipe(recipeSeq);
	}
}
