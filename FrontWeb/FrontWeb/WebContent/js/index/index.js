let navBar = document.getElementById("navBar")	
let recommendLivestock = {}
function togglebtn(){
    navBar.classList.toggle("hidemenu");
}

function goRecipeDetail(recipeSeq) {
    location.href = "food.html?recipeSeq=" + recipeSeq
}

function search() {
    location.href = "search.html?search=" + $("#searchInput").val()
}


$( document ).ready(function() {
    let loggedUser = sessionStorage.getItem("loggedUser")
    console.log("로그인 정보:" + loggedUser)
    console.log("로그인 방식 : " + sessionStorage.getItem("loginType"))
    
    kakaoInit()
    checkLogin(loggedUser)
    console.log(window.Kakao.Auth.getAccessToken())


    $.ajax({
        url: webAddress + "getRecommendRecipeByCategory",
            data: {
                category:"livestock"
            },
            success: function( result ) {
                recommendLivestock = result
                
                $.each(recommendLivestock, function(index, value){
                    $("<div onclick='goRecipeDetail(" + value.recipeSeq +")'>" + 
                        "<img src=" + webPhoto + value.recipeThumbnail + ">" +	
                        "<span>" +
                        "<h3>" +  value.recipeTitle + "</h3>" +
                        "<p>평점: " +  value.recipeRating + "</p>" +
                        "</span>" +
                    "</div>")
                    .appendTo("#recommendLivestock");
                });
          }
    });

    $.ajax({
        url: webAddress + "getRecommendRecipeByCategory",
            data: { category:"seafood" },
            success: function( result ) {
                recommendLivestock = result
                $.each(recommendLivestock, function(index, value){
                    $("<div onclick='goRecipeDetail(" + value.recipeSeq +")'>" + 
                        "<img src=" + webPhoto + value.recipeThumbnail + ">" +	
                        "<span>" +
                        "<h3>" +  value.recipeTitle + "</h3>" +
                        "<p>평점: " +  value.recipeRating + "</p>" +
                        "</span>" +
                    "</div>")
                    .appendTo("#recommendSeafood");
                });
          }
    });

$.ajax({
        url: webAddress + "getRecommendRecipeByCategory",
            data: { category:"readcount" },
            success: function( result ) {
                recommendLivestock = result
                $.each(recommendLivestock, function(index, value){
                    $("<div onclick='goRecipeDetail(" + value.recipeSeq +")'>" + 
                        "<img src=" + webPhoto + value.recipeThumbnail + ">" +	
                        "<span>" +
                        "<h3>" +  value.recipeTitle + "</h3>" +
                        "<p>평점: " +  value.recipeRating + "</p>" +
                        "</span>" +
                    "</div>")
                    .appendTo("#recommendReadcount");
                });
          }
    });
});