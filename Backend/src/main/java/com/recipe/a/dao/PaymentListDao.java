package com.recipe.a.dao;

import java.util.List;

import com.recipe.a.dto.PaymentListDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface PaymentListDao {

	int countPaymentList();
	boolean addPaymentList(PaymentListDto dto);
}
