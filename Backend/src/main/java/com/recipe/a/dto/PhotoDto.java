package com.recipe.a.dto;

public class PhotoDto {
	private int photoSeq;
	private int docsSeq;
	private String photoTitle;		// 사진 종류들 알려주는것(썸네일은 썸네일)
	private String photoContent;	// 사진에 대한 설명
	private String photoCategory;	// 굿즈냐 레시피냐
	private String photoUrl;
	
	public PhotoDto() {
	}

	public PhotoDto(int photoSeq, int docsSeq, String photoTitle, String photoContent, String photoCategory,
			String photoUrl) {
		super();
		this.photoSeq = photoSeq;
		this.docsSeq = docsSeq;
		this.photoTitle = photoTitle;
		this.photoContent = photoContent;
		this.photoCategory = photoCategory;
		this.photoUrl = photoUrl;
	}

	public int getPhotoSeq() {
		return photoSeq;
	}

	public void setPhotoSeq(int photoSeq) {
		this.photoSeq = photoSeq;
	}

	public int getDocsSeq() {
		return docsSeq;
	}

	public void setDocsSeq(int docsSeq) {
		this.docsSeq = docsSeq;
	}

	public String getPhotoTitle() {
		return photoTitle;
	}

	public void setPhotoTitle(String photoTitle) {
		this.photoTitle = photoTitle;
	}

	public String getPhotoContent() {
		return photoContent;
	}

	public void setPhotoContent(String photoContent) {
		this.photoContent = photoContent;
	}

	public String getPhotoCategory() {
		return photoCategory;
	}

	public void setPhotoCategory(String photoCategory) {
		this.photoCategory = photoCategory;
	}

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
	}

	@Override
	public String toString() {
		return "PhotoDto [photoSeq=" + photoSeq + ", docsSeq=" + docsSeq + ", photoTitle=" + photoTitle
				+ ", photoContent=" + photoContent + ", photoCategory=" + photoCategory + ", photoUrl=" + photoUrl
				+ "]";
	}
	
	
	
}