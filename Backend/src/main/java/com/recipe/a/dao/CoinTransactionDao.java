package com.recipe.a.dao;

import com.recipe.a.dto.ChargeCoinDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.CoinTransactionDto;

import java.util.List;

@Mapper
@Repository
public interface CoinTransactionDao {

    // 테스트
    CoinTransactionDto coinTransactionTester();

    // 사용한 모든 코인 데이터
    List<CoinTransactionDto> getCoinData(String memberId);

    // 코인을 구매한 경우
    boolean chargeCoin(CoinTransactionDto coinTransactionDto);
    boolean chargeCoinUpdate(ChargeCoinDto chargeCoinDto);

    // 코인을 사용한 경우
    boolean useCoin(CoinTransactionDto coinTransactionDto);
    boolean useCoinUpdate(ChargeCoinDto chargeCoinDto);

    // 유료레시피에 접근할 경우 코인 구매내역을 확인
	int checkPurchaseRecipe(CoinTransactionDto coinTransactionDto);
}
