package com.recipe.a.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.RecipeDto;

@Mapper
@Repository
public interface RecipeDao {

	public int countRecipe();

	public void insertRecipe(RecipeDto newRecipe);
}
