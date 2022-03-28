package com.recipe.a.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.CoinTransactionDto;

@Mapper
@Repository
public interface CoinTransactionDao {
	
	public int purchaseRecipeCheck(CoinTransactionDto coinDto);
}
