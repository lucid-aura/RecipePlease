package com.recipe.a.service;

import com.recipe.a.dao.CoinTransactionDao;
import com.recipe.a.dto.CoinTransactionDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CoinTransactionService {

    private final CoinTransactionDao coinTransactionDao;

    public CoinTransactionService(CoinTransactionDao coinTransactionDao) {
        this.coinTransactionDao = coinTransactionDao;
    }

    // test mode
    public CoinTransactionDto coinTransactionTester() {
        return coinTransactionDao.coinTransactionTester();
    }

    // 코인 충전
    public boolean chargeCoin(CoinTransactionDto dto) {
        return coinTransactionDao.chargeCoin(dto);
    }

    // 코인 사용
    public boolean useCoin(CoinTransactionDto dto) {
        return coinTransactionDao.useCoin(dto);
    }
}
