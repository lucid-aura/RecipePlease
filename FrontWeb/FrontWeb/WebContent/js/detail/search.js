let navBar = document.getElementById("navBar")

const categories = {
    livestock:"축산물",
    seafood:"해산물",
    personal:"개인용",
    entertain:"접대용",
    nightmeal:"야식용"
}

let sortOrder = "readcount"
let bigOptions = ["livestock", "seafood"]
let checked = [true, true]

function togglebtn(){
    navBar.classList.toggle("hidemenu");
}

function goRecipeDetail(recipeSeq) {
    location.href = "food.html?recipeSeq=" + recipeSeq
}

function filterRecipe(data, category){
    $("<h1 id='listHead'>" + categories[category]  + " 검색 결과</h1>").appendTo("#left-col")

    if (data.length == 0) {
        $("<div class='best-img'>" + 
                "<div class='best-info'><p>검색결과가 없습니다.</p></div>" + 
            "</div>").appendTo("#left-col");
    }
    else {
        $.each(data, function(index, value){
            $("<div class='best' onclick='goRecipeDetail(" + value.recipeSeq +")'>" + 
                    "<div class='best-img'>" +
                        "<img src=" + 'images/image-10.jpg' + ">" +	
                    "</div>" +
                    "<div class='best-info'>" + 
                        "<p>" + categories[value.recipeBigCategory] +"</p>" +
                        "<h3>" +  value.recipeTitle + "</h3>" +
                        "<p>평점: " +  value.recipeRating + "</p>" +
                        "<p>조회수: " +  value.recipeReadcount + "</p>" +
                        "<p>" + value.recipeCapacity +"인분</p>" +
                    "</div>" + 
                "</div>")
            .appendTo("#left-col");
        });
    }
}

$( document ).ready(function() {
    let loggedUser = sessionStorage.getItem("loggedUser")
    checkLogin(loggedUser)
    kakaoInit()

    var url = document.URL;
    let search = decodeURI(url.substring(url.indexOf("recipeSeq")).split("=")[1]);
    
    $.ajax({
        url: "http://localhost:3000/searchRecipe",
            data: {
                search:search,
                bigOptions:"livestock,seafood",
                smallOptions:"personal",
                sortOrder:"readcount"
            },
            success: function ( result ) {
                filterRecipe(result, "personal")
            }
        });

        $.ajax({
        url: "http://localhost:3000/searchRecipe",
            data: {
                search:search,
                bigOptions:"livestock,seafood",
                smallOptions:"entertain",
                sortOrder:"readcount"
            },
            success: function ( result ) {
                filterRecipe(result, "entertain")
            }
        });

        $.ajax({
        url: "http://localhost:3000/searchRecipe",
            data: {
                search:search,
                bigOptions:"livestock,seafood",
                smallOptions:"nightmeal",
                sortOrder:"readcount"
            },
            success: function ( result ) {
                filterRecipe(result, "nightmeal")
            }
        });
})