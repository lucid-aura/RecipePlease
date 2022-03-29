package com.recipe.a.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.a.dto.PhotoDto;
import com.recipe.a.dto.RecipeDto;
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
	
	
	@RequestMapping(value = "/uploadRecipe", method = {RequestMethod.GET, RequestMethod.POST})
	public int countRecipe(RecipeDto dto) {
		System.out.println("RecipeController uploadRecipe()");
		System.out.println(dto.toString());
		System.out.println(dto.getRecipeSeq());
		recipeService.uploadRecipe(dto);
		
		return dto.getRecipeSeq();
	}
	
	@RequestMapping(value = "/getOneRecipe", method = {RequestMethod.GET})
	public RecipeDto getOneRecipe(int recipeSeq) {
		System.out.println("RecipeController getOneRecipe()");
			
		return recipeService.getOneRecipe(recipeSeq);
		//return recipeService.getPhoto(photoDto);
	}
	
	
	@RequestMapping(value = "/uploadRecipeImg", method = {RequestMethod.GET, RequestMethod.POST})
	public String uploadRecipeImg(PhotoDto dto) {
		System.out.println("RecipeController uploadRecipeImg()");
		System.out.println(dto.toString());
		
		boolean b = recipeService.uploadRecipeImg(dto);
		if(b) {
			return "YES";
		}
		return "NO";
	}
	
	
//	@RequestMapping(value = "/getPhoto", method = {RequestMethod.GET})
//	public List<PhotoDto> getPhoto(int docsSeq, String photoCategory) {
//		PhotoDto photoDto = new PhotoDto();
//		
//		photoDto.setPhotoSeq(0);
//		photoDto.setDocsSeq(docsSeq);
//		photoDto.setPhotoCategory(photoCategory);
//
//		return recipeService.getPhoto(photoDto);
//	}
//	
	
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