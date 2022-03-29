package com.recipe.a.dto;

public class RecipeLikeDto {
	private int likeseq;
	private int recipeSeq;
	private String memberId;
	
	public RecipeLikeDto(int likeseq, int recipeSeq, String memberId) {
		super();
		this.likeseq = likeseq;
		this.recipeSeq = recipeSeq;
		this.memberId = memberId;
	}

	public int getLikeseq() {
		return likeseq;
	}

	public void setLikeseq(int likeseq) {
		this.likeseq = likeseq;
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
		return "RecipeLikeDto [likeseq=" + likeseq + ", recipeSeq=" + recipeSeq + ", memberId=" + memberId + "]";
	}
	
	
	
	
}
