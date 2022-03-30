package com.recipe.a.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.CoinTransactionDto;

@Mapper
@Repository
public interface CoinTransactionDao {

    // 테스트
    CoinTransactionDto coinTransactionTester();

    // 코인을 구매한 경우
    boolean chargeCoin(CoinTransactionDto dto);

    // 코인을 사용한 경우
    boolean useCoin(CoinTransactionDto dto);
}
