package com.recipe.a.service;

import com.recipe.a.dao.CoinTransactionDao;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class CoinTransactionService {

    private final CoinTransactionDao coinTransactionDao;
    private Logger logger = LoggerFactory.getLogger(CoinTransactionService.class);

    public CoinTransactionService(CoinTransactionDao coinTransactionDao) {
        this.coinTransactionDao = coinTransactionDao;
    }

    // test mode
    public int coinTransactionTester() {
        logger.info("coinTransactionTester()");
        return coinTransactionDao.coinTransactionTester();
    }
}
