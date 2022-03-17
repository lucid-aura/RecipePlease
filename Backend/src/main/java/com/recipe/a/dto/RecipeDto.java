package com.recipe.a.dto;

public class RecipeDto {
	private int recipe_seq;
	private String member_id;
	private String recipe_title;
	private String recipe_content;
	private String recipe_big_category;
	private String recipe_small_category;
	private String recipe_goods_tag;
	private int recipe_open;
	private float recipe_rating;
	
	public RecipeDto(int recipe_seq, String member_id, String recipe_title, String recipe_content,
			String recipe_big_category, String recipe_small_category, String recipe_goods_tag, int recipe_open,
			float recipe_rating) {
		super();
		this.recipe_seq = recipe_seq;
		this.member_id = member_id;
		this.recipe_title = recipe_title;
		this.recipe_content = recipe_content;
		this.recipe_big_category = recipe_big_category;
		this.recipe_small_category = recipe_small_category;
		this.recipe_goods_tag = recipe_goods_tag;
		this.recipe_open = recipe_open;
		this.recipe_rating = recipe_rating;
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

	public String getRecipe_title() {
		return recipe_title;
	}

	public void setRecipe_title(String recipe_title) {
		this.recipe_title = recipe_title;
	}

	public String getRecipe_content() {
		return recipe_content;
	}

	public void setRecipe_content(String recipe_content) {
		this.recipe_content = recipe_content;
	}

	public String getRecipe_big_category() {
		return recipe_big_category;
	}

	public void setRecipe_big_category(String recipe_big_category) {
		this.recipe_big_category = recipe_big_category;
	}

	public String getRecipe_small_category() {
		return recipe_small_category;
	}

	public void setRecipe_small_category(String recipe_small_category) {
		this.recipe_small_category = recipe_small_category;
	}

	public String getRecipe_goods_tag() {
		return recipe_goods_tag;
	}

	public void setRecipe_goods_tag(String recipe_goods_tag) {
		this.recipe_goods_tag = recipe_goods_tag;
	}

	public int getRecipe_open() {
		return recipe_open;
	}

	public void setRecipe_open(int recipe_open) {
		this.recipe_open = recipe_open;
	}

	public float getRecipe_rating() {
		return recipe_rating;
	}

	public void setRecipe_rating(float recipe_rating) {
		this.recipe_rating = recipe_rating;
	}

	@Override
	public String toString() {
		return "RecipeDto [recipe_seq=" + recipe_seq + ", member_id=" + member_id + ", recipe_title=" + recipe_title
				+ ", recipe_content=" + recipe_content + ", recipe_big_category=" + recipe_big_category
				+ ", recipe_small_category=" + recipe_small_category + ", recipe_goods_tag=" + recipe_goods_tag
				+ ", recipe_open=" + recipe_open + ", recipe_rating=" + recipe_rating + "]";
	}
	
	
}
