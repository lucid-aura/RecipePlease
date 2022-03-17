package com.recipe.a.dto;

public class RecipeLikeDto {
	private int like_seq;
	private int recipe_seq;
	private String member_id;
	
	public RecipeLikeDto(int like_seq, int recipe_seq, String member_id) {
		super();
		this.like_seq = like_seq;
		this.recipe_seq = recipe_seq;
		this.member_id = member_id;
	}
	public int getLike_seq() {
		return like_seq;
	}
	public void setLike_seq(int like_seq) {
		this.like_seq = like_seq;
	}
	public int getRecipe_seq() {
		return recipe_seq;
	}
	public void setRecipe_seq(int recipe_seq) {
		this.recipe_seq = recipe_seq;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	@Override
	public String toString() {
		return "RecipeLikeDto [like_seq=" + like_seq + ", recipe_seq=" + recipe_seq + ", member_id=" + member_id + "]";
	}
	
	
	
}
