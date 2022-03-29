package com.recipe.a.dto;

public class RatingDto {
	private int ratingSeq;
	private String memberId;
	private int docsSeq;
	private String ratingCategory;
	private int ratingScore;
	private String ratingComment;
	
	public RatingDto() {
		// TODO Auto-generated constructor stub
	}
	
	public RatingDto(int ratingSeq, String memberId, int docsSeq, String ratingCategory, int ratingScore, String ratingComment) {
		super();
		this.ratingSeq = ratingSeq;
		this.memberId = memberId;
		this.docsSeq = docsSeq;
		this.ratingCategory = ratingCategory;
		this.ratingScore = ratingScore;
		this.ratingComment = ratingComment;
	}

	public RatingDto(String memberId, int docsSeq, String ratingCategory, int ratingScore, String ratingComment) {
		super();
		this.ratingSeq = 0;
		this.memberId = memberId;
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

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
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
		return "RatingDto [ratingSeq=" + ratingSeq + ", memberId=" + memberId + ", docsSeq=" + docsSeq + ", ratingCategory=" + ratingCategory
				+ ", ratingScore=" + ratingScore + ", ratingComment=" + ratingComment + "]";
	}

	
}