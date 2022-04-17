let navBar = document.getElementById("navBar")
        let ratingScore = 0;
        let recipeSeq = -1;
        let loggedUser = {};

        function togglebtn(){
            navBar.classList.toggle("hidemenu");
        }

        function changeStar(index) {
            ratingScore = index
            $("#ratingStar i").attr('class', "fa-regular fa-star")
            $("#ratingStar i:nth-child(-n+"+index+")").attr('class', "fa-solid fa-star")
        }

        function submitRating() {
            let ratingComment = $("#ratingText").val()
            $.ajax({
                url : webAddress + "writeComment",
                type : 'POST', 
                data : {
                    memberId:loggedUser.memberId,
                    docsSeq:recipeSeq,
                    ratingCategory:'recipe',
                    ratingScore:ratingScore,
                    ratingComment:ratingComment
                }, 
            success : function(res) {
                alert("평가 등록 완료")
                location.reload()
            },
            error : function(xhr, status) {
                alert(xhr + " : " + status);
            }
            });
        }

        const categories = {
            livestock:"축산물",
            seafood:"해산물",
            personal:"개인용",
            entertain:"접대용",
            nightmeal:"야식용"
        }

	    $( document ).ready(function() {
            
            loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))
            console.log(loggedUser)
            kakaoInit()
            checkLogin(loggedUser)

            var url = document.URL;
        	console.log(url);
        	recipeSeq = url.substring(url.indexOf("recipeSeq")).split("=")[1]
            console.log(recipeSeq);

            $.ajax({ // 평가 글
	    		url: webAddress + "getAllRatingsBySeq",
	    		    data: {
	    			    docsSeq:recipeSeq
	    		    },
	    		    success: function( result ) {
                       ratingCount = result.length
                        console.log(result)
                        $.each(result, function(index, value){
                            $("<tr>" + 
                                "<td>" + 
                                    value.memberId +
                                "</td>" + 
                                "<td>" + 
                                    value.ratingComment +
                                "</td>" + 
                                "<td>" + 
                                    value.ratingScore +
                                "</td>" + 
                            "</tr>")
                        .appendTo($("#ratingTable"))
    		            });
	    		  }
	    	});

	    	$.ajax({ // 디테일 레시피 정보
	    		url: webAddress + "getOneRecipe",
	    		    data: {
	    			    recipeSeq:recipeSeq
	    		    },
	    		    success: function( result ) {
                        $("<div><h1>" + result.recipeTitle + "</h1>" + 
                                "<div class='row'>").appendTo("#food-title")
                        for (var i = 0; i< 5; i++) {
                            if (i < Math.round(result.recipeRating)) {
                                $("<i class='fa-solid fa-star'></i>").appendTo("#food-title")
                            }
                            else {
                                $("<i class='fa-regular fa-star'></i>").appendTo("#food-title")
                            }
                        }
                        $("<span>리뷰 수 : " + ratingCount +"</span></div>" + 
                            "<div><p>작성자 : " + result.memberId + "</p></div>"
                        ).appendTo("#food-title")

                        $("<h4>" + result.recipeGoodsTag + "</h4>").appendTo("#small-details")

                        $("#bigCategory").attr("placeholder", categories[result.recipeBigCategory]);
                        $("#smallCategory").attr("placeholder", categories[result.recipeSmallCategory]);
                        $("#capacity").attr("placeholder", result.recipeCapacity);
                        
                        $("<p>" + result.recipeContent + "</p>").appendTo("#home-desc")

                        // 유튜브 영상은 embed로 바꿔야 함
                        $("#video").attr("src", "https://www.youtube.com/embed/"+result.recipeVideoUrl.split("=")[1]);


	    		  }
	    	});

            $.ajax({ //  레시피 사진
	    		url: webAddress + "getPhoto",
	    		    data: {
	    			    docsSeq:recipeSeq,
                        photoCategory:"recipe"
	    		    },
	    		    success: function( result ) {
                        result.forEach(function(element, index){
                            if (element.photoTitle == "thumbnail") {
                                $("#thumbnailPhoto").attr("src", webPhoto + element.photoUrl)
                            }
                            else {
                                $("<li>" + 
                                    "<img src=" + webPhoto + element.photoUrl + ">" + 
                                    "<span>" + element.photoContent + "</span>" +
                                    "</li>").appendTo("#detail-list")
                            }
                        });  
                       console.log(result)
	    		  }
	    	});
        });