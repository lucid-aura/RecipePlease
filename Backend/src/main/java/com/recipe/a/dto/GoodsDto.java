package com.recipe.a.dto;

public class GoodsDto {
	private int goodsSeq;
	private String goodsName;
	private int goodsPrice;
	private String goodsCategory;
	private int goodsCount;
	private int goodsView;
	private float goodsRating;
	private String goodsContent;
	
	public GoodsDto(int goodsSeq, String goodsName, int goodsPrice, String goodsCategory, int goodsCount, int goodsView,
			float goodsRating, String goodsContent) {
		super();
		this.goodsSeq = goodsSeq;
		this.goodsName = goodsName;
		this.goodsPrice = goodsPrice;
		this.goodsCategory = goodsCategory;
		this.goodsCount = goodsCount;
		this.goodsView = goodsView;
		this.goodsRating = goodsRating;
		this.goodsContent = goodsContent;
	}

	public int getGoodsSeq() {
		return goodsSeq;
	}

	public void setGoodsSeq(int goodsSeq) {
		this.goodsSeq = goodsSeq;
	}

	public String getGoodsName() {
		return goodsName;
	}

	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}

	public int getGoodsPrice() {
		return goodsPrice;
	}

	public void setGoodsPrice(int goodsPrice) {
		this.goodsPrice = goodsPrice;
	}

	public String getGoodsCategory() {
		return goodsCategory;
	}

	public void setGoodsCategory(String goodsCategory) {
		this.goodsCategory = goodsCategory;
	}

	public int getGoodsCount() {
		return goodsCount;
	}

	public void setGoodsCount(int goodsCount) {
		this.goodsCount = goodsCount;
	}

	public int getGoodsView() {
		return goodsView;
	}

	public void setGoodsView(int goodsView) {
		this.goodsView = goodsView;
	}

	public float getGoodsRating() {
		return goodsRating;
	}

	public void setGoodsRating(float goodsRating) {
		this.goodsRating = goodsRating;
	}

	public String getGoodsContent() {
		return goodsContent;
	}

	public void setGoodsContent(String goodsContent) {
		this.goodsContent = goodsContent;
	}

	@Override
	public String toString() {
		return "GoodsDto [goodsSeq=" + goodsSeq + ", goodsName=" + goodsName + ", goodsPrice=" + goodsPrice
				+ ", goodsCategory=" + goodsCategory + ", goodsCount=" + goodsCount + ", goodsView=" + goodsView
				+ ", goodsRating=" + goodsRating + ", goodsContent=" + goodsContent + "]";
	}

	
}
