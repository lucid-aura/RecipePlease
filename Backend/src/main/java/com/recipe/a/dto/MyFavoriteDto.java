package com.recipe.a.dto;

public class MyFavoriteDto {
	private int recipeSeq;
	private String recipeTitle;
	private int recipeReadcountList;
	private float recipeRatingList;
	private String thumbnailList;
	private int recipeRatingCountList;
	private String memberId;
	
	public MyFavoriteDto() {
		super();
		this.recipeSeq = 0;
		this.recipeTitle = "";
		this.recipeReadcountList = 0;
		this.recipeRatingList = 0.0F;
		this.thumbnailList = "";
		this.recipeRatingCountList = 0;
		this.memberId = "";
		
	}

	public MyFavoriteDto(int recipeSeq, String recipeTitle, int recipeReadcountList, float recipeRatingList,
			String thumbnailList, int recipeRatingCountList, String memberId) {
		super();
		this.recipeSeq = recipeSeq;
		this.recipeTitle = recipeTitle;
		this.recipeReadcountList = recipeReadcountList;
		this.recipeRatingList = recipeRatingList;
		this.thumbnailList = thumbnailList;
		this.recipeRatingCountList = recipeRatingCountList;
		this.memberId = memberId;
	}

	public int getRecipeSeq() {
		return recipeSeq;
	}

	public void setRecipeSeq(int recipeSeq) {
		this.recipeSeq = recipeSeq;
	}

	public String getRecipeTitle() {
		return recipeTitle;
	}

	public void setRecipeTitle(String recipeTitle) {
		this.recipeTitle = recipeTitle;
	}

	public int getRecipeReadcountList() {
		return recipeReadcountList;
	}

	public void setRecipeReadcountList(int recipeReadcountList) {
		this.recipeReadcountList = recipeReadcountList;
	}

	public float getRecipeRatingList() {
		return recipeRatingList;
	}

	public void setRecipeRatingList(float recipeRatingList) {
		this.recipeRatingList = recipeRatingList;
	}

	public String getThumbnailList() {
		return thumbnailList;
	}

	public void setThumbnailList(String thumbnailList) {
		this.thumbnailList = thumbnailList;
	}

	public int getRecipeRatingCountList() {
		return recipeRatingCountList;
	}

	public void setRecipeRatingCountList(int recipeRatingCountList) {
		this.recipeRatingCountList = recipeRatingCountList;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	@Override
	public String toString() {
		return "MyFavoriteDto [recipeSeq=" + recipeSeq + ", recipeTitle=" + recipeTitle + ", recipeReadcountList="
				+ recipeReadcountList + ", recipeRatingList=" + recipeRatingList + ", thumbnailList=" + thumbnailList
				+ ", recipeRatingCountList=" + recipeRatingCountList + ", memberId=" + memberId + "]";
	} 
	
	
	
	
	

}
