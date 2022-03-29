package com.recipe.a.dto;

public class CoinTransactionDto {

    private int coinTransactionSeq;
    private String memberId;
    private int docsSeq;
    private int coinCount;
    private String coinInOut;
    private String coinDate;

    public CoinTransactionDto() {
    }

    public CoinTransactionDto(String memberId, int docsSeq) {
    	this.memberId = memberId;
    	this.docsSeq = docsSeq;
    }
    
    public CoinTransactionDto(int coinTransactionSeq, String memberId, int docsSeq, int coinCount, String coinInOut, String coinDate) {
        this.coinTransactionSeq = coinTransactionSeq;
        this.memberId = memberId;
        this.docsSeq = docsSeq;
        this.coinCount = coinCount;
        this.coinInOut = coinInOut;
        this.coinDate = coinDate;
    }

    public int getCoinTransactionSeq() {
        return coinTransactionSeq;
    }

    public void setCoinTransactionSeq(int coinTransactionSeq) {
        this.coinTransactionSeq = coinTransactionSeq;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public int getDocsSeq() {
        return docsSeq;
    }

    public void setDocsSeq(int docsSeq) {
        this.docsSeq = docsSeq;
    }

    public int getCoinCount() {
        return coinCount;
    }

    public void setCoinCount(int coinCount) {
        this.coinCount = coinCount;
    }

    public String getCoinInOut() {
        return coinInOut;
    }

    public void setCoinInOut(String coinInOut) {
        this.coinInOut = coinInOut;
    }

    public String getCoinDate() {
        return coinDate;
    }

    public void setCoinDate(String coinDate) {
        this.coinDate = coinDate;
    }

    @Override
    public String toString() {
        return "CoinTransactionDto{" +
                "coinTransactionSeq=" + coinTransactionSeq +
                ", memberId='" + memberId + '\'' +
                ", docsSeq=" + docsSeq +
                ", coinCount=" + coinCount +
                ", coinInOut='" + coinInOut + '\'' +
                ", coinDate='" + coinDate + '\'' +
                '}';
    }
}
