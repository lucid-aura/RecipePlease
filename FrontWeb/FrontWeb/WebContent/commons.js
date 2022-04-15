function logout() {
    if (sessionStorage.getItem("loginType") == "kakao"){
        kakaoLogout()
    }
    sessionStorage.removeItem('AccessKEY')
    sessionStorage.removeItem("loggedUser")
    sessionStorage.removeItem("loginType")
}

function checkLogin(loggedUser){
    if (loggedUser == null){
        $("#loginBtn").text('로그인')
        $("#loginBtn").attr("href", "login.html")
        $("#settingBtn").bind('click', false)
        sessionStorage.setItem("loginType", "normal");
    }
    else {
        $("#loginBtn").text('로그아웃')
        $("#loginBtn").attr("href", "index.html")
        $("#settingBtn").bind('click', true)
    }
}

function kakaoLogout() {
    console.log("kakaologout")
    console.log(window.Kakao.Auth.getAccessToken())
    
    if (!window.Kakao.Auth.getAccessToken()) {
        console.log('Not logged in.');
        return;
    }
    window.Kakao.Auth.logout(function(response) {
        alert(response +' logout');
        //window.location.href='/'
    });
    
};

function secession() {
    Kakao.API.request({
        url: '/v1/user/unlink',
        success: function(response) {
            console.log(response);
            //callback(); //연결끊기(탈퇴)성공시 서버에서 처리할 함수
            window.location.href='/'
        },
        fail: function(error) {
            console.log('탈퇴 미완료')
            console.log(error);
        },
    });
};