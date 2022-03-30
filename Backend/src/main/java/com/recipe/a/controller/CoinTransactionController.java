package com.recipe.a.controller;

import com.recipe.a.dto.CoinTransactionDto;
import com.recipe.a.service.CoinTransactionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/coin")
public class CoinTransactionController {

    private final CoinTransactionService coinTransactionService;

    public CoinTransactionController(CoinTransactionService coinTransactionService) {
        this.coinTransactionService = coinTransactionService;
    }

    // 테스트 모드
    @GetMapping("/coinTransactionTester")
    public CoinTransactionDto coinTransactionTester() {
        return coinTransactionService.coinTransactionTester();
    }

    // 코인 충전
    @PostMapping("/chageCoin")
    public String chargeCoin(CoinTransactionDto dto) {
        boolean checker = coinTransactionService.chargeCoin(dto);
        return checker ? "충전 성공" : "충전 실패";
    }

    // 코인 사용
    @PostMapping("/useCoin")
    public String useCoin(CoinTransactionDto dto) {
        boolean checker = coinTransactionService.useCoin(dto);
        return checker ? "결제 성공" : "결제 실패";
    }

}
