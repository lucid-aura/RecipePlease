package com.recipe.a.dto;

public class CoinTransactionDto {
	private int coinTransactionSeq;
	private String memberId;
	private int docsSeq;
	private int coinCount;
	private String coinInout;
	private String coinDate;
	
	public CoinTransactionDto() {
	}

	public CoinTransactionDto(int coinTransactionSeq, String memberId, int docsSeq, int coinCount, String coinInout,
			String coinDate) {
		super();
		this.coinTransactionSeq = coinTransactionSeq;
		this.memberId = memberId;
		this.docsSeq = docsSeq;
		this.coinCount = coinCount;
		this.coinInout = coinInout;
		this.coinDate = coinDate;
	}

	public CoinTransactionDto(String memberId, int recipeSeq) {
		this.coinTransactionSeq = 0;
		this.memberId = memberId;
		this.docsSeq = recipeSeq;
		this.coinCount = 0;
		this.coinInout = "사용";
		this.coinDate = "";
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

	public String getCoinInout() {
		return coinInout;
	}

	public void setCoinInout(String coinInout) {
		this.coinInout = coinInout;
	}

	public String getCoinDate() {
		return coinDate;
	}

	public void setCoinDate(String coinDate) {
		this.coinDate = coinDate;
	}

	@Override
	public String toString() {
		return "CoinTransactionDto [coinTransactionSeq=" + coinTransactionSeq + ", memberId=" + memberId + ", docsSeq="
				+ docsSeq + ", coinCount=" + coinCount + ", coinInout=" + coinInout + ", coinDate=" + coinDate + "]";
	}	
	
	
}
