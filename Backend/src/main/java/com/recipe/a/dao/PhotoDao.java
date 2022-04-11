package com.recipe.a.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.PhotoDto;

@Mapper
@Repository
public interface PhotoDao {

	public int uploadRecipeImg(PhotoDto photoDto);
	
<<<<<<< Updated upstream
	public int countPhoto();
=======
	public int uploadRecipeImg(PhotoDto dto);
>>>>>>> Stashed changes

	public List<PhotoDto> getPhoto(PhotoDto photoDto);
	
	public List<Integer> test(); 
	
	public PhotoDto getThumbnailPhoto(PhotoDto photoDto);

	public List<PhotoDto> getRecommendThumnailPhoto(List<Integer> seqList);
	
	//내가 좋아하는 레시피 썸네일
	public PhotoDto getThumbnail(int recipeSeq);
}
