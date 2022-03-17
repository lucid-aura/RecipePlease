package com.recipe.a.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.RecipeDao;

@Service
@Transactional
public class RecipeService {

	@Autowired
	RecipeDao dao;
	public int countRecipe() {
		System.out.println("RecipeService");
		return dao.countRecipe();
	}
}
