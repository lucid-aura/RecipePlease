package com.recipe.a.dto;

public class CoinDto {
	
	private int coinListSeq;
	private String memberId;
	private int coinCount;
	private String coinInOut;

	public CoinDto() {
	}
	
	public CoinDto(int coinListSeq, String memberId, int coinCount, String coinInOut) {
		this.coinListSeq = coinListSeq;
		this.memberId = memberId;
		this.coinCount = coinCount;
		this.coinInOut = coinInOut;
	}

	public int getCoinListSeq() {
		return coinListSeq;
	}

	public void setCoinListSeq(int coinListSeq) {
		this.coinListSeq = coinListSeq;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
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

	@Override
	public String toString() {
		return "CoinDto [coinListSeq=" + coinListSeq + ", memberId=" + memberId + ", coinCount=" + coinCount
				+ ", coinInOut=" + coinInOut + "]";
	}
	
	
	
}
