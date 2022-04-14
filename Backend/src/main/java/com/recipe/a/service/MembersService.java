package com.recipe.a.service;

import com.recipe.a.dto.MembersDto;
import com.recipe.a.dto.MyFavoriteDto;
import com.recipe.a.dto.PhotoDto;
import com.recipe.a.dto.RecipeDto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCrypt;

import com.recipe.a.dao.MembersDao;
import com.recipe.a.dao.PhotoDao;
import com.recipe.a.dao.RatingDao;
import com.recipe.a.dao.RecipeDao;
import com.recipe.a.dao.RecipeLikeDao;
import com.recipe.a.dto.MembersDto;

@Service
@Transactional
public class MembersService {
	
	static BCrypt bcr;
	
	@Autowired
	private MembersDao dao;
	@Autowired
	private RecipeDao RDao;
	@Autowired
	private PhotoDao PDao;
	@Autowired
	private RecipeLikeDao RLDao;
	@Autowired
	private RatingDao RTDao;

	public MembersService(MembersDao dao) {
		this.dao = dao;
	}

	public int countMembers() {
		System.out.println("MembersService");
		return dao.countMembers();
	}
	
	// 아이디 중복
	public boolean idCheck(MembersDto dto) {
		int n = dao.idCheck(dto);
		
		return n>0 ? true:false;
	}
	
	// 회원가입 - 노승현
	public MembersDto regist(MembersDto dto) {	
		
		String salt;
		int n = dao.idCheck(dto);
		
		int b;
		if(n>0) {	// 아이디 있음
			salt = dao.idCheckGetSalt(dto);
			System.out.println("regist service salt: " + salt);
			dto.setMemberPwd(BCrypt.hashpw(dto.getMemberPwd(), salt));
			return dao.login(dto.getMemberPwd());
		} else {	// 아이디 없음
			salt = BCrypt.gensalt(10);	// 임의의 솔트값 생성
			dto.setSalt(salt);	// 솔트값 Dto 에 담기
			dto.setMemberPwd(BCrypt.hashpw(dto.getMemberPwd(), salt));	//솔트값과 비밀번호 합쳐서 암호화후 Dto에 담기
			System.out.println("regist memgbersService: " + dto.toString()  );
			System.out.println("memberId: " + dto.getMemberId() + " " + "memberPwd: " + dto.getMemberPwd());

			b = dao.regist(dto);
		}
		
		if(b > 0) {
			return dao.login(dto.getMemberPwd());
		} else {
			MembersDto onlyLogin = new MembersDto();
			return onlyLogin;
		}
	}
	
	// 로그인
	public MembersDto login(String memberId, String memberPwd) {
		
		MembersDto salt = dao.getSalt(memberId, memberPwd);
		
		String encodedPassword = bcr.hashpw(memberPwd, salt.getSalt());
		
		return dao.login(encodedPassword);
	}
	
	//내가 좋아하는 레시피
	public List<MyFavoriteDto> myFavoriteRecipe(String memberId) {
		System.out.println("myFavoriteRecipe service");
		
		List<RecipeDto> recipeSeqListDto = RLDao.getRecipeSeq(memberId);
		System.out.println("recipeSeqListDto: " + recipeSeqListDto.toString());
		System.out.println("recipeSeqListDto: " + recipeSeqListDto.size());
		List<Integer> recipeSeqList = new ArrayList<Integer>();
		for(int i=0; i < recipeSeqListDto.size(); i++) {
			recipeSeqList.add(recipeSeqListDto.get(i).getRecipeSeq());
		}
		System.out.println("recipeSeqList: " + recipeSeqList.toString());
		
		List<RecipeDto> recipeInfo = new ArrayList<RecipeDto>();
		List<PhotoDto> thumbnailList = new ArrayList<PhotoDto>();
		List<MyFavoriteDto> recipeRatingCountList = new ArrayList<MyFavoriteDto>();
		
		for(int i=0; i<recipeSeqList.size(); i++) {
			recipeInfo.add(RDao.getRecipeInfo(recipeSeqList.get(i)));
			thumbnailList.add(PDao.getThumbnail(recipeSeqList.get(i)));
			int test = RTDao.getRatingCount(recipeSeqList.get(i));
			MyFavoriteDto my = new MyFavoriteDto();
			my.setRecipeRatingCountList(test);
			recipeRatingCountList.add(my);
		}
			
		System.out.println("recipeRatingCountList");
		List<String> recipeTitleList = new ArrayList<String>();
		List<Integer> recipeReadcountList = new ArrayList<Integer>();
		List<Float> recipeRatingList = new ArrayList<Float>();
		
		for(RecipeDto recipe : recipeInfo) {
			recipeTitleList.add(recipe.getRecipeTitle());
			recipeReadcountList.add(recipe.getRecipeReadcount());
			recipeRatingList.add(recipe.getRecipeRating());
		}
		
		
		System.out.println("recipeInfo: " + recipeInfo.size());
		System.out.println("thumbnailList: " + thumbnailList.size());
		for(int i=0; i < thumbnailList.size(); i++) {
			System.out.println(thumbnailList.get(i).toString()); 
		}
		System.out.println("recipeRatingCountList: " + recipeRatingCountList.toString());
		
		List<MyFavoriteDto> result = new ArrayList<MyFavoriteDto>();
		for(int i=0; i < recipeSeqList.size(); i++) {
			result.add(new MyFavoriteDto (
					recipeSeqList.get(i),
					recipeInfo.get(i).getRecipeTitle(),
					recipeInfo.get(i).getRecipeReadcount(),
					recipeInfo.get(i).getRecipeRating(),
					thumbnailList.get(i).getPhotoUrl(),
					recipeRatingCountList.get(i).getRecipeRatingCountList(),
					memberId
					));
		}
		
		return result;
	}
	
	// 내가 업로드한 레시피 불러오기
	public List<RecipeDto> myUploadedRecipe(String memberId) {
		System.out.println("myUploadedRecipe service");
		
		List<RecipeDto> recipeSeqListDto = RLDao.getRecipeSeq(memberId);
		System.out.println("recipeSeqListDto: " + recipeSeqListDto.toString());
		System.out.println("recipeSeqListDto: " + recipeSeqListDto.size());
		
		List<Integer> recipeSeqList = new ArrayList<Integer>();
		for(int i=0; i < recipeSeqListDto.size(); i++) {
			recipeSeqList.add(recipeSeqListDto.get(i).getRecipeSeq());
		}
		System.out.println("recipeSeqList: " + recipeSeqList.toString());
		
		List<RecipeDto> recipeInfo = new ArrayList<RecipeDto>();
		for(int i=0; i<recipeSeqList.size(); i++) {
			recipeInfo.add(RDao.myUploadedRecipe(recipeSeqList.get(i)));
		}
		
		return recipeInfo;
		
	}
	
	// 이메일 수정
	public boolean updateEmail(String memberId, String memberEmail) {
		
		int n = dao.updateEmail(memberId, memberEmail);
		
		return n>0? false : true; // false면 업데이트 성공, true면 업데이트 실패
	}
	
	// 닉네임 수정
	public boolean updateNickname(String memberId, String memberNickname) {
		
		int n = dao.updateNickname(memberId, memberNickname);
		
		return n>0? false : true; // false면 업데이트 성공, true면 업데이트 실패
	}
	
	// 전화번호 수정
	public boolean updatePhone(String memberId, String memberPhone) {
		
		int n = dao.updateNickname(memberId, memberPhone);
		
		return n>0? false : true; // false면 업데이트 성공, true면 업데이트 실패
	}
	
	// 주소 수정
	public boolean updateAddr(MembersDto dto) {
		
		int n = dao.updateAddr(dto);
		System.out.println("updateAddr result int: " +n);
		
		return n>0? false : true; // false면 업데이트 성공, true면 업데이트 실패
	}
	
	
	public List<RecipeDto> test1() {
		return dao.test1();
	}

	
}
