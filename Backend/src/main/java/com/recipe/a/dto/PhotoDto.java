package com.recipe.a.dto;

public class PhotoDto {
	private int photoSeq;
<<<<<<< HEAD
=======
	private int docsSeq;
	private String photoTitle;		// 사진 종류들 알려주는것(썸네일은 썸네일)
	private String photoContent;	// 사진에 대한 설명
	private String photoCategory;	// 굿즈냐 레시피냐
>>>>>>> main
	private String photoUrl;
	
	public PhotoDto() {
		super();
		this.photoSeq = 0;
		this.docsSeq = 0;
		this.photoTitle = "";
		this.photoContent = "";
		this.photoCategory = "";
		this.photoUrl = "";
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