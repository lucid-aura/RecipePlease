package com.recipe.a.dao;

import java.util.List;

import com.recipe.a.dto.PaymentDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface PaymentDao {

	public int countPayment();

	int addGoodsShoppingList(PaymentDto dto);
}
