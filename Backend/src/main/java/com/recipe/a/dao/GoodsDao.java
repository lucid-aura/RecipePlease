package com.recipe.a.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.GoodsDto;

@Mapper
@Repository
public interface GoodsDao {

	public int countGoods();

	public GoodsDto goodsData(int goodsSeq);
	
	public List<GoodsDto> getGoodsByCategory(String category);

	public int updateGoodsRating(int docsSeq);

	public List<GoodsDto> searchGoods(String search);
}
