package com.recipe.a.dto;

public class PaymentListDto {
	private int payment_list_seq;
	private int purchase_product_seq;
	private String payment_list_category;
	private int payment_count;
	private int payment_list_pay;
	
	public PaymentListDto(int payment_list_seq, int purchase_product_seq, String payment_list_category,
			int payment_count, int payment_list_pay) {
		super();
		this.payment_list_seq = payment_list_seq;
		this.purchase_product_seq = purchase_product_seq;
		this.payment_list_category = payment_list_category;
		this.payment_count = payment_count;
		this.payment_list_pay = payment_list_pay;
	}

	public int getPayment_list_seq() {
		return payment_list_seq;
	}

	public void setPayment_list_seq(int payment_list_seq) {
		this.payment_list_seq = payment_list_seq;
	}

	public int getPurchase_product_seq() {
		return purchase_product_seq;
	}

	public void setPurchase_product_seq(int purchase_product_seq) {
		this.purchase_product_seq = purchase_product_seq;
	}

	public String getPayment_list_category() {
		return payment_list_category;
	}

	public void setPayment_list_category(String payment_list_category) {
		this.payment_list_category = payment_list_category;
	}

	public int getPayment_count() {
		return payment_count;
	}

	public void setPayment_count(int payment_count) {
		this.payment_count = payment_count;
	}

	public int getPayment_list_pay() {
		return payment_list_pay;
	}

	public void setPayment_list_pay(int payment_list_pay) {
		this.payment_list_pay = payment_list_pay;
	}

	@Override
	public String toString() {
		return "PaymentListDto [payment_list_seq=" + payment_list_seq + ", purchase_product_seq=" + purchase_product_seq
				+ ", payment_list_category=" + payment_list_category + ", payment_count=" + payment_count
				+ ", payment_list_pay=" + payment_list_pay + "]";
	}

}
