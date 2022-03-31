package com.recipe.a.dto;

public class RecipeLikeDto {
	private int likeSeq;
	private int recipeSeq;
	private String memberId;
	
	public RecipeLikeDto() {
		this.likeSeq = 0;
	}
	
	public RecipeLikeDto(int likeSeq, int recipeSeq, String memberId) {
		super();
		this.likeSeq = 0;
		this.recipeSeq = recipeSeq;
		this.memberId = memberId;
	}

	public int getLikeSeq() {
		return likeSeq;
	}

	public void setLikeseq(int likeSeq) {
		this.likeSeq = likeSeq;
	}

	public int getRecipeSeq() {
		return recipeSeq;
	}

	public void setRecipeSeq(int recipeSeq) {
		this.recipeSeq = recipeSeq;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	@Override
	public String toString() {
		return "RecipeLikeDto [likeSeq=" + likeSeq + ", recipeSeq=" + recipeSeq + ", memberId=" + memberId + "]";
	}
	
	
	
	
}
