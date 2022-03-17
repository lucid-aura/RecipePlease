package com.recipe.a.dto;

public class PaymentDto {
	private int payment_seq;
	private String member_id;
	private String payment_date;
	private int payment_del;
	private String payment_main_addr;
	private String payment_detail_addr;
	private Integer payment_zipcode;
	private String payment_category;
	private int payment_count;
	
	public PaymentDto(int payment_seq, String member_id, String payment_date, int payment_del, String payment_main_addr,
			String payment_detail_addr, Integer payment_zipcoode, String payment_category, int payment_count) {
		super();
		this.payment_seq = payment_seq;
		this.member_id = member_id;
		this.payment_date = payment_date;
		this.payment_del = payment_del;
		this.payment_main_addr = payment_main_addr;
		this.payment_detail_addr = payment_detail_addr;
		this.payment_zipcode = payment_zipcoode;
		this.payment_category = payment_category;
		this.payment_count = payment_count;
	}
	
	public int getPayment_seq() {
		return payment_seq;
	}
	
	public void setPayment_seq(int payment_seq) {
		this.payment_seq = payment_seq;
	}
	
	public String getMember_id() {
		return member_id;
	}
	
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	
	public String getPayment_date() {
		return payment_date;
	}
	
	public void setPayment_date(String payment_date) {
		this.payment_date = payment_date;
	}
	
	public int getPayment_del() {
		return payment_del;
	}
	
	public void setPayment_del(int payment_del) {
		this.payment_del = payment_del;
	}
	
	public String getPayment_main_addr() {
		return payment_main_addr;
	}
	
	public void setPayment_main_addr(String payment_main_addr) {
		this.payment_main_addr = payment_main_addr;
	}
	
	public String getPayment_detail_addr() {
		return payment_detail_addr;
	}
	
	public void setPayment_detail_addr(String payment_detail_addr) {
		this.payment_detail_addr = payment_detail_addr;
	}
	
	public Integer getPayment_zipcode() {
		return payment_zipcode;
	}
	
	public void setPayment_zipcode(Integer payment_zipcode) {
		this.payment_zipcode = payment_zipcode;
	}
	
	public String getPayment_category() {
		return payment_category;
	}
	
	public void setPayment_category(String payment_category) {
		this.payment_category = payment_category;
	}
	
	public int getPayment_count() {
		return payment_count;
	}
	
	public void setPayment_count(int payment_count) {
		this.payment_count = payment_count;
	}
	
	@Override
	public String toString() {
		return "PaymentDto [payment_seq=" + payment_seq + ", member_id=" + member_id + ", payment_date=" + payment_date
				+ ", payment_del=" + payment_del + ", payment_main_addr=" + payment_main_addr + ", payment_detail_addr="
				+ payment_detail_addr + ", payment_zipcode=" + payment_zipcode + ", payment_category="
				+ payment_category + ", payment_count=" + payment_count + "]";
	}
	
	
	
	

}
