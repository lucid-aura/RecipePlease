package com.recipe.a.dto;

public class RatingDto {
	private int rating_seq;
	private int docs_seq;
	private String rating_category;
	private int rating_score;
	private String rating_comment;
	
	public RatingDto(int rating_seq, int docs_seq, String rating_category, int rating_score, String rating_comment) {
		super();
		this.rating_seq = rating_seq;
		this.docs_seq = docs_seq;
		this.rating_category = rating_category;
		this.rating_score = rating_score;
		this.rating_comment = rating_comment;
	}

	public int getRating_seq() {
		return rating_seq;
	}

	public void setRating_seq(int rating_seq) {
		this.rating_seq = rating_seq;
	}

	public int getDocs_seq() {
		return docs_seq;
	}

	public void setDocs_seq(int docs_seq) {
		this.docs_seq = docs_seq;
	}

	public String getRating_category() {
		return rating_category;
	}

	public void setRating_category(String rating_category) {
		this.rating_category = rating_category;
	}

	public int getRating_score() {
		return rating_score;
	}

	public void setRating_score(int rating_score) {
		this.rating_score = rating_score;
	}

	public String getRating_comment() {
		return rating_comment;
	}

	public void setRating_comment(String rating_comment) {
		this.rating_comment = rating_comment;
	}

	@Override
	public String toString() {
		return "RatingDto [rating_seq=" + rating_seq + ", docs_seq=" + docs_seq + ", rating_category=" + rating_category
				+ ", rating_score=" + rating_score + ", rating_comment=" + rating_comment + "]";
	}
	
	
}