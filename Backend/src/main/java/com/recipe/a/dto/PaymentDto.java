package com.recipe.a.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class PaymentDto {
	
	private int paymentSeq;
	private String memberId;
	private int paymentPay;
	private String paymentDate;
	private int paymentDel;
	private String paymentMainAddr;
	private String paymentDetailAddr;
	private int paymentZipcode;
	private String paymentCategory;
	private int paymentCount;

	public PaymentDto() {
	}

	public PaymentDto(int paymentSeq, String memberId, int paymentPay, String paymentDate, int paymentDel,
			String paymentMainAddr, String paymentDetailAddr, int paymentZipcode, String paymentCategory,
			int paymentCount) {
		this.paymentSeq = paymentSeq;
		this.memberId = memberId;
		this.paymentPay = paymentPay;
		this.paymentDate = paymentDate;
		this.paymentDel = paymentDel;
		this.paymentMainAddr = paymentMainAddr;
		this.paymentDetailAddr = paymentDetailAddr;
		this.paymentZipcode = paymentZipcode;
		this.paymentCategory = paymentCategory;
		this.paymentCount = paymentCount;
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

	public int getPaymentPay() {
		return paymentPay;
	}

	public void setPaymentPay(int paymentPay) {
		this.paymentPay = paymentPay;
	}

	public String getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public int getPaymentDel() {
		return paymentDel;
	}

	public void setPaymentDel(int paymentDel) {
		this.paymentDel = paymentDel;
	}

	public String getPaymentMainAddr() {
		return paymentMainAddr;
	}

	public void setPaymentMainAddr(String paymentMainAddr) {
		this.paymentMainAddr = paymentMainAddr;
	}

	public String getPaymentDetailAddr() {
		return paymentDetailAddr;
	}

	public void setPaymentDetailAddr(String paymentDetailAddr) {
		this.paymentDetailAddr = paymentDetailAddr;
	}

	public int getPaymentZipcode() {
		return paymentZipcode;
	}

	public void setPaymentZipcode(int paymentZipcode) {
		this.paymentZipcode = paymentZipcode;
	}

	public String getPaymentCategory() {
		return paymentCategory;
	}

	public void setPaymentCategory(String paymentCategory) {
		this.paymentCategory = paymentCategory;
	}

	public int getPaymentCount() {
		return paymentCount;
	}

	public void setPaymentCount(int paymentCount) {
		this.paymentCount = paymentCount;
	}

	@Override
	public String toString() {
		return "PaymentDto [paymentSeq=" + paymentSeq + ", memberId=" + memberId + ", paymentPay=" + paymentPay
				+ ", paymentDate=" + paymentDate + ", paymentDel=" + paymentDel + ", paymentMainAddr=" + paymentMainAddr
				+ ", paymentDetailAddr=" + paymentDetailAddr + ", paymentZipcode=" + paymentZipcode
				+ ", paymentCategory=" + paymentCategory + ", paymentCount=" + paymentCount + "]";
	}

	


}
