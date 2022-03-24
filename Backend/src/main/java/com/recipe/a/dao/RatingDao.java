package com.recipe.a.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.recipe.a.dto.RatingDto;

@Mapper
@Repository
public interface RatingDao {

	public int countRating();

	public List<RatingDto> getAllRatingsBySeq(int docsSeq);

	public int writeComment(RatingDto ratingDto);
}
