package com.recipe.a.dto;

public class ChargeCoinDto {

    private int amount;
    private String memberId;

    public ChargeCoinDto() {
    }

    public ChargeCoinDto(int amount, String memberId) {
        this.amount = amount;
        this.memberId = memberId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    @Override
    public String toString() {
        return "ChargeCoinDto{" +
                "amount=" + amount +
                ", memberId='" + memberId + '\'' +
                '}';
    }
}
