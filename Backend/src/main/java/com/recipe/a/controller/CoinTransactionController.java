package com.recipe.a.controller;

import com.recipe.a.dto.CoinTransactionDto;
import com.recipe.a.service.CoinTransactionService;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/coin")
public class CoinTransactionController {

    private final CoinTransactionService coinTransactionService;

    private final Logger logger = Logger.getLogger(CoinTransactionController.class);

    public CoinTransactionController(CoinTransactionService coinTransactionService) {
        this.coinTransactionService = coinTransactionService;
    }

    // 테스트 모드
    @GetMapping("/coinTransactionTester")
    public CoinTransactionDto coinTransactionTester() {
        logger.info("CoinTransactionController coinTransactionTester()");
        return coinTransactionService.coinTransactionTester();
    }

    // 사용한 모든 코인 데이터
    @PostMapping("/getUserCoinData")
    public List<CoinTransactionDto> getUserCoinData(String memberId) {
        return coinTransactionService.getCoinData(memberId);
    }

    // 코인 충전
    @PostMapping("/chargeCoin")
    public String chargeCoin(CoinTransactionDto dto) {
        logger.info("CoinTransactionController chargeCoin()");
        boolean checker = coinTransactionService.chargeCoin(dto);
        return checker ? "충전 성공" : "충전 실패";
    }

    // 코인 사용
    @PostMapping("/useCoin")
    public String useCoin(CoinTransactionDto dto) {
        logger.info("CoinTransactionController chargeCoin()");
        boolean checker = coinTransactionService.useCoin(dto);
        return checker ? "결제 성공" : "결제 실패";
    }

    // 레시피 구매 확인
    @GetMapping("/checkPurchaseRecipe")
    public int checkPurchaseRecipe(CoinTransactionDto coinTransactionDto) {
        logger.info("CoinTransactionController checkPurchaseRecipe()");
        System.out.println(coinTransactionDto.toString());
        coinTransactionDto.setCoinTransactionSeq(-1);
        return coinTransactionService.checkPurchaseRecipe(coinTransactionDto);   
    }
}
