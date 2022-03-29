package com.recipe.a.dto;

public class PhotoDto {
	private int photoSeq;
	private String photoUrl;
	
	public PhotoDto() {
	}

	public PhotoDto(int photoSeq, String photoUrl) {
		super();
		this.photoSeq = photoSeq;
		this.photoUrl = photoUrl;
	}

	public int getPhotoSeq() {
		return photoSeq;
	}

	public void setPhotoSeq(int photoSeq) {
		this.photoSeq = photoSeq;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	@Override
	public String toString() {
		return "PhotoDto [photoSeq=" + photoSeq + ", photoUrl=" + photoUrl + "]";
	}

	
}