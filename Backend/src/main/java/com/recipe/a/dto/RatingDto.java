package com.recipe.a.dto;

public class RatingDto {
	private int ratingSeq;
	private int docsSeq;
	private String ratingCategory;
	private int ratingScore;
	private String ratingComment;
	
	public RatingDto(int ratingSeq, int docsSeq, String ratingCategory, int ratingScore, String ratingComment) {
		super();
		this.ratingSeq = ratingSeq;
		this.docsSeq = docsSeq;
		this.ratingCategory = ratingCategory;
		this.ratingScore = ratingScore;
		this.ratingComment = ratingComment;
	}

	public int getRatingSeq() {
		return ratingSeq;
	}

	public void setRatingSeq(int ratingSeq) {
		this.ratingSeq = ratingSeq;
	}

	public int getDocsSeq() {
		return docsSeq;
	}

	public void setDocsSeq(int docsSeq) {
		this.docsSeq = docsSeq;
	}

	public String getRatingCategory() {
		return ratingCategory;
	}

	public void setRatingCategory(String ratingCategory) {
		this.ratingCategory = ratingCategory;
	}

	public int getRatingScore() {
		return ratingScore;
	}

	public void setRatingScore(int ratingScore) {
		this.ratingScore = ratingScore;
	}

	public String getRatingComment() {
		return ratingComment;
	}

	public void setRatingComment(String ratingComment) {
		this.ratingComment = ratingComment;
	}

	@Override
	public String toString() {
		return "RatingDto [ratingSeq=" + ratingSeq + ", docsSeq=" + docsSeq + ", ratingCategory=" + ratingCategory
				+ ", ratingScore=" + ratingScore + ", ratingComment=" + ratingComment + "]";
	}

	
}