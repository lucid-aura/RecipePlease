package com.recipe.a.controller;

import com.recipe.a.service.CoinTransactionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CoinTransactionController {

    private final CoinTransactionService coinTransactionService;

    public CoinTransactionController(CoinTransactionService coinTransactionService) {
        this.coinTransactionService = coinTransactionService;
    }

    @GetMapping("/coin/coinTransactionTestMode")
    public String coinTransactionTestMode() {
        return coinTransactionService.coinTransactionTester() > 0 ? "success" : "fail";
    }

}
