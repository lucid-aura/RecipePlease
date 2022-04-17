//0b51ddc9f24f741b7aa493bdde5908b2
        //28125d6e902519d48fa96e75483578bf
        window.Kakao.init('28125d6e902519d48fa96e75483578bf');
        // console.log(window.Kakao.isInitialized());
        // console.log(sessionStorage.getItem('AccessKEY'))
        if (sessionStorage.getItem('AccessKEY') != null) {
            console.log("session alive!")
            window.Kakao.Auth.setAccessToken(JSON.parse(sessionStorage.getItem('AccessKEY')));
        }

        function saveToDos(token) { //item을 localStorage에 저장합니다. 
            typeof(Storage) !== 'undefined' && sessionStorage.setItem('AccessKEY', JSON.stringify(token)); 
        };

        function kakaoLogin(){   
            //sessionStorage.removeItem("AccessKey")
            window.Kakao.Auth.login({
                scope:'profile_nickname, profile_image, account_email, gender',
                success: function(authObj) {
                    console.log(authObj);
                    saveToDos(authObj.access_token)  // 로그인 성공하면 사용자 엑세스 토큰 sessionStorage에 저장
                    
                    window.Kakao.API.request({
                        url:'/v2/user/me', 
                        success: (res) => {
                            const kakao_account = res.kakao_account
                            console.log(kakao_account);
                            /*
                            memberCoin: 0
                            memberDetailAddr: ""
                            memberEmail: ""
                            memberGender: ""
                            memberGrade: ""
                            memberId: "sss"
                            memberMainAddr: ""
                            memberName: ""
                            memberNickname: "sss"
                            memberPhone: ""
                            memberPwd: ""
                            memberZipcode: 0
                            salt: ""
                            */
                            //location.href="http://59.22.29.192:5500/WebContent/index.html"

                            window.Kakao.API.request({
                                url: '/v2/user/me',
                                data: {
                                    property_keys: ["properties.nickname", "kakao_account.email","kakao_account.gender"]
                                },
                                success: function(response) {
                                    $.ajax({
                                        url : webAddress + "idCheck",
                                        type : 'POST', 
                                        data : {memberId:response.id}, 
                                        success : function(res) {
                                            let userInfo = {
                                                memberId:String(response.id),
                                                memberName:response.properties.nickname,
                                                memberNickname:response.properties.nickname,
                                                memberGender:response.kakao_account.gender,
                                                memberPwd:"",
                                                memberEmail:response.kakao_account.email,
                                                salt:""
                                            }
                                            if (res == "no"){
                                                $.ajax({
                                                    cache : false,
                                                    url : webAddress + "regist",
                                                    type : 'POST', 
                                                    data : userInfo, 
                                                    success : function(res) {
                                                        $.ajax({
                                                            cache : false,
                                                            url : webAddress + "login",
                                                            type : 'POST', 
                                                            data : userInfo, 
                                                            success : function(res) {
                                                                sessionStorage.setItem("loggedUser", JSON.stringify(res));
                                                                sessionStorage.setItem("loginType", "kakao");
                                                                location.href="index.html"
                                                            },
                                                            error : function(xhr, status) {
                                                                alert(xhr + " : " + status);
                                                            }
                                                            });
                                                    },
                                                    error : function(xhr, status) {
                                                        alert(xhr + " : " + status);
                                                    }
                                                })
                                            }
                                            else {
                                                $.ajax({
                                                cache : false,
                                                url : webAddress + "login",
                                                type : 'POST', 
                                                data : userInfo, 
                                                success : function(res) {
                                                    console.log(res)
                                                    sessionStorage.setItem("loggedUser", JSON.stringify(res));
                                                    sessionStorage.setItem("loginType", "kakao");
                                                    console.log(window.Kakao.Auth.getAccessToken());
                                                    location.href="index.html"
                                                },
                                                error : function(xhr, status) {
                                                    alert(xhr + " : " + status);
                                                }
                                                });
                                            }
                                            

                                        },
                                        error : function(xhr, status) {
                                            alert(xhr + " : " + status);
                                        }
                                    });
                                },
                                fail: function(error) {
                                    console.log(error);
                            }
                        });

                        },
                        fail: function(error) {
                            console.log(error);
                        }
                    });
                }
            });
        }
        function doLogin() {
            
            // 저장 sessionStorage.getItem("mineSession"); 
            // mineItRecord sessionStorage.length; 
            // 1 sessionStorage.key(0); 
            // mineItRecord sessionStorage.removeItem("mineSession"); 
            // 삭제 sessionStorage.clear(); // 전체삭제


            var formData = $("form[id=login]").serialize() ;

            $.ajax({
            cache : false,
            url : webAddress + "login",
            type : 'POST', 
            data : formData, 
            success : function(res) {
                console.log(res)
                console.log(formData)
                sessionStorage.setItem("loggedUser", JSON.stringify(res));
                sessionStorage.setItem("loginType", "normal");
                location.href="index.html"
            },
            error : function(xhr, status) {
                alert(xhr + " : " + status);
            }
            });
        }

        function doRegist() {
            
            var formData = $("form[id=register]").serialize() ;
            $.ajax({
                url : webAddress + "idCheck",
                type : 'POST', 
                data : {memberId:$("#registId").val()}, 
                success : function(res) {
                    if (res == "yes"){
                        alert("이미 존재하는 ID입니다.")
                    }
                    else {
                        $.ajax({
                            cache : false,
                            url : webAddress + "regist",
                            type : 'POST', 
                            data : formData, 
                            success : function(res) {
                                console.log(res)
                                location.href="login.html"
                            },
                            error : function(xhr, status) {
                                alert(xhr + " : " + status);
                            }
                        })
                    }
                },
                error : function(xhr, status) {
                    alert(xhr + " : " + status);
                }
            });
        }