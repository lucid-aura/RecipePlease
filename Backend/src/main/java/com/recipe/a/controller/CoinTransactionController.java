package com.recipe.a.controller;

import com.recipe.a.service.CoinTransactionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CoinTransactionController {

    private final CoinTransactionService coinTransactionService;
    private Logger logger = LoggerFactory.getLogger(CoinTransactionController.class);

    public CoinTransactionController(CoinTransactionService coinTransactionService) {
        this.coinTransactionService = coinTransactionService;
    }

    @GetMapping("/coin/coinTransactionTestMode")
    public String coinTransactionTestMode() {
        logger.info("coinTransactionTestMode()");
        return coinTransactionService.coinTransactionTester() > 0 ? "success" : "fail";
    }

}
