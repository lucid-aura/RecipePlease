package com.recipe.a.dto;

public class RecipeDto {
	private int recipeSeq;
	private String memberId;
	private String recipeTitle;
	private String recipeContent;
	private String recipeBigCategory;
	private String recipeSmallCategory;
	private String recipeVideoUrl;
	private String recipeGoodsTag;
	private int recipePrice;
	private float recipeRating;
	private int recipeReadcount;
	
	
	
	public RecipeDto() {
		super();
		this.memberId = "";
		this.recipeTitle = "";
		this.recipeContent = "";
		this.recipeBigCategory = "";
		this.recipeSmallCategory = "";
		this.recipeVideoUrl = "";
		this.recipeGoodsTag = "";
		this.recipePrice = 0;
		this.recipeRating = 0.0F;
		this.recipeReadcount = 0;
	}

	public RecipeDto(String memberId, String recipeTitle, String recipeContent, String recipeBigCategory,
			String recipeSmallCategory, String recipeVideoUrl, String recipeGoodsTag, int recipePrice) {
		super();
		this.memberId = memberId;
		this.recipeTitle = recipeTitle;
		this.recipeContent = recipeContent;
		this.recipeBigCategory = recipeBigCategory;
		this.recipeSmallCategory = recipeSmallCategory;
		this.recipeVideoUrl = recipeVideoUrl;
		this.recipeGoodsTag = recipeGoodsTag;
		this.recipePrice = recipePrice;
		this.recipeRating = 0.0F;
		this.recipeReadcount = 0;
	}

	public RecipeDto(int recipeSeq, String memberId, String recipeTitle, String recipeContent, String recipeBigCategory,
			String recipeSmallCategory, String recipeVideoUrl, String recipeGoodsTag, int recipePrice, float recipeRating, int recipeReadcount) {
		super();
		this.recipeSeq = recipeSeq;
		this.memberId = memberId;
		this.recipeTitle = recipeTitle;
		this.recipeContent = recipeContent;
		this.recipeBigCategory = recipeBigCategory;
		this.recipeSmallCategory = recipeSmallCategory;
		this.recipeVideoUrl = recipeVideoUrl;
		this.recipeGoodsTag = recipeGoodsTag;
		this.recipePrice = recipePrice;
		this.recipeRating = recipeRating;
		this.recipeReadcount = recipeReadcount;
	}
	
	public RecipeDto(int recipeSeq, String memberId, String recipeTitle, String recipeContent, String recipeBigCategory,
			String recipeSmallCategory, String recipeVideoUrl, String recipeGoodsTag, int recipePrice, float recipeRating) {
		super();
		this.recipeSeq = recipeSeq;
		this.memberId = memberId;
		this.recipeTitle = recipeTitle;
		this.recipeContent = recipeContent;
		this.recipeBigCategory = recipeBigCategory;
		this.recipeSmallCategory = recipeSmallCategory;
		this.recipeVideoUrl = recipeVideoUrl;
		this.recipeGoodsTag = recipeGoodsTag;
		this.recipePrice = recipePrice;
		this.recipeRating = recipeRating;
		this.recipeReadcount = 0;
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

	public String getRecipeTitle() {
		return recipeTitle;
	}

	public void setRecipeTitle(String recipeTitle) {
		this.recipeTitle = recipeTitle;
	}

	public String getRecipeContent() {
		return recipeContent;
	}

	public void setRecipeContent(String recipeContent) {
		this.recipeContent = recipeContent;
	}

	public String getRecipeBigCategory() {
		return recipeBigCategory;
	}

	public void setRecipeBigCategory(String recipeBigCategory) {
		this.recipeBigCategory = recipeBigCategory;
	}

	public String getRecipeSmallCategory() {
		return recipeSmallCategory;
	}

	public void setRecipeSmallCategory(String recipeSmallCategory) {
		this.recipeSmallCategory = recipeSmallCategory;
	}

	public String getRecipeVideoUrl() {
		return recipeVideoUrl;
	}

	public void setRecipeVideoUrl(String recipeVideoUrl) {
		this.recipeVideoUrl = recipeVideoUrl;
	}

	public String getRecipeGoodsTag() {
		return recipeGoodsTag;
	}

	public void setRecipeGoodsTag(String recipeGoodsTag) {
		this.recipeGoodsTag = recipeGoodsTag;
	}

	public int getRecipePrice() {
		return recipePrice;
	}

	public void setRecipePrice(int recipePrice) {
		this.recipePrice = recipePrice;
	}

	public float getRecipeRating() {
		return recipeRating;
	}

	public void setRecipeRating(float recipeRating) {
		this.recipeRating = recipeRating;
	}

	public int getRecipeReadcount() {
		return recipeReadcount;
	}

	public void setRecipeReadcount(int recipeReadcount) {
		this.recipeReadcount = recipeReadcount;
	}

	@Override
	public String toString() {
		return "RecipeDto [recipeSeq=" + recipeSeq + ", memberId=" + memberId + ", recipeTitle=" + recipeTitle
				+ ", recipeContent=" + recipeContent + ", recipeBigCategory=" + recipeBigCategory
				+ ", recipeSmallCategory=" + recipeSmallCategory + ", recipeVideoUrl=" + recipeVideoUrl
				+ ", recipeGoodsTag=" + recipeGoodsTag + ", recipePrice=" + recipePrice + ", recipeRating="
				+ recipeRating + ", recipeReadcount=" + recipeReadcount + "]";
	}

	
	
	
}
