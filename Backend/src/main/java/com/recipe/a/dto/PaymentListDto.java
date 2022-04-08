package com.recipe.a.dto;

/*
	CREATE TABLE PAYMENTLIST (
		PAYMENTLISTSEQ		INTEGER	NOT NULL,
		PAYMENTSEQ			INTEGER	NOT NULL,
		MEMBERID			VARCHAR(20)	NOT NULL,
		PURCHASEPRODUCTSEQ	INTEGER		NOT NULL,
		PAYMENTLISTCATEGORY	VARCHAR(20)	NOT NULL,
		PAYMENTCOUNT		INTEGER	NOT NULL,
		PAYMENTLISTPAY		INTEGER	NOT NULL
	);
*/

public class PaymentListDto {
	
	private int paymentListSeq;
	private int paymentSeq;
	private String memberId;
	private String purchaseProductSeq;
	private String paymentListCategory;
	private int paymentCount;
	private int paymentListPay;
	
	public PaymentListDto() {
	}

	public PaymentListDto(int paymentListSeq, int paymentSeq, String memberId, String purchaseProductSeq,
			String paymentListCategory, int paymentCount, int paymentListPay) {
		super();
		this.paymentListSeq = paymentListSeq;
		this.paymentSeq = paymentSeq;
		this.memberId = memberId;
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

	public int getPaymentSeq() {
		return paymentSeq;
	}

	public void setPaymentSeq(int paymentSeq) {
		this.paymentSeq = paymentSeq;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getPurchaseProductSeq() {
		return purchaseProductSeq;
	}

	public void setPurchaseProductSeq(String purchaseProductSeq) {
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
		return "PaymentListDto [paymentListSeq=" + paymentListSeq + ", paymentSeq=" + paymentSeq + ", memberId="
				+ memberId + ", purchaseProductSeq=" + purchaseProductSeq + ", paymentListCategory="
				+ paymentListCategory + ", paymentCount=" + paymentCount + ", paymentListPay=" + paymentListPay + "]";
	}
	
	
	
	
}
