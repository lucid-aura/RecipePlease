package com.recipe.a.dto;

public class PaymentListDto {
	private int paymentListSeq;
	private int purchaseProductSeq;
	private String paymentListCategory;
	private int paymentCount;
	private int paymentListPay;
	
	public PaymentListDto(int paymentListSeq, int purchaseProductSeq, String paymentListCategory, int paymentCount,
			int paymentListPay) {
		super();
		this.paymentListSeq = paymentListSeq;
		this.purchaseProductSeq = purchaseProductSeq;
		this.paymentListCategory = paymentListCategory;
		this.paymentCount = paymentCount;
		this.paymentListPay = paymentListPay;
	}

	public int getPaymentListSeq() {
		return paymentListSeq;
	}

	public void setPaymentListSeq(int paymentListSeq) {
		this.paymentListSeq = paymentListSeq;
	}

	public int getPurchaseProductSeq() {
		return purchaseProductSeq;
	}

	public void setPurchaseProductSeq(int purchaseProductSeq) {
		this.purchaseProductSeq = purchaseProductSeq;
	}

	public String getPaymentListCategory() {
		return paymentListCategory;
	}

	public void setPaymentListCategory(String paymentListCategory) {
		this.paymentListCategory = paymentListCategory;
	}

	public int getPaymentCount() {
		return paymentCount;
	}

	public void setPaymentCount(int paymentCount) {
		this.paymentCount = paymentCount;
	}

	public int getPaymentListPay() {
		return paymentListPay;
	}

	public void setPaymentListPay(int paymentListPay) {
		this.paymentListPay = paymentListPay;
	}

	@Override
	public String toString() {
		return "PaymentListDto [paymentListSeq=" + paymentListSeq + ", purchaseProductSeq=" + purchaseProductSeq
				+ ", paymentListCategory=" + paymentListCategory + ", paymentCount=" + paymentCount
				+ ", paymentListPay=" + paymentListPay + "]";
	}
	
	
}
