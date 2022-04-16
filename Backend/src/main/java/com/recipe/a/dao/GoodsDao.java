package com.recipe.a.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.GoodsDto;

@Mapper
@Repository
public interface GoodsDao {

	public int countGoods();

	public GoodsDto goodsData();
	
	public List<GoodsDto> getGoodsByCategory(String category);
}
