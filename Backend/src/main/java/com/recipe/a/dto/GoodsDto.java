package com.recipe.a.dto;

public class GoodsDto {
	private int goods_seq;
	private String goods_name;
	private int goods_price;
	private String goods_category;
	private int goods_count;
	private int goods_view;
	private float goods_rating;
	private String goods_content;
	
	public GoodsDto(int goods_seq, String goods_name, int goods_price, String goods_category, int goods_count,
			int goods_view, float goods_rating, String goods_content) {
		super();
		this.goods_seq = goods_seq;
		this.goods_name = goods_name;
		this.goods_price = goods_price;
		this.goods_category = goods_category;
		this.goods_count = goods_count;
		this.goods_view = goods_view;
		this.goods_rating = goods_rating;
		this.goods_content = goods_content;
	}

	public int getGoods_seq() {
		return goods_seq;
	}

	public void setGoods_seq(int goods_seq) {
		this.goods_seq = goods_seq;
	}

	public String getGoods_name() {
		return goods_name;
	}

	public void setGoods_name(String goods_name) {
		this.goods_name = goods_name;
	}

	public int getGoods_price() {
		return goods_price;
	}

	public void setGoods_price(int goods_price) {
		this.goods_price = goods_price;
	}

	public String getGoods_category() {
		return goods_category;
	}

	public void setGoods_category(String goods_category) {
		this.goods_category = goods_category;
	}

	public int getGoods_count() {
		return goods_count;
	}

	public void setGoods_count(int goods_count) {
		this.goods_count = goods_count;
	}

	public int getGoods_view() {
		return goods_view;
	}

	public void setGoods_view(int goods_view) {
		this.goods_view = goods_view;
	}

	public float getGoods_rating() {
		return goods_rating;
	}

	public void setGoods_rating(float goods_rating) {
		this.goods_rating = goods_rating;
	}

	public String getGoods_content() {
		return goods_content;
	}

	public void setGoods_content(String goods_content) {
		this.goods_content = goods_content;
	}

	@Override
	public String toString() {
		return "GoodsDto [goods_seq=" + goods_seq + ", goods_name=" + goods_name + ", goods_price=" + goods_price
				+ ", goods_category=" + goods_category + ", goods_count=" + goods_count + ", goods_view=" + goods_view
				+ ", goods_rating=" + goods_rating + ", goods_content=" + goods_content + "]";
	}
	
}
