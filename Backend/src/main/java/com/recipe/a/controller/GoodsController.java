package com.recipe.a.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.a.dto.GoodsDto;
import com.recipe.a.dto.RatingDto;
import com.recipe.a.service.GoodsService;


@RestController // @Controller + @ResponseBody -> Restful
public class GoodsController {
	
	@Autowired
	GoodsService goodsService;
	
	@RequestMapping(value = "/countGoods", method = {RequestMethod.GET, RequestMethod.POST})
	public String countMembers() {
		System.out.println("GoodsController countGoods()");
		return "asd";
	}
	
	@RequestMapping(value = "/goodsData", method = {RequestMethod.GET, RequestMethod.POST})
	public GoodsDto goodsData(int goodsSeq) {
		System.out.println("GoodsController goodsData()");
		return goodsService.goodsData(goodsSeq);
	}
	
	@RequestMapping(value = "/getGoodsByCategory", method = {RequestMethod.GET, RequestMethod.POST})
	public List<GoodsDto> getGoodsByCategory(String category) {
		System.out.println("GoodsController getGoodsByCategory()");
		return goodsService.getGoodsByCategory(category);
	}
	
	@RequestMapping(value = "/getGoodsRatingsBySeq", method = {RequestMethod.GET, RequestMethod.POST})
	public List<RatingDto> getGoodsRatingsBySeq(int docsSeq) {
		System.out.println("GoodsController getGoodsRatingsBySeq()");
		return goodsService.getGoodsRatingsBySeq(docsSeq);
	}
	
	@RequestMapping(value = "/writeGoodsComment", method = {RequestMethod.POST})
	public List<RatingDto> writeGoodsComment(RatingDto ratingDto) {
		System.out.println("RecipeController writeGoodsComment()");
		System.out.println(ratingDto.toString());
		
		goodsService.writeGoodsComment(ratingDto);
		return goodsService.getGoodsRatingsBySeq(ratingDto.getDocsSeq());
		
		// return recipeService.getAllRatingsBySeq(docsSeq);
		//return Arrays.asList(recipeService.getOneRecipe(recipeSeq).getRecipeGoodsTag().split(","));
	}	
}
