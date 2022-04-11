package com.recipe.a.dto;

public class PhotoDto {
<<<<<<< Updated upstream
	private int photoSeq;
	private int docsSeq;
	private String photoTitle;		// 사진 종류들 알려주는것(썸네일은 썸네일)
	private String photoContent;	// 사진에 대한 설명
	private String photoCategory;	// 굿즈냐 레시피냐
=======
	private int photoseq;
	private int docsSeq;
	private String photoTitle;		
	private String photoContent;	
	private String photoCategory;	
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
	public PhotoDto(int photoSeq, int docsSeq, String photoTitle, String photoContent, String photoCategory,
			String photoUrl) {
		super();
		this.photoSeq = photoSeq;
=======
	public PhotoDto(int photoseq, int docsSeq, String photoTitle, String photoContent, String photoCategory,
			String photoUrl) {
		super();
		this.photoseq = photoseq;
>>>>>>> Stashed changes
		this.docsSeq = docsSeq;
		this.photoTitle = photoTitle;
		this.photoContent = photoContent;
		this.photoCategory = photoCategory;
		this.photoUrl = photoUrl;
	}

	public int getPhotoseq() {
		return photoseq;
	}

	public void setPhotoseq(int photoseq) {
		this.photoseq = photoseq;
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
<<<<<<< Updated upstream
		return "PhotoDto [photoSeq=" + photoSeq + ", docsSeq=" + docsSeq + ", photoTitle=" + photoTitle
=======
		return "PhotoDto [photoseq=" + photoseq + ", docsSeq=" + docsSeq + ", photoTitle=" + photoTitle
>>>>>>> Stashed changes
				+ ", photoContent=" + photoContent + ", photoCategory=" + photoCategory + ", photoUrl=" + photoUrl
				+ "]";
	}
	
	
	
	
}