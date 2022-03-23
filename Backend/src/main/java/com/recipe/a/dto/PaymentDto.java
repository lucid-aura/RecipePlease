package com.recipe.a.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
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


	public void setPaymentSeq(int paymentSeq) {
		this.paymentSeq = paymentSeq;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public void setPaymentPay(int paymentPay) {
		this.paymentPay = paymentPay;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public void setPaymentDel(int paymentDel) {
		this.paymentDel = paymentDel;
	}

	public void setPaymentMainAddr(String paymentMainAddr) {
		this.paymentMainAddr = paymentMainAddr;
	}

	public void setPaymentDetailAddr(String paymentDetailAddr) {
		this.paymentDetailAddr = paymentDetailAddr;
	}

	public void setPaymentZipcode(int paymentZipcode) {
		this.paymentZipcode = paymentZipcode;
	}

	public void setPaymentCategory(String paymentCategory) {
		this.paymentCategory = paymentCategory;
	}

	public void setPaymentCount(int paymentCount) {
		this.paymentCount = paymentCount;
	}

	


}
