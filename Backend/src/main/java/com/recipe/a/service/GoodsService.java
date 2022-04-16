package com.recipe.a.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recipe.a.dao.GoodsDao;
import com.recipe.a.dao.MembersDao;
import com.recipe.a.dao.PhotoDao;
import com.recipe.a.dao.RatingDao;
import com.recipe.a.dto.GoodsDto;

@Service
@Transactional
public class GoodsService {

	@Autowired
	GoodsDao goodsDao;
	
	@Autowired
	RatingDao ratingDao;
	
	@Autowired
	PhotoDao photoDao;
	
	public int countGoods() {
		System.out.println("GoodsService");
		return goodsDao.countGoods();
	}

	public GoodsDto goodsData() {
		return goodsDao.goodsData();
		// TODO Auto-generated method stub
		
	}

	public List<GoodsDto> getGoodsByCategory(String category) {
		return goodsDao.getGoodsByCategory(category);
	}
}
