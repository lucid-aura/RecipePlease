package com.recipe.a.controller;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.recipe.a.dto.PhotoDto;
import com.recipe.a.dto.RatingDto;
import com.recipe.a.dto.RecipeDto;
import com.recipe.a.dto.RecipeLikeDto;
import com.recipe.a.service.RecipeLikeService;
import com.recipe.a.service.RecipeService;


@RestController // @Controller + @ResponseBody -> Restful
public class RecipeController {
	
	@Autowired
	RecipeService recipeService;
	
	@Autowired
	RecipeLikeService recipeLikeService;
	
	@RequestMapping(value = "/main", method = {RequestMethod.GET, RequestMethod.POST})
	public String main() {
		System.out.println("RecipeController main()");
		
		return "Hello World!";
	}
	
	
	@RequestMapping(value = "/countRecipe", method = {RequestMethod.GET, RequestMethod.POST})
	public int countRecipe(String bigCategory, String smallCategory) {
		System.out.println("RecipeController countRecipe()");
		return recipeService.countRecipe(bigCategory, smallCategory);
		
	}
	
	
	@RequestMapping(value = "/countPhoto", method = {RequestMethod.GET, RequestMethod.POST})
	public String countPhoto() {
		System.out.println("RecipeController countPhoto()");
		int res = recipeService.countPhoto();
		System.out.println(res);
		return "개수는: " + res;
	}
	
	
	// 레시피 업로드
	@RequestMapping(value ="/insertRecipe", method = {RequestMethod.GET, RequestMethod.POST})
	public int insertRecipe(RecipeDto newRecipe) {
		System.out.println("RecipeController insertRecipe()");
		System.out.println(newRecipe.toString());
		System.out.println(newRecipe.getRecipeSeq());
		recipeService.insertRecipe(newRecipe);
		
		return newRecipe.getRecipeSeq();
	}
	
	// 레시피 이미지 업로드
	@RequestMapping(value = "/uploadRecipeImg", method = {RequestMethod.GET, RequestMethod.POST})
	public String uploadRecipeImg(PhotoDto photoDto) {
		System.out.println("RecipeController uploadRecipeImg()");
		System.out.println(photoDto.toString());
		
		boolean b = recipeService.uploadRecipeImg(photoDto);
		if(b) {
			return "YES";
		}
		return "NO";
	}
	
	@RequestMapping(value = "/getOneRecipe", method = {RequestMethod.GET})
	public RecipeDto getOneRecipe(int recipeSeq) {
		
		System.out.println("RecipeController getOneRecipe()");
		System.out.println(recipeSeq);
		recipeService.oneUpReadcount(recipeSeq);
		return recipeService.getOneRecipe(recipeSeq);
		//return recipeService.getPhoto(photoDto);
	}
	
	
	@RequestMapping(value = "/getPhoto", method = {RequestMethod.GET})
	public List<PhotoDto> getPhoto(int docsSeq, String photoCategory) {
		System.out.println("RecipeController getPhoto()");
		PhotoDto photoDto = new PhotoDto();
		
		photoDto.setPhotoSeq(0);
		photoDto.setDocsSeq(docsSeq);
		photoDto.setPhotoCategory(photoCategory);

		return recipeService.getPhoto(photoDto);
	}
	
	
	@RequestMapping(value = "/getThumbnailPhoto", method = {RequestMethod.GET})
	public PhotoDto getThumbnailPhoto(int docsSeq, String photoCategory) {
		System.out.println("RecipeController getThumbnailPhoto()");
		PhotoDto photoDto = new PhotoDto();
		
		photoDto.setPhotoSeq(0);
		photoDto.setDocsSeq(docsSeq);
		photoDto.setPhotoCategory(photoCategory);

		return recipeService.getThumbnailPhoto(photoDto);
	}
	
	@RequestMapping(value = "/getRecipeTag", method = {RequestMethod.GET})
	public List<String> getRecipeTag(int recipeSeq) {
		System.out.println("RecipeController getRecipeTag()");
		
		return Arrays.asList(recipeService.getOneRecipe(recipeSeq).getRecipeGoodsTag().split(","));
	}
	
	@RequestMapping(value = "/getAllRatingsBySeq", method = {RequestMethod.GET})
	public List<RatingDto> getRatings(int docsSeq) {
		System.out.println("RecipeController getAllRatingsBySeq()");
		return recipeService.getAllRatingsBySeq(docsSeq);
		//return Arrays.asList(recipeService.getOneRecipe(recipeSeq).getRecipeGoodsTag().split(","));
	}
	
	@RequestMapping(value = "/writeComment", method = {RequestMethod.POST})
	public List<RatingDto> writeComment(RatingDto ratingDto) {
		System.out.println("RecipeController writeComment()");
		System.out.println(ratingDto.toString());
		
		recipeService.writeComment(ratingDto);
		return recipeService.getAllRatingsBySeq(ratingDto.getDocsSeq());
		
		// return recipeService.getAllRatingsBySeq(docsSeq);
		//return Arrays.asList(recipeService.getOneRecipe(recipeSeq).getRecipeGoodsTag().split(","));
	}	
	
//	@RequestMapping(value = "/purchaseRecipeCheck", method = {RequestMethod.GET})
//	public int purchaseRecipeCheck(String memberId, int recipeSeq) {
//		System.out.println(memberId + " " + recipeSeq);
//		System.out.println("RecipeController purchaseRecipeCheck()");
//
//		return recipeService.purchaseRecipeCheck(memberId, recipeSeq);
//		//return recipeService.getPhoto(photoDto);
//	}

	@RequestMapping(value = "/getRecommendRecipe", method = {RequestMethod.GET})
	public Map<String, Object> getRecommendRecipe(String category) {
		
		System.out.println("RecipeController getRecommendRecipe() " + category);

		return recipeService.getRecommendRecipe(category);
		//return recipeService.getPhoto(photoDto);
	}

	@RequestMapping(value = "/getSmallRecommendRecipe", method = {RequestMethod.GET})
	public List<RecipeDto> getSmallRecommendRecipe(String category) {
		
		System.out.println("RecipeController getSmallRecommendRecipe()");

		return recipeService.getSmallRecommendRecipe(category);
	}	
	
	@RequestMapping(value = "/getRecommendRecipeTest", method = {RequestMethod.GET})
	public List<RecipeDto> getRecommendRecipeTest(String category) {
		
		System.out.println("RecipeController getRecommendRecipeTest() " + category);

		return recipeService.getRecommendRecipeTest(category);
	}	
	
	
	@RequestMapping(value = "/likeRecipe", method = {RequestMethod.GET})
	public int likeRecipe(RecipeLikeDto recipeLikeDto) {
		recipeLikeDto.setLikeseq(0);
		System.out.println("RecipeController likeRecipe()");
		return recipeLikeService.likeRecipe(recipeLikeDto);
	}
	
	@RequestMapping(value = "/unlikeRecipe", method = {RequestMethod.GET})
	public int unlikeRecipe(RecipeLikeDto recipeLikeDto) {
		System.out.println("RecipeController unlikeRecipe()");
		return recipeLikeService.unLikeRecipe(recipeLikeDto);
	}
	
	
	@RequestMapping(value = "/searchRecipe", method = {RequestMethod.GET, RequestMethod.POST})
	public List<RecipeDto> searchRecipe(String search, String bigOptions, String smallOptions, String sortOrder) {
		System.out.println("RecipeController searchRecipe()");
		System.out.println(bigOptions);
		ArrayList<String> big = new ArrayList<String>(Arrays.asList(bigOptions.split(",")));
		ArrayList<String> small = new ArrayList<String>(Arrays.asList(smallOptions.split(","))); 
		return recipeService.searchRecipe(search, big, small, sortOrder);
	}
	
	@RequestMapping(value = "/test", method = {RequestMethod.GET})
	public List<Integer> test(int docs_seq, String photo_category) {
		System.out.println(docs_seq + " " + photo_category);
		System.out.println("RecipeController test()");
		
		List<Integer> dtos = recipeService.test();

		return dtos;
		//return recipeService.getPhoto(photoDto);
	}
	
	// 도움 받은 사이트 : https://velog.io/@gmtmoney2357/스프링-부트-파일-업로드-다운로드-이미지-보여주기
	@RequestMapping(value = "/imageUploadToServer", method = { RequestMethod.POST })
	public String testUpload(HttpServletRequest request) throws Exception {
		System.out.println("RecipeController imageUploadToServer()");

		String fileName = "";
		InputStream imageInputStream = null;
		Part imagePart = null;
		
		//헤더에서 받아온 키 값이 fileName 인 경우 사진의 파일 이름이 들어있다. -> 파일 이름 저장
		fileName = request.getParameter("fileName");
		System.out.println("itemName? " + fileName);
	    
	    //.getParts()로 모든 항목들을 collection형식으로 받을 수 있다.
	    Collection<Part> parts = request.getParts();
	    for (Part part : parts) {
	        //form에서 지정한 name을 받을 수 있다.
	 		//System.out.println("name={}   " +  part.getName());
	    	
	 		// 헤더에서 받아온 키 값이 photo 인 경우 실제 사진 데이터가 들어 있다. -> inputstream 및 part 연결
	 		if (part.getName().equals("photo")) {
	        	imageInputStream = part.getInputStream(); //데이터 읽기
	        	imagePart = part;
	        }
	    }
	    

	    String fullPath = "C://recipeUpload/" + fileName;
	    
        System.out.println("경로및 이름 : "+  fullPath);
 		imagePart.write(fullPath);
	    
 		// 이미지가 서버에 저장된 주소(localhost:3000)가 DB에 저장되어야 함
 		System.out.println("http://localhost:3000/photo/" + fileName);
		return "http://localhost:3000/photo/" + fileName;
	}
}