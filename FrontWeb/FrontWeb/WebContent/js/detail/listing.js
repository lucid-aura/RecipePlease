let navBar = document.getElementById("navBar")

        const categories = {
            livestock:"축산물",
            seafood:"해산물",
            personal:"개인용",
            entertain:"접대용",
            nightmeal:"야식용"
        }

        let category = ""
        let sortOrder = "readcount"
        let bigOptions = ["livestock", "seafood"]
        let checked = [true, true]

        function togglebtn(){
            navBar.classList.toggle("hidemenu");
        }

        function goRecipeDetail(recipeSeq) {
            location.href = "food.html?recipeSeq=" + recipeSeq
        }

        function filterRecipe(data){
            $("#left-col").html("")
            $("<h1 id='listHead'>" + categories[category]  + " 조회순</h1>").appendTo("#left-col")
            $.each(data, function(index, value){
    		        	    $("<div class='best' onclick='goRecipeDetail(" + value.recipeSeq +")'>" + 
                                    "<div class='best-img'>" +
    		        	    	        "<img src=" + webPhoto + value.recipeThumbnail + ">" +	
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

        $( document ).ready(function() {
            let loggedUser = sessionStorage.getItem("loggedUser")
            checkLogin(loggedUser)
            kakaoInit()

            $("#checkBoxLivestock").attr("checked", true);
            $("#checkBoxSeafood").attr("checked", true);
        	var url = document.URL;
        	category = url.substring(url.indexOf("category")).split("=")[1]
        	$("#listHead").text(categories[category] +  " 조회순")
            
            $.ajax({
	    		url: webAddress + "countRecipe",
	    		    data: {
	    			    bigCategory:"livestock",
                        smallCategory:category
	    		    },
                    success: function ( result ) {
                        if (result == 0) {
                            $("#checkBoxLivestock").attr("checked", false)
                            $("#checkBoxLivestock").attr("disabled", true)
                        }
                        $("#countLivestock").text("(" + result + ")")
                    }
            });

            $.ajax({
	    		url: webAddress + "countRecipe",
	    		    data: {
	    			    bigCategory:"seafood",
                        smallCategory:category
	    		    },
                    success: function ( result ) {
                        if (result == 0) {
                            $("#checkBoxSeafood").attr("checked", false)
                            $("#checkBoxSeafood").attr("disabled", true)
                        }
                        $("#countSeafood").text("(" + result + ")")
                    }
            });

        	$.ajax({
	    		url: webAddress + "getSmallRecommendRecipe",
	    		    data: {
	    			    category:category
	    		    },
	    		    success: function( result ) {
	    			    recommendSmallCategory = result
                        filterRecipe(result)

                            //         <div class="best" >
                            //     <div class="best-img">
                            //         <img src="images/image-s1.jpg">
                            //     </div>
                            //     <div class="best-info">
                            //         <p>집에서 간단히 만드는 샌드위치 입니다.</p>
                            //         <h3>손님 접대 및 야식으로 좋습니다.</h3>
                            //         <p>샌드위치/ 야식/ 은근 손 많이감</p>
                            //         <i class="fa-solid fa-star"></i>
                            //         <i class="fa-solid fa-star"></i>
                            //         <i class="fa-solid fa-star"></i>
                            //         <i class="fa-solid fa-star-half-stroke"></i>
                            //         <i class="fa-regular fa-star"></i>
                            //         <div class="best-skill">
                            //             <p>중급자 이상</p>
                            //             <h4>재료준비에 취향에 따라 결정 <span>/주방일이 많음</span></h4>
                            //         </div>
                            //     </div>
                            // </div>

	                    /* <img src="images/image-10.jpg">
	                    <span>
	                        <h3>버터 바른 구운감자</h3>
	                        <p>Starts @how to cook</p>
	                    </span> */
						/* $.each(recommendLivestock, function(index, value){
    		        	    $("<div>" + 
    		        	    	"<img src=" + 'images/image-10.jpg' + ">" +	
    		        	    	"<span>" +
    		        	    	 
    		        	    	"<h3>" +  value.recipeTitle + "</h3>" +

    		        	    	"<p>" +  value.recipeRating + "</p>" +
    
    		        	    	"</span>" +
    		        	    "</div>")
    		        	    .appendTo("#recommendLivestock");
    		            }); */
	    		  }
	    	});

            $("#checkBoxLivestock").change(function(){
                if($("#checkBoxLivestock").is(":checked")){
                    checked[0] = true;
                }else{
                    checked[0] = false;
                }

                bigOptions = []
                if(checked[0]) {
                    bigOptions.push("livestock")
                }
                if (checked[1]) {
                    bigOptions.push("seafood")
                }
                $.ajax({
	    		url: webAddress + "searchRecipe",
	    		    data: {
                        search:"",
	    			    bigOptions:bigOptions.toString(),
                        smallOptions:category,
                        sortOrder:sortOrder
	    		    },
                    success: function ( result ) {
                        filterRecipe(result)
                    }
                });
            })

            $("#checkBoxSeafood").change(function(){
                if($("#checkBoxSeafood").is(":checked")){
                    checked[1] = true;
                }else{
                    checked[1] = false;
                }

                bigOptions = []
                if(checked[0]) {
                    bigOptions.push("livestock")
                }
                if (checked[1]) {
                    bigOptions.push("seafood")
                }
                $.ajax({
	    		url: webAddress + "searchRecipe",
	    		    data: {
                        search:"",
	    			    bigOptions:bigOptions.toString(),
                        smallOptions:category,
                        sortOrder:sortOrder
	    		    },
                    success: function ( result ) {
                        filterRecipe(result)
                    }
                });
            })

            $('input[type=radio][name=sortRadio]').change(function() {
                if (this.value == 'readcount') {
                    sortOrder = 'readcount'
                }
                else if (this.value == 'rating') {
                    sortOrder = 'rating'
                }

                $.ajax({
	    		url: webAddress + "searchRecipe",
	    		    data: {
                        search:"",
	    			    bigOptions:bigOptions.toString(),
                        smallOptions:category,
                        sortOrder:sortOrder
	    		    },
                    success: function ( result ) {
                        filterRecipe(result)
                    }
                });
            });
        })