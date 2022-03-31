package com.recipe.a.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.RecipeLikeDto;

@Mapper
@Repository
public interface RecipeLikeDao {

	public int countRecipeLike();

	public int likeRecipe(RecipeLikeDto recipeLikeDto);
	
	public int unLikeRecipe(RecipeLikeDto recipeLikeDto);
}
