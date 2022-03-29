package com.recipe.a.service;

import com.recipe.a.dao.CoinTransactionDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    public int coinTransactionTester() {
        return coinTransactionDao.coinTransactionTester();
    }
}
