package com.recipe.a.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.recipe.a.dao.CoinTransactionDao;
import com.recipe.a.dao.PhotoDao;
import com.recipe.a.dao.RatingDao;
import com.recipe.a.dao.RecipeDao;
import com.recipe.a.dao.RecipeLikeDao;
import com.recipe.a.dto.CoinTransactionDto;
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

	@Autowired CoinTransactionDao coinTransactionDao;
	
	public int countRecipe() {
		System.out.println("RecipeService");
		return recipeDao.countRecipe();
	}

	public int uploadRecipe(RecipeDto dto) {
		return recipeDao.uploadRecipe(dto);
	}
<<<<<<< HEAD
	
	public boolean uploadRecipeImg(PhotoDto dto) {
		int p = recipeDao.uploadRecipeImg(dto);
		return p>0?true:false;
=======

	public List<PhotoDto> getPhoto(PhotoDto photoDto) {
		List<PhotoDto> dtos = photoDao.getPhoto(photoDto);

		System.out.println("PhotoDto photoDto - " + dtos.size());
		return dtos;
		// return photoDao.getPhoto(photoDto);

>>>>>>> main
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

//	public int purchaseRecipeCheck(String memberId, int recipeSeq) {
//		CoinTransactionDto coinDto = new CoinTransactionDto(memberId, recipeSeq);
//		return coinTransactionDao.purchaseRecipeCheck(coinDto);
//	}

	public Map<String, Object> getRecommendRecipe(String category) {
		List<RecipeDto> recipes;
		if (category.equals("readcount")) {
			recipes = recipeDao.getRecommendReadcountRecipe();
		} else {
			recipes = recipeDao.getRecommendRecipe(category);
		}
		List<Integer> recipeSeqList = new ArrayList<Integer>();
		List<String> titleList = new ArrayList<String>();
		List<String> videoList = new ArrayList<String>();
		List<Integer> recipePrice = new ArrayList<Integer>();
		List<Float> recipeRatingList = new ArrayList<Float>();
		List<String> thumbnailPhotoList = new ArrayList<String>();
		List<Integer> readcountList = new ArrayList<Integer>();

		for (RecipeDto recipe : recipes) {
			recipeSeqList.add(recipe.getRecipeSeq());
			titleList.add(recipe.getRecipeTitle());
			videoList.add(recipe.getRecipeVideoUrl());
			recipePrice.add(recipe.getRecipePrice());
			recipeRatingList.add(recipe.getRecipeRating());
			readcountList.add(recipe.getRecipeReadcount());
		}
		List<PhotoDto> thumbnails = photoDao.getRecommendThumnailPhoto(recipeSeqList);

		for (int seq : recipeSeqList) {
			for (PhotoDto thumbnail : thumbnails) {
				if (seq == thumbnail.getDocsSeq()) {
					thumbnailPhotoList.add(thumbnail.getPhotoUrl());
					break;
				}
			}
		}

		Map<String, Object> res = new HashMap<String, Object>();
		res.put("recipeSeq", recipeSeqList);
		res.put("title", titleList);
		res.put("videoUrl", videoList);
		res.put("recipeRating", recipeRatingList);
		res.put("recipePrice", recipePrice);
		res.put("thumbnailPhoto", thumbnailPhotoList);
		res.put("readcount", readcountList);

		return res;
	}

	public int oneUpReadcount(int recipeSeq) {
		return recipeDao.oneUpReadcount(recipeSeq);

	}

	public Map<String, Object> searchRecipe(String search, ArrayList<String> big, ArrayList<String> small) {
		Map<String, Object> res = new HashMap<String, Object>();
		ArrayList<RecipeDto> recipes = (ArrayList<RecipeDto>) recipeDao.searchRecipe(search, big, small);
		
		List<Integer> recipeSeqList = new ArrayList<Integer>();
		
		for (RecipeDto recipe : recipes) {
			recipeSeqList.add(recipe.getRecipeSeq());
		}
		
		List<PhotoDto> thumbnails = photoDao.getRecommendThumnailPhoto(recipeSeqList);
		
		res.put("recipes", recipeDao.searchRecipe(search, big, small));
		res.put("thumbnails", thumbnails);
		return res;
		
	}

}
