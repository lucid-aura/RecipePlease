package com.recipe.a.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.PhotoDto;
import com.recipe.a.dto.RecipeDto;

@Mapper
@Repository
public interface RecipeDao {

	public int countRecipe(String bigCategory, String smallCategory);

	public int uploadRecipe(RecipeDto dto);
	
	
	
	public RecipeDto getOneRecipe(int recipeSeq);

	public int updateRecipeRating(int docsSeq);

	public List<RecipeDto> getRecommendRecipe(String category);
	
	public List<RecipeDto> getSmallRecommendRecipe(String category);
	
	public List<RecipeDto> getRecommendReadcountRecipe();
	
	public List<RecipeDto> getRecommendRatingRecipe();

	public int oneUpReadcount(int recipeSeq);

	public List<RecipeDto> searchRecipe(@Param("search")String search, @Param("big")ArrayList<String> big, @Param("small")ArrayList<String> small, @Param("sortOrder")String sortOrder);

	public int insertRecipe(RecipeDto newRecipe);
	
	public RecipeDto getRecipeInfo(int recipeSeq);
	// 내가 업로드한 레시피
	public RecipeDto myUploadedRecipe(int reicpeSeq);

	public int deleteRecipe(int recipeSeq);

	public int updateRecipe(RecipeDto recipeDto);

	public int countThumbnailByUrl(String url);

	public int updateRecipeThumbnailUrl(RecipeDto recipeDto);
	// 내가 좋아요한 레시피 시퀀스 가져오기
	public List<RecipeDto> getRecipeSeq(String memberId);
	
}
