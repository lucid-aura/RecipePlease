package com.recipe.a.dto;

public class MembersDto {
	private String member_id;
	private String member_pwd;
	private String member_nickname;
	private String member_email;
	private String member_phone;
	private int member_coin;
	private String member_main_addr;
	private String member_detail_addr;
	private String member_zipcode;
	private String member_name;
	private String salt;
	
	public MembersDto(String member_id, String member_pwd, String member_nickname, String member_email,
			String member_phone, int member_coin, String member_main_addr, String member_detail_addr,
			String member_zipcode, String member_name, String salt) {
		super();
		this.member_id = member_id;
		this.member_pwd = member_pwd;
		this.member_nickname = member_nickname;
		this.member_email = member_email;
		this.member_phone = member_phone;
		this.member_coin = member_coin;
		this.member_main_addr = member_main_addr;
		this.member_detail_addr = member_detail_addr;
		this.member_zipcode = member_zipcode;
		this.member_name = member_name;
		this.salt = salt;
	}

	public String getMember_id() {
		return member_id;
	}

	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}

	public String getMember_pwd() {
		return member_pwd;
	}

	public void setMember_pwd(String member_pwd) {
		this.member_pwd = member_pwd;
	}

	public String getMember_nickname() {
		return member_nickname;
	}

	public void setMember_nickname(String member_nickname) {
		this.member_nickname = member_nickname;
	}

	public String getMember_email() {
		return member_email;
	}

	public void setMember_email(String member_email) {
		this.member_email = member_email;
	}

	public String getMember_phone() {
		return member_phone;
	}

	public void setMember_phone(String member_phone) {
		this.member_phone = member_phone;
	}

	public int getMember_coin() {
		return member_coin;
	}

	public void setMember_coin(int member_coin) {
		this.member_coin = member_coin;
	}

	public String getMember_main_addr() {
		return member_main_addr;
	}

	public void setMember_main_addr(String member_main_addr) {
		this.member_main_addr = member_main_addr;
	}

	public String getMember_detail_addr() {
		return member_detail_addr;
	}

	public void setMember_detail_addr(String member_detail_addr) {
		this.member_detail_addr = member_detail_addr;
	}

	public String getMember_zipcode() {
		return member_zipcode;
	}

	public void setMember_zipcode(String member_zipcode) {
		this.member_zipcode = member_zipcode;
	}

	public String getMember_name() {
		return member_name;
	}

	public void setMember_name(String member_name) {
		this.member_name = member_name;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	@Override
	public String toString() {
		return "MembersDto [member_id=" + member_id + ", member_pwd=" + member_pwd + ", member_nickname="
				+ member_nickname + ", member_email=" + member_email + ", member_phone=" + member_phone
				+ ", member_coin=" + member_coin + ", member_main_addr=" + member_main_addr + ", member_detail_addr="
				+ member_detail_addr + ", member_zipcode=" + member_zipcode + ", member_name=" + member_name + ", salt="
				+ salt + "]";
	}
	
	
	
	
}
