package com.recipe.a.dto;

/*
CREATE TABLE `MEMBERS` (
	`MEMBERID`	VARCHAR(20)	PRIMARY KEY,
	`MEMBERPWD`	VARCHAR(100)	NOT NULL,
	`MEMBERNICKNAME`	VARCHAR(50)	NOT NULL,
	`MEMBEREMAIL`	VARCHAR(30)	NULL,
	`MEMBERPHONE`	VARCHAR(20)	NULL,
	`MEMBERCOIN`	INTEGER	NOT NULL,
	`MEMBERMAIN_ADDR`	VARCHAR(100)	NULL,
	`MEMBERDETAIL_ADDR`	VARCHAR(100)	NULL,
	`MEMBERZIPCODE`	INTEGER	NULL,
	`MEMBERGENDER`	VARCHAR(10)	NULL,
	`MEMBERNAME`	VARCHAR(20)	NULL,
	`MEMBERGRADE`	VARCHAR(50)	NOT NULL,
	`SALT`	VARCHAR(100)	NOT NULL
);
 */
public class MembersDto {
	private String memberId;
	private String memberPwd;
	private String memberNickname;
	private String memberEmail;
	private String memberPhone;
	private int memberCoin;
	private String memberMainAddr;
	private String memberDetailAddr;
	private String memberZipcode;
	private String memberGender;
	private String memberName;
	private String salt;
	
	public MembersDto(String memberId, String memberPwd, String memberNickname, String memberEmail, String memberPhone,
			int memberCoin, String memberMainAddr, String memberDetailAddr, String memberZipcode, String memberGender,
			String memberName, String salt) {
		super();
		this.memberId = memberId;
		this.memberPwd = memberPwd;
		this.memberNickname = memberNickname;
		this.memberEmail = memberEmail;
		this.memberPhone = memberPhone;
		this.memberCoin = memberCoin;
		this.memberMainAddr = memberMainAddr;
		this.memberDetailAddr = memberDetailAddr;
		this.memberZipcode = memberZipcode;
		this.memberGender = memberGender;
		this.memberName = memberName;
		this.salt = salt;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getMemberPwd() {
		return memberPwd;
	}

	public void setMemberPwd(String memberPwd) {
		this.memberPwd = memberPwd;
	}

	public String getMemberNickname() {
		return memberNickname;
	}

	public void setMemberNickname(String memberNickname) {
		this.memberNickname = memberNickname;
	}

	public String getMemberEmail() {
		return memberEmail;
	}

	public void setMemberEmail(String memberEmail) {
		this.memberEmail = memberEmail;
	}

	public String getMemberPhone() {
		return memberPhone;
	}

	public void setMemberPhone(String memberPhone) {
		this.memberPhone = memberPhone;
	}

	public int getMemberCoin() {
		return memberCoin;
	}

	public void setMemberCoin(int memberCoin) {
		this.memberCoin = memberCoin;
	}

	public String getMemberMainAddr() {
		return memberMainAddr;
	}

	public void setMemberMainAddr(String memberMainAddr) {
		this.memberMainAddr = memberMainAddr;
	}

	public String getMemberDetailAddr() {
		return memberDetailAddr;
	}

	public void setMemberDetailAddr(String memberDetailAddr) {
		this.memberDetailAddr = memberDetailAddr;
	}

	public String getMemberZipcode() {
		return memberZipcode;
	}

	public void setMemberZipcode(String memberZipcode) {
		this.memberZipcode = memberZipcode;
	}

	public String getMemberGender() {
		return memberGender;
	}

	public void setMemberGender(String memberGender) {
		this.memberGender = memberGender;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	@Override
	public String toString() {
		return "MembersDto [memberId=" + memberId + ", memberPwd=" + memberPwd + ", memberNickname=" + memberNickname
				+ ", memberEmail=" + memberEmail + ", memberPhone=" + memberPhone + ", memberCoin=" + memberCoin
				+ ", memberMainAddr=" + memberMainAddr + ", memberDetailAddr=" + memberDetailAddr + ", memberZipcode="
				+ memberZipcode + ", memberGender=" + memberGender + ", memberName=" + memberName + ", salt=" + salt
				+ "]";
	}
	
	
}
