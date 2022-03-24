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
import com.recipe.a.dto.RatingDto;
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

	public List<PhotoDto> getPhoto(PhotoDto photoDto) {
		List<PhotoDto> dtos = photoDao.getPhoto(photoDto);
		
		System.out.println("PhotoDto photoDto - " + dtos.size());
		return dtos;
		// return photoDao.getPhoto(photoDto);
		
	}

	public int countPhoto() {
		return photoDao.countPhoto();
	}
	
	public List<Integer> test() {
		return photoDao.test();
	}

	public RecipeDto getOneRecipe(int recipeSeq) {
		return recipeDao.getOneRecipe(recipeSeq);
	}

	public PhotoDto getThumbnailPhoto(PhotoDto photoDto) {
		return photoDao.getThumbnailPhoto(photoDto);
	}

	public List<RatingDto> getAllRatingsBySeq(int docsSeq) {
		return ratingDao.getAllRatingsBySeq(docsSeq);
	}

	public int writeComment(RatingDto ratingDto) {
		ratingDao.writeComment(ratingDto);
		return recipeDao.updateRecipeRating(ratingDto.getDocsSeq());
	}
}
