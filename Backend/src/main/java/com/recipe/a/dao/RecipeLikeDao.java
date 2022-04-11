package com.recipe.a.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.RecipeDto;
import com.recipe.a.dto.RecipeLikeDto;

@Mapper
@Repository
public interface RecipeLikeDao {

	public int countRecipeLike();

	public int likeRecipe(RecipeLikeDto recipeLikeDto);
	
	public int unLikeRecipe(RecipeLikeDto recipeLikeDto);
	
	// 내가 좋아요한 레시피 시퀀스 가져오기
	public List<RecipeDto> getRecipeSeq(String memberId);
}
