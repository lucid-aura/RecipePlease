package com.recipe.a.dto;

public class PhotoDto {
	private int photo_seq;
	private int recipe_seq;
	private int goods_seq;
	private String photo_title;
	private String photo_content;
	private String photo_category;
	private String photo_url;
	
	public PhotoDto(int photo_seq, int recipe_seq, int goods_seq, String photo_title, String photo_content,
			String photo_category, String photo_url) {
		super();
		this.photo_seq = photo_seq;
		this.recipe_seq = recipe_seq;
		this.goods_seq = goods_seq;
		this.photo_title = photo_title;
		this.photo_content = photo_content;
		this.photo_category = photo_category;
		this.photo_url = photo_url;
	}

	public int getPhoto_seq() {
		return photo_seq;
	}

	public void setPhoto_seq(int photo_seq) {
		this.photo_seq = photo_seq;
	}

	public int getRecipe_seq() {
		return recipe_seq;
	}

	public void setRecipe_seq(int recipe_seq) {
		this.recipe_seq = recipe_seq;
	}

	public int getGoods_seq() {
		return goods_seq;
	}

	public void setGoods_seq(int goods_seq) {
		this.goods_seq = goods_seq;
	}

	public String getPhoto_title() {
		return photo_title;
	}

	public void setPhoto_title(String photo_title) {
		this.photo_title = photo_title;
	}

	public String getPhoto_content() {
		return photo_content;
	}

	public void setPhoto_content(String photo_content) {
		this.photo_content = photo_content;
	}

	public String getPhoto_category() {
		return photo_category;
	}

	public void setPhoto_category(String photo_category) {
		this.photo_category = photo_category;
	}

	public String getPhoto_url() {
		return photo_url;
	}

	public void setPhoto_url(String photo_url) {
		this.photo_url = photo_url;
	}

	@Override
	public String toString() {
		return "PhotoDto [photo_seq=" + photo_seq + ", recipe_seq=" + recipe_seq + ", goods_seq=" + goods_seq
				+ ", photo_title=" + photo_title + ", photo_content=" + photo_content + ", photo_category="
				+ photo_category + ", photo_url=" + photo_url + "]";
	}
	
}