package com.recipe.a.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.PhotoDto;

@Mapper
@Repository
public interface PhotoDao {

	public int countPhoto();

	public List<PhotoDto> getPhoto(PhotoDto photoDto);
	
	public List<Integer> test(); 
}
