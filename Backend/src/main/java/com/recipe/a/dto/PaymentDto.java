package com.recipe.a.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PaymentDto {
	
	private int payment_seq;
	private String member_id;
	private int payment_pay;
	private String payment_date;
	private int payment_del;
	private String payment_main_addr;
	private String payment_detail_addr;
	private int payment_zipcode;
	private String payment_category;
	private int payment_count;

	public PaymentDto() {
	}

	public PaymentDto(int payment_seq, String member_id, int payment_pay, String payment_date, int payment_del, String payment_main_addr, String payment_detail_addr, int payment_zipcode, String payment_category, int payment_count) {
		this.payment_seq = payment_seq;
		this.member_id = member_id;
		this.payment_pay = payment_pay;
		this.payment_date = payment_date;
		this.payment_del = payment_del;
		this.payment_main_addr = payment_main_addr;
		this.payment_detail_addr = payment_detail_addr;
		this.payment_zipcode = payment_zipcode;
		this.payment_category = payment_category;
		this.payment_count = payment_count;
	}

	public void setPayment_seq(int payment_seq) {
		this.payment_seq = payment_seq;
	}

	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}

	public void setPayment_pay(int payment_pay) {
		this.payment_pay = payment_pay;
	}

	public void setPayment_date(String payment_date) {
		this.payment_date = payment_date;
	}

	public void setPayment_del(int payment_del) {
		this.payment_del = payment_del;
	}

	public void setPayment_main_addr(String payment_main_addr) {
		this.payment_main_addr = payment_main_addr;
	}

	public void setPayment_detail_addr(String payment_detail_addr) {
		this.payment_detail_addr = payment_detail_addr;
	}

	public void setPayment_zipcode(int payment_zipcode) {
		this.payment_zipcode = payment_zipcode;
	}

	public void setPayment_category(String payment_category) {
		this.payment_category = payment_category;
	}

	public void setPayment_count(int payment_count) {
		this.payment_count = payment_count;
	}
}
