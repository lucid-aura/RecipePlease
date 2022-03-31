package com.recipe.a.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.a.dto.PhotoDto;
import com.recipe.a.dto.RatingDto;
import com.recipe.a.dto.RecipeDto;
import com.recipe.a.dto.RecipeLikeDto;
import com.recipe.a.service.RecipeLikeService;
import com.recipe.a.service.RecipeService;

@RestController // @Controller + @ResponseBody -> Restful
public class RecipeController {
	
	@Autowired
	RecipeService recipeService;
	
	@Autowired
	RecipeLikeService recipeLikeService;
	
	@RequestMapping(value = "/main", method = {RequestMethod.GET, RequestMethod.POST})
	public String main() {
		System.out.println("RecipeController main()");
		
		return "Hello World!";
	}
	
	
	@RequestMapping(value = "/countRecipe", method = {RequestMethod.GET, RequestMethod.POST})
	public String countRecipe() {
		System.out.println("RecipeController countRecipe()");
		int res = recipeService.countRecipe();
		System.out.println(res);
		return "개수는: " + res;
	}
	
	
	@RequestMapping(value = "/countPhoto", method = {RequestMethod.GET, RequestMethod.POST})
	public String countPhoto() {
		System.out.println("RecipeController countPhoto()");
		int res = recipeService.countPhoto();
		System.out.println(res);
		return "개수는: " + res;
	}
	
	
	@RequestMapping(value ="/insertRecipe", method = {RequestMethod.GET, RequestMethod.POST})
	public String insertRecipe() {
		System.out.println("RecipeController insertRecipe()");
		RecipeDto temp = new RecipeDto("test", "title", "content", "big", "small", "url", "tag", 0);

		int res = recipeService.insertRecipe(temp);
		System.out.println(res);
		return "개수는: " + res;
	}
	
	@RequestMapping(value = "/getOneRecipe", method = {RequestMethod.GET})
	public RecipeDto getOneRecipe(int recipeSeq) {
		System.out.println("RecipeController getOneRecipe()");
		recipeService.oneUpReadcount(recipeSeq);
		return recipeService.getOneRecipe(recipeSeq);
		//return recipeService.getPhoto(photoDto);
	}
	
	
	@RequestMapping(value = "/getPhoto", method = {RequestMethod.GET})
	public List<PhotoDto> getPhoto(int docsSeq, String photoCategory) {
		System.out.println("RecipeController getPhoto()");
		PhotoDto photoDto = new PhotoDto();
		
		photoDto.setPhotoSeq(0);
		photoDto.setDocsSeq(docsSeq);
		photoDto.setPhotoCategory(photoCategory);

		return recipeService.getPhoto(photoDto);
	}
	
	
	@RequestMapping(value = "/getThumbnailPhoto", method = {RequestMethod.GET})
	public PhotoDto getThumbnailPhoto(int docsSeq, String photoCategory) {
		System.out.println("RecipeController getThumbnailPhoto()");
		PhotoDto photoDto = new PhotoDto();
		
		photoDto.setPhotoSeq(0);
		photoDto.setDocsSeq(docsSeq);
		photoDto.setPhotoCategory(photoCategory);

		return recipeService.getThumbnailPhoto(photoDto);
	}
	
	@RequestMapping(value = "/getRecipeTag", method = {RequestMethod.GET})
	public List<String> getRecipeTag(int recipeSeq) {
		System.out.println("RecipeController getRecipeTag()");
		
		return Arrays.asList(recipeService.getOneRecipe(recipeSeq).getRecipeGoodsTag().split(","));
	}
	
	@RequestMapping(value = "/getAllRatingsBySeq", method = {RequestMethod.GET})
	public List<RatingDto> getRatings(int docsSeq) {
		System.out.println("RecipeController getAllRatingsBySeq()");
		return recipeService.getAllRatingsBySeq(docsSeq);
		//return Arrays.asList(recipeService.getOneRecipe(recipeSeq).getRecipeGoodsTag().split(","));
	}
	
	@RequestMapping(value = "/writeComment", method = {RequestMethod.POST})
	public List<RatingDto> writeComment(RatingDto ratingDto) {
		System.out.println("RecipeController writeComment()");
		System.out.println(ratingDto.toString());
		
		recipeService.writeComment(ratingDto);
		return recipeService.getAllRatingsBySeq(ratingDto.getDocsSeq());
		
		// return recipeService.getAllRatingsBySeq(docsSeq);
		//return Arrays.asList(recipeService.getOneRecipe(recipeSeq).getRecipeGoodsTag().split(","));
	}	
	
	@RequestMapping(value = "/purchaseRecipeCheck", method = {RequestMethod.GET})
	public int purchaseRecipeCheck(String memberId, int recipeSeq) {
		System.out.println(memberId + " " + recipeSeq);
		System.out.println("RecipeController purchaseRecipeCheck()");

		return recipeService.purchaseRecipeCheck(memberId, recipeSeq);
		//return recipeService.getPhoto(photoDto);
	}

	@RequestMapping(value = "/getRecommendRecipe", method = {RequestMethod.GET})
	public Map<String, Object> getRecommendRecipe(String category) {
		
		System.out.println("RecipeController getRecommendRecipe() " + category);

		return recipeService.getRecommendRecipe(category);
		//return recipeService.getPhoto(photoDto);
	}
	
	
	@RequestMapping(value = "/likeRecipe", method = {RequestMethod.GET})
	public int likeRecipe(RecipeLikeDto recipeLikeDto) {
		recipeLikeDto.setLikeseq(0);
		System.out.println("RecipeController likeRecipe()");
		return recipeLikeService.likeRecipe(recipeLikeDto);
	}
	
	@RequestMapping(value = "/unlikeRecipe", method = {RequestMethod.GET})
	public int unlikeRecipe(RecipeLikeDto recipeLikeDto) {
		System.out.println("RecipeController unlikeRecipe()");
		return recipeLikeService.unLikeRecipe(recipeLikeDto);

	}
	
	@RequestMapping(value = "/test", method = {RequestMethod.GET})
	public List<Integer> test(int docs_seq, String photo_category) {
		System.out.println(docs_seq + " " + photo_category);
		
		System.out.println("RecipeController test()");
		
		List<Integer> dtos = recipeService.test();
		System.out.println(dtos.get(0));
		
		
		return dtos;
		//return recipeService.getPhoto(photoDto);
	}
}
