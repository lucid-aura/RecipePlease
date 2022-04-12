package com.recipe.a.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.RecipeDto;

@Mapper
@Repository
public interface RecipeDao {

	public int countRecipe();

<<<<<<< Updated upstream
	public int insertRecipe(RecipeDto newRecipe);

=======
	public int uploadRecipe(RecipeDto dto);
	
	
	
>>>>>>> Stashed changes
	public RecipeDto getOneRecipe(int recipeSeq);

	public int updateRecipeRating(int docsSeq);

	public List<RecipeDto> getRecommendRecipe(String category);
	
	public List<RecipeDto> getRecommendReadcountRecipe();

	public int oneUpReadcount(int recipeSeq);

	public List<RecipeDto> searchRecipe(@Param("search")String search, @Param("big")ArrayList<String> big, @Param("small")ArrayList<String> small);
	
	// 내가 좋아하는 레시피 시퀀스
	public RecipeDto getRecipeInfo(int recipeSeq);
	// 내가 업로드한 레시피
	public RecipeDto myUploadedRecipe(int reicpeSeq);
	
}
